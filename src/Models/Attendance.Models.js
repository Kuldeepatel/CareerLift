const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  EmployeeId: {
    type: String, 
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  Attendance: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
