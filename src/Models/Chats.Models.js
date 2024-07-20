const mongoose = require('mongoose');

const ChatsSchema = new mongoose.Schema({
  EmployeeID : {
    type: String, 
    required: true 
  },
  FirstName : {
    type: String, 
    required: true
  },
  LastName : {
    type: String, 
    required: true
  },
  ProfileImage : {
    type: String, 
    required: true
  },
  message: {
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  Time : {
    type :String,
    required : true
  },
  file : {
    type : String
  }
});

module.exports = mongoose.model('Chats', ChatsSchema);
