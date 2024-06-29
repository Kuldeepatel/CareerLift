const mongoose = require('mongoose');

const EmployeePromotionSchema = new mongoose.Schema({
    
    EmployeeID: {
        type: Number,
        required: true,
        unique: true
    },
    FirstName: {
        type: String,
        trim: true
    },
    LastName: {
        type: String,
        trim: true
    },
    Promotion: {
        type: String,
        required: true
    },
    Salary : {
        type : Number
    },
    Position : {
        type : String
    },
    PromotionScore: {
        type: String,
        required: true
    },
    ProfileImage: {
        type: String,
    }
}, {
    timestamps: true
});

const Promotion = mongoose.model('Promotion', EmployeePromotionSchema);

module.exports = Promotion;
