const Chats = require('../Models/Chats.Models');

// to get All Employee Chats
const getAllChats = async(req,res) =>{

    try {
        const AllChats = await Chats.find({})
        res.status(201).json(AllChats);
    } catch (error) {
        res.status(400).json("Error During Fetching Chats Data")
    }
}

const CreateChats = async(req,res) =>{

    try {
        const {employeeID} = req.params;
        const { FirstName, LastName, ProfileImage, message, date, Time } = req.body;

        const newChat = new Chats({
        EmployeeID: employeeID,
        FirstName,
        LastName,
        ProfileImage,
        message,
        date,
        Time
        });
        console.log(newChat)
        const AllChats = await newChat.save(); 

        res.status(201).json(AllChats);
    } catch (error) {
        res.status(400).json("Error During save chats")
    }
}

module.exports = {
    getAllChats,
    CreateChats
}