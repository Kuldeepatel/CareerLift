const express = require('express');
const router = express.Router();
const { createTask, getPendingTask, taskReview } = require('../Controllers/taskManagement.Controller');

// TO Create Task
router.post('/createtask/:createdBy', createTask);

// to get Pending Task of Employee By ID
router.get('/getPendingTask', getPendingTask);

// to review Tasks
router.post('/completetask', taskReview);

module.exports = router;
