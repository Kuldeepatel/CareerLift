const { Router } = require('express');
const { signup, logoutEmployee, signin, getAllEmployee, markAttendance, getAttendanceByDate,getEmployee } = require('../Controllers/Employee.Controllers.js');
const { upload } = require('../middlewares/multer.middleware.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// Registration
router.post('/signup', upload.single('profileImage'), signup);

router.post('/logout', verifyJWT, logoutEmployee);

// Login
router.post('/signin', signin);
 
// Attendance - get all employees
router.get('/attendance', getEmployee);

// Mark Attendance
router.post('/markAttendance', markAttendance);

// met Attendance by Date
router.get('/attendance/:date', getAttendanceByDate);

// get  Employee by ID
router.get('/:employeeID', getAllEmployee);

module.exports = router;
