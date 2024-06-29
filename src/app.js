const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())



// import routes
const EmployeeRouter = require('./routes/Employee.routes.js');
const predictionRoutes = require('./routes/predictionRoutes.routes.js')
const taskRouter = require('./routes/taskManagement.routes');
const Chatsroutes = require('./routes/Chats.routes.js');
// routes 

// for Employee
app.use('/api/v1/employee',EmployeeRouter)

// To Predict Promotion
app.use('/api/v1/predict', predictionRoutes);

// TO Task Management
app.use('/api/v1/task', taskRouter);

// to Chats
app.use('/api/v1/chats',Chatsroutes);
module.exports = {app}


// http://localhost:8000/api/v1/ 