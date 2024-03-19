import React, { useState, useEffect } from 'react';
import './Tutordisplay.css'; // Import CSS file for styling

const Tutordisplay = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Fetch students and their attendance records from your backend API
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

  return (
    <div className="attendance-table-container">
      <h1>Student Attendance Records</h1>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            student.attendanceRecords.map(record => (
              <tr key={record._id}>
                <td>{student.username}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.present ? 'Present' : 'Absent'}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tutordisplay;
