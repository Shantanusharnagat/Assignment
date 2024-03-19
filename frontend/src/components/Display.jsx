import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Display.css'; // Import CSS file for styling

const Display = () => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Check if the user is logged in based on the presence of a token
  const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      // Extract the user's name and userId from the token
      setUserName(decodedToken.userName);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  const markAttendance = async () => {
    try {
      // Make a POST request to your backend API to mark attendance
      const response = await fetch(`http://localhost:5000/api/attendance/${userId}/mark-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: new Date() }), // Send today's date
      });

      if (response.ok) {
        // Attendance marked successfully
        setAttendanceMarked(true);
        console.log('Attendance marked successfully');
      } else {
        // Handle errors
        console.error('Failed to mark attendance:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to mark attendance:', error.message);
    }
  };

  return (
    <div className="display-container">
      <h1>Attendance Display</h1>
      {userName ? (
        <>
          <p className="welcome-message">Welcome, <span className="user-name">{userName}</span>!</p>
          {!attendanceMarked && <button className="mark-attendance-button" onClick={markAttendance}>Mark Today's Attendance</button>}
          {attendanceMarked && <p className="attendance-marked-message">Attendance marked successfully!</p>}
        </>
      ) : (
        <p className="login-message">Please login to mark attendance.</p>
      )}
    </div>
  );
};

export default Display;
