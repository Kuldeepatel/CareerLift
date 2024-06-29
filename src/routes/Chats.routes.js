const { Router } = require('express');
const {getAllChats,CreateChats} = require('../Controllers/Chats.Controller.js');
const router = Router();

// to post chats for particular Employee 
router.post('/:employeeID', CreateChats);

//  to get All chats
router.get('/', getAllChats);

module.exports = router;
