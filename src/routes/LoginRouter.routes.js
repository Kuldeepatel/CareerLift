const { Router } = require('express');
const { signin,logoutEmployee } = require('../Controllers/Login.Contollers.js');
const router = Router();

// Login
router.post('/signin', signin);

//  Logout
router.post('/logout', verifyJWT, logoutEmployee);

module.exports = router;
