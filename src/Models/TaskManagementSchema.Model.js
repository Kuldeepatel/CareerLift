const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({

    taskID: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    title: { 
        type: String, 
        trim: true
    },
    description: { 
        type: String  
    },
    status: { 
        type: String, 
        enum: ['pending', 'due task', 'completed'], 
        default: 'pending' 
    },
    dueDate: { 
        type: String 
    },
    createdDate: { 
        type: String 
    },
    createdBy: { 
        type: Number,
        trim: true 
    },
    completionDate: { 
        type: String 
    },
    assignedTo: [{  
        type: Number,
        unique: true,
        trim: true 
    }] 
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
