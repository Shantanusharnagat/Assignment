import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from './Navbar';

import Display from './Display';
import Tutordisplay from './Tutordisplay'; // Import TutorDisplay component

const Home = () => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      console.log(decodedToken)
      // Extract the user's name, userId, and isAdmin from the token
      setUserName(decodedToken.userName);
      setUserId(decodedToken.userId);
      setIsAdmin(decodedToken.isAuthor); // Assuming isAdmin is included in the token payload
    }
  }, []);

  return (
    <div>
      <Navbar />
      

      {isAdmin ? <Tutordisplay /> : <Display />}
    </div>
  );
};

export default Home;
