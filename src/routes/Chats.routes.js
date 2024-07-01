const { Router } = require('express');
const {getAllChats,CreateChats} = require('../Controllers/Chats.Controller.js');
const router = Router();
const { upload } = require('../middlewares/multer.middleware.js')

// to post chats for particular Employee 
router.post('/:employeeID',upload.single('file'), CreateChats);

//  to get All chats
router.get('/', getAllChats);

module.exports = router;
