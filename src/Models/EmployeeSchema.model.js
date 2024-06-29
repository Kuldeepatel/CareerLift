const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    
    EmployeeID: {
        type: String,
        required: true,
        unique: true
    },
    Attendance: {
        type: Number,
        required: true
    },
    Tasks_completed: {
        type: Number,
        required: true
    },
    Due_tasks: {
        type: Number,
        required: true
    },
    Education: {
        type: String, 
        required: true
    },
    Awards: {
        type: Number,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Experience: {
        type: Number,
        required: true
    },
    PromotionScore: {
        type: Number,
        required: true
    },
    promoted: {
        type: Number,
        required: true
    }
}, { collection: 'ModelDataSet' });

module.exports = mongoose.model('EmployeeSchema', employeeSchema);
