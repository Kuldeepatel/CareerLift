const Chats = require('../Models/Chats.Models');
const {uploadOnCloudinary} = require('../utils/cloudinary');
// to get All Employee Chats
const getAllChats = async(req,res) =>{

    try {
        const AllChats = await Chats.find({})
        res.status(201).json(AllChats);
    } catch (error) {
        res.status(400).json("Error During Fetching Chats Data")
    }
}

const CreateChats = async (req, res) => {
    try {
      const { employeeID } = req.params;
      const { FirstName, LastName, ProfileImage, message, date, Time } = req.body;
  
      // Handle file upload if exists
      let fileUrl = null;
    if (req.file) {
      const fileLocalPath = req.file.path;
      fileUrl = await uploadOnCloudinary(fileLocalPath); 
    }

  
      // Save chat data including Cloudinary URL if file was uploaded
      const newChat = new Chats({
        EmployeeID: employeeID,
        FirstName,
        LastName,
        ProfileImage,
        message ,
        date,
        Time,
        file: fileUrl?.url 
      });
  
      const AllChats = await newChat.save();
  
      res.status(201).json(AllChats);
    } catch (error) {
      res.status(400).json("Error During save chats");
    }
  };
  
  module.exports = CreateChats;
  

module.exports = {
    getAllChats,
    CreateChats
}