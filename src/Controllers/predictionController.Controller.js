const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const EmployeeSchema = require('../Models/EmployeeSchema.model');
const Promotion = require('../Models/EmployeePromotion.Models');
const Employee = require('../Models/Employee.Models');

// to get all train data from database
async function fetchDatasetFromMongoDB() {
    try {
        const data = await EmployeeSchema.find().select('-_id -EmployeeID -PromotionScore').lean();
        if (!data || data.length === 0) {
            throw new Error('No data found');
        }

        const csvData = convertToCSV(data);
        const csvPath = path.join(__dirname, 'Dataset.csv');
        fs.writeFileSync(csvPath, csvData);
        return csvPath;
    } catch (error) {
        throw new Error(`Error fetching data from MongoDB`);
    }
}

// to convert into CSV
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [header, ...rows].join('\n');
} 

async function predictPromotion(attributeValues) {

    const pythonScript = path.join(__dirname, 'predict.py');
    try {
       
        if (attributeValues.Qualifications === 'B.Com' || attributeValues.Qualifications === 'BBA' || attributeValues.Qualifications === 'B.Sc') {
            attributeValues.Qualifications = 0;
        } else if (attributeValues.Qualifications === 'MHRM' || attributeValues.Qualifications === 'MBA') {
            attributeValues.Qualifications = 1;
        } else if (attributeValues.Qualifications === 'B.Tech' || attributeValues.Qualifications === 'M.Tech') {
            attributeValues.Qualifications = 0;
        } else if (attributeValues.Qualifications === 'PhD') {
            attributeValues.Qualifications.Qualifications = 2;
        } else {
            attributeValues.Qualifications = 1;
        }
        // take data from database
        const dataPath = await fetchDatasetFromMongoDB();

        // Execute python model code
        const pythonProcess = spawn('python', [pythonScript, dataPath]);

        pythonProcess.stdin.write(JSON.stringify(attributeValues));
        pythonProcess.stdin.end();

        return new Promise((resolve, reject) => {
            let predictions = '';
            // take output of python code
            pythonProcess.stdout.on('data', (data) => {
                predictions += data.toString();
            });
            // take error if occure
            pythonProcess.stderr.on('data', (data) => {
                reject(`Python script error: ${data.toString()}`);
            });
            
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        resolve(JSON.parse(predictions));
                    } catch (error) {
                        reject(`Error parsing predictions: ${error.message}`);
                    }
                } else {
                    reject(`Python script process exited with code ${code}`);
                }
            });
        });
    } catch (error) {
        throw new Error(`Error in predictPromotion: ${error.message}`);
    }
}

// to calculate promotion score
const calculatePromotionScore =  (attributes) => {
    const { AttendancePercentage, Tasks_completed, Due_tasks, Qualifications, Awards, Age, Experience } = attributes;

    const PromotionScore = (
        0.4 * AttendancePercentage +
        0.4 * Tasks_completed -
        0.2 * Due_tasks +
        0.4 * Qualifications +
        0.3 * Awards +
        0.1 * Age +
        0.5 * Experience
    ).toFixed(2);

    return parseFloat(PromotionScore);
}

// to predict employee promotion
async function predict(req, res) {
    try {
        // Fetch all employees' data from employee databse
        const allEmployees = await Employee.find().select('EmployeeID AttendancePercentage Tasks_completed Due_tasks Qualifications Awards Age Experience').lean();
        if (!allEmployees || allEmployees.length === 0) {
            throw new Error('No employees found in the Employee collection');
        }
  
        // Predict promotion for each employee
        const predictions = await Promise.all(allEmployees.map(async (employee) => {
           
            const { _id, EmployeeID, ...attributes } = employee;
            
            // call predictPromotion method
            const promotionPrediction = await predictPromotion(attributes);

            return { 
                EmployeeID: employee.EmployeeID,
                Promotion: promotionPrediction === '1' ? 'Promoted' : 'Not Promoted',
                PromotionScore: calculatePromotionScore(attributes)
            };
        }));

        // Store predictions in the Promotion collections
        await Promise.all(predictions.map(async (prediction) => { 

            const EmployeeData = await Employee.find({EmployeeID : prediction.EmployeeID}).select('-_id FirstName LastName Salary Position ProfileImage');
            const employeeData = EmployeeData[0];
            await Promotion.findOneAndUpdate(
                { EmployeeID: prediction.EmployeeID },
                { 
                    FirstName: employeeData.FirstName,
                    LastName: employeeData.LastName,
                    Salary: employeeData.Salary,
                    Position: employeeData.Position,
                    ProfileImage: employeeData.ProfileImage,
                    Promotion: prediction.Promotion,
                    PromotionScore: prediction.PromotionScore
                },
                { upsert: true, new: true }
            );
        }));
        res.status(200).json({ message: 'Predictions stored successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error predicting promotions: ${error.message}` });
    }
}

// to get all employee promotion data
const getAllEmployeePromotionRanking = async(req,res) => {
    const employeeData = await Promotion.find().select('-_id');
    console.log(employeeData)
    res.status(201).json(employeeData);
}

module.exports = { 
    predict,
    getAllEmployeePromotionRanking
};
