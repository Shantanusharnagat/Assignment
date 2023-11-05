import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adjust this for your backend API
import CourseCard from './Cards';
import './Display.css';
import {loadStripe} from '@stripe/stripe-js';
import {jwtDecode} from 'jwt-decode';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses/courses')
      .then(response => {
        console.log(response.data);
        setCourses(response.data);  
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const makePayment=async(course)=>{
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    
    if (!token) {
      alert("Please login to buy courses")
      window.location.href = '/login';
      return
      
    }
    const decodedToken = jwtDecode(token.split('=')[1]);
    const userId=decodedToken.userId;
  
    

    const stripe=await loadStripe("pk_test_51MgCSrSIGmj3KYA8oqOT1Y7TWGqP9hLbgzAGLJGGDeg6PWWZqcDwxKVnR0f5wVqszpG5KCRUVM7cBnPAwCyiyafd00aS8gA7pw")

    const body={
      products:[course],
      userId
    }
    const headers={
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`


    }

    const response=await fetch("http://localhost:5000/api/payment/payment",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })

    const session=await response.json()
    console.log(session)
    const result=await stripe.redirectToCheckout({
      sessionId:session.id
    })

    if(result.error){
      console.log(result.error)
    }
  }

  return (
    <div className="courses-container">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          name={course.name}
          description={course.description}
          author={course.author}
          price={course.price}
          onCourseClick={()=>makePayment(course)}
        />
      ))}
    </div>
  );
}

export default Courses;
