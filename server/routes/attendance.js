// server/routes/attendance.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to mark attendance for a user
router.post('/:userId/mark-attendance', async (req, res) => {
  const { userId } = req.params;
  const { date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if attendance for the given date already exists
    const existingAttendance = user.attendanceRecords.find(record => record.date.toDateString() === new Date(date).toDateString());
    if (existingAttendance) {
      existingAttendance.present = true;
    } else {
      // If attendance for the date does not exist, create a new record
      user.attendanceRecords.push({ date: new Date(date), present: true });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/students', async (req, res) => {
    try {
      // Find all users with role 'student' and populate their attendance records
      const students = await User.find({ role: 'user' }).populate('attendanceRecords');
      res.status(200).json(students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  router.post('/mark-attendance', async (req, res) => {
  const { userId, date } = req.body;
  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has an attendance record for the given date
    const existingRecordIndex = user.attendanceRecords.findIndex(record => record.date.toDateString() === new Date(date).toDateString());
    if (existingRecordIndex !== -1) {
      return res.status(400).json({ error: 'Attendance already marked for this date' });
    }

    // Add the attendance record for the user
    user.attendanceRecords.push({ date, present: true });
    await user.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Failed to mark attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});


router.post('/mark-attendance', async (req, res) => {
  const { userId, date } = req.body;
  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has an attendance record for the given date
    const existingRecordIndex = user.attendanceRecords.findIndex(record => record.date.toDateString() === new Date(date).toDateString());
    if (existingRecordIndex !== -1) {
      return res.status(400).json({ error: 'Attendance already marked for this date' });
    }

    // Add the attendance record for the user
    user.attendanceRecords.push({ date, present: true });
    await user.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Failed to mark attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

module.exports = router;
