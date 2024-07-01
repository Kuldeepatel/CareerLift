const Employee = require('../Models/Employee.Models.js');
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const Attendance = require('../Models/Attendance.Models.js');

// Function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Employee.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

// Function to handle employee signup
const signup = async (req, res) => {
  const {
    FirstName, MiddleName, LastName, EmployeeID, Password, Email, Salary, Department, Age, Gender,
    PhoneNo, Position, DOB, DateOfJoining, Address, Qualifications, Skills, Awards, Experience
  } = req.body;

  // Check if all required fields are provided
  if ([FirstName, LastName, EmployeeID, Password, Email, Salary, Department, Age,
    PhoneNo, Position, DateOfJoining, Qualifications].some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if profile image is uploaded
  const profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    return res.status(400).json({ message: "Profile image is required" });
  }

  try {
    const profileImageUrl = await uploadOnCloudinary(profileImageLocalPath);

    // Check if employee exists by EmployeeID or Email
    let employee = await Employee.findOne({ $or: [{ EmployeeID }, { Email }] });

    if (employee) {
      // Update existing employee
      employee.FirstName = FirstName;
      employee.MiddleName = MiddleName;
      employee.LastName = LastName;
      employee.Password = Password;
      employee.Email = Email;
      employee.Salary = Salary;
      employee.Department = Department;
      employee.Age = Age;
      employee.Gender = Gender;
      employee.PhoneNo = PhoneNo;
      employee.Position = Position;
      employee.DOB = DOB;
      employee.DateOfJoining = DateOfJoining;
      employee.Address = Address;
      employee.Qualifications = Qualifications;
      employee.Skills = Skills;
      employee.Awards = Awards;
      employee.Experience = Experience;
      employee.ProfileImage = profileImageUrl?.url;

      await employee.save();

      return res.status(200).json({ message: "Employee updated successfully", employee });
    } else {
      // Create new employee
      employee = new Employee({
        FirstName, MiddleName, LastName, EmployeeID, Password, Email, Salary, Department, Age, Gender,
        PhoneNo, Position, DOB, DateOfJoining, Address, Qualifications, Skills, Awards, Experience,
        ProfileImage: profileImageUrl?.url
      });

      await employee.save();

      return res.status(201).json({ message: "Employee registered successfully", employee });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Please try again later" });
  }
};


// Function to handle employee login
const signin = async (req, res) => {
  const { Email, EmployeeID, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Employee ID or Email is required" });
  }

  let existUser;
  if (Email) {
    existUser = await Employee.findOne({ Email });
  }
  if (!existUser) {
    existUser = await Employee.findOne({ EmployeeID });
  }

  if (!existUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await existUser.isPasswordCorrect(Password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existUser._id);
  const loggedInUser = await Employee.findById(existUser._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: false };

  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User logged in successfully", user: loggedInUser, accessToken });
};


// Function to handle employee logout
const logoutEmployee = async (req, res) => { 
  try {
      await Employee.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true } 
    );

    const options = { httpOnly: true, secure: false };
    return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully", status: 200 });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}; 

// Function to refresh access token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await Employee.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({ message: "Refresh token is expired or used" });
    }
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    return res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
      .json({ message: "Access token refreshed", accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: error?.message || "Invalid refresh token" });
  }
}; 
 
// to  employee by ID
const getAllEmployee = async (req, res) => {
  try {
    const { employeeID } = req.params; 
    const employee = await Employee.findOne({ EmployeeID: employeeID }).select('-Password -refreshToken');
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  to get all employees for attendance
const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({}, '-Password -refreshToken');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  to mark attendance
const markAttendance = async (req, res) => {
  const { attendanceData, date } = req.body;

  try {

    // to convert attendancedata into arrays format 
    const attendanceEntries = Object.entries(attendanceData).map(([employeeId, status]) => ({
      EmployeeId: employeeId,
      Date: date,
      Attendance: status
    }));

    for (const entry of attendanceEntries) {
      await Attendance.updateOne(
        { EmployeeId: entry.EmployeeId, Date: entry.Date },
        { $set: { Attendance: entry.Attendance } },
        { upsert: true }
      );

      const totalAttendance = await Attendance.find({ EmployeeId: entry.EmployeeId });
      const presentCount = totalAttendance.filter(record => record.Attendance === 'present').length;
      const AbsentCount = totalAttendance.length - presentCount;
      


      await Employee.updateOne(
        { EmployeeID: entry.EmployeeId },
        { $set: { Present: presentCount, Absent : AbsentCount} }
      );
    }

    res.status(200).json({ message: "Attendance marked successfully", data: attendanceEntries });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Function to get attendance by date
const getAttendanceByDate = async (req, res) => {
  const { date } = req.params;
  try {
   
    const attendanceRecords = await Attendance.find({ Date: date });
    const presentCount = attendanceRecords.filter(record => record.Attendance === 'present').length;
    const absentCount = attendanceRecords.filter(record => record.Attendance === 'absent').length;

    res.status(200).json({ presentCount, absentCount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = {
  signup,
  signin,
  refreshAccessToken,
  logoutEmployee,
  markAttendance,
  getAttendanceByDate,
  getEmployee,
  getAllEmployee
};
