import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import MyCourses from './components/MyCourses';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />          
          <Route path="/attendance" element={<MyCourses/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
