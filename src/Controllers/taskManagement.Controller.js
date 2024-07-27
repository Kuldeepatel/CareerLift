const Task = require('../Models/TaskManagementSchema.Model');
const Employee  = require('../Models/Employee.Models')
//  to create or update task
const createTask = async (req, res) => {
    const { createdBy } = req.params; 
    const { taskID,title, description, status, dueDate, assignedTo,completionDate } = req.body;

    if (!taskID ) {
        return res.status(400).send("taskID are required");
    }
    try {
        const createdDate = getCurrentDate();

        // Create or update task in the database
      const task = await Task.findOneAndUpdate(
            { taskID },
            { $set: { taskID, title, description, status, dueDate, assignedTo, createdBy, createdDate,completionDate } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.status(200).send("Task created or updated successfully");
    } catch (error) {
        return res.status(500).send("Failed to create or update task");
    }
};

// to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${day}-${month}-${year}`;
    return todayDate;
}

// get pending task for particular employee
const getPendingTask = async(req,res) => {
    const { employeeID } = req.params;
    try {
      const tasks = await Task.find({
        status: 'pending' 
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); 
  }
  

  const taskReview = async (req, res) => {
    const { taskID, PerformanceScore, SoftSkillsScore, TechnicalSkillsScore } = req.body;
    console.log(taskID, PerformanceScore, SoftSkillsScore, TechnicalSkillsScore )
    const completedDate = getCurrentDate();
  
    // Validate input data
    const validPerformanceScore = !isNaN(parseFloat(PerformanceScore)) ? parseFloat(PerformanceScore) : 0;
    const validSoftSkillsScore = !isNaN(parseFloat(SoftSkillsScore)) ? parseFloat(SoftSkillsScore) : 0;
    const validTechnicalSkillsScore = !isNaN(parseFloat(TechnicalSkillsScore)) ? parseFloat(TechnicalSkillsScore) : 0;
  
      // Find the task
      let task = await Task.findOne({ taskID });
  
      if (!task) {
        return res.status(404).send("Task not found");
      }
  
      // Determine the task status based on due date and completion date
      const dueDateObj = parseDate(task.dueDate);
      const completedDateObj = parseDate(completedDate);
  
      let taskStatus = 'completed';
      if (completedDateObj > dueDateObj) {
        taskStatus = 'Due task';
      }



    try {
      // Find and update the task status to 'completed'
      const task = await Task.findOneAndUpdate(
        { taskID },
        {
          $set: {
            status: taskStatus,
            completionDate: completedDate
          }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      if (!task) {
        return res.status(404).send("Task not found");
      }
  
      const { assignedTo, dueDate, completionDate: taskCompletionDate } = task;
      const dueDateObj = parseDate(dueDate);
      const taskCompletionDateObj = parseDate(taskCompletionDate || completedDate);
  
      // Find all employees who are assigned to this task
      const employees = await Employee.find({
        EmployeeID: assignedTo
      });
  
      if (employees.length === 0) {
        return res.status(404).send("No employees found"); 
      }
  
      // Update each employee's record based on task completion status
      for (const employee of employees) {
        const newProjectsDue = (taskCompletionDateObj > dueDateObj) ? (employee.ProjectsDue || 0) + 1 : employee.ProjectsDue;
        console.log(newProjectsDue)
        const newProjectsCompleted = (taskCompletionDateObj <= dueDateObj) ? (employee.ProjectsCompleted || 0) + 1 : employee.ProjectsCompleted;
        const newTechnicalSkillsScore = ((employee.TechnicalSkillsScore + validTechnicalSkillsScore) / 2).toFixed(2);
        const newSoftSkillsScore = ((employee.SoftSkillsScore + validSoftSkillsScore) / 2).toFixed(2);
        const newPerformanceScore = ((employee.PerformanceScore + validPerformanceScore) / 2).toFixed(2);

        console.log(newPerformanceScore)
        await Employee.findOneAndUpdate(
          { EmployeeID: employee.EmployeeID },
          {
            $set: {
              ProjectsDue: newProjectsDue,
              ProjectsCompleted: newProjectsCompleted,
              TechnicalSkillsScore: newTechnicalSkillsScore,
              SoftSkillsScore: newSoftSkillsScore,
              PerformanceScore: newPerformanceScore
            }
          }
        );
      }
  
      res.status(200).send("Task reviewed and employee records updated successfully");
    } catch (error) {
      console.error("Error reviewing task:", error);
      res.status(500).send("Failed to review task");
    }
  };
  
module.exports = {
    createTask,
    getPendingTask,
    taskReview
};
