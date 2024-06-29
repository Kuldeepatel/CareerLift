const express = require('express');
const router = express.Router();
const { createTask, getPendingTask } = require('../Controllers/taskManagement.Controller');

// TO Create Task
router.post('/createtask/:createdBy', createTask);

// to get Pending Task of Employee By ID
router.get('/:employeeID', getPendingTask);

module.exports = router;
