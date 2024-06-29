const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const EmployeeSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    MiddleName: {
      type: String, 
      trim: true,
    },
    EmployeeID: {
      type: Number,
      required: true,
      unique: true, 
      trim: true,
    }, 
    Password: {
      type: String,
      required: true, 
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, 
    },
    Salary: {
      type: Number,
      required: true,
      trim: true,
      default:0
    },
    Department: {
      type: String,
      trim: true,
    },
    Age: {
      type: Number,
    },
    Gender: {
      type: String,
    },
    PhoneNo: {
      type: Number,
      required: true,
      unique: true, 
      trim: true,
    },
    Position: {
      type: String,
      required: true,
      trim: true,
    },
    DOB: {
      type: Date,
      trim: true,
    },
    DateOfJoining: {
      type: Date,
      trim: true,
    },
    Address: {
      type: String,
      trim: true,
    },
    Qualifications: {
      type: String,
      required: true,
      trim: true,
    },
    Skills: {
      type: String,
      trim: true,
    },
    ProfileImage: {
      type: String,
    },
    Tasks_completed: {
      type: Number,
      default: 0,
    },
    Due_tasks: {
      type: Number,
      default: 0,
    },
    Awards: {
      type: Number,
      default: 0,
    },
    Experience: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
    Present: {
      type: Number,
      default: 0,
    },
    Absent: {
      type: Number,
      default: 0,
    },
    AttendancePercentage: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});

// Method to compare password
EmployeeSchema.methods.isPasswordCorrect = async function (Password) {
  try {
    return await bcrypt.compare(Password, this.Password);
  } catch (error) {
    return false;
  }
};

// Method to generate access token
EmployeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      Email: this.Email,
      EmployeeID: this.EmployeeID,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
EmployeeSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
