import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // State to store the user's information
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state to check if the user is an admin

  // Check if the user is logged in based on the presence of a token
  const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      // Extract the user's name from the token
      setUserName(decodedToken.userName);
      setIsAdmin(decodedToken.isAuthor); // Assuming isAdmin is included in the token payload
    }
  }, [token]);

  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Clear the token from cookies to log the user out
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    // You might also want to perform additional logout actions here

    navigate('/login');
    // After logging out, you can use navigate to redirect the user to the login page
  };

  return (
    <nav className="navbar">
      <ul className='navbar-list'>
        <li className="navbar-logo">
          <Link to="/" className="navbar-logo">Attendance App</Link>
        </li>
      </ul>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        
        {isAdmin && ( // Only show "My Courses" link if the user is logged in
          <li className="navbar-item">
            <Link to="/attendance" className='navbar-link'>Mark Attendance</Link>
          </li>
        )}
        <li className="navbar-item">
          {userName ? (
            <div className="navbar-user">
              <span className="navbar-link">Welcome, {userName}</span>
              <div className="navbar-dropdown">
                <button onClick={handleLogout} className="navbar-logout">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-link">Login / Register</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
