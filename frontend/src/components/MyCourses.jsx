import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCourses.css'; // Import CSS file for styling
import './Calender.css'; // Import custom CSS file for styling

const MyCourses = () => {
  const [date, setDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [attendanceMarked, setAttendanceMarked] = useState(false); // State to track if attendance is marked

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error.message);
    }
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleStudentChange = event => {
    setSelectedStudent(event.target.value);
  };

  const handleAttendanceMark = async () => {
    if (!selectedStudent) {
      setShowPopup(true); // Show the popup if no student is selected
      return; // Stop further execution
    }

    try {
      const response = await fetch('http://localhost:5000/api/attendance/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedStudent,
          date: date.toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        console.log('Attendance marked successfully');
        setAttendanceMarked(true); // Set state to indicate attendance marked
      } else {
        console.error('Failed to mark attendance:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to mark attendance:', error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="my-courses-container">
        <h1>Mark Attendance</h1>
        <div className="attendance-form">
          <select value={selectedStudent} onChange={handleStudentChange}>
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.username}</option>
            ))}
          </select>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className={'attendance-calendar'}
          />
          <button className="attendance-button" onClick={handleAttendanceMark}>Mark Attendance</button>
          {/* Conditional rendering for the popup */}
          {showPopup && (
            <div className="popup">
              <p>Please select a student before marking attendance.</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          )}
          {/* Conditional rendering for attendance marked confirmation */}
          {attendanceMarked && (
            <div className="popup">
              <p>Attendance marked successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
