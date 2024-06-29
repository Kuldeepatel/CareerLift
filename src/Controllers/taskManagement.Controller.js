const Task = require('../Models/TaskManagementSchema.Model');

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
        assignedTo: employeeID,
        status: 'pending' 
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
}
module.exports = {
    createTask,
    getPendingTask
};
