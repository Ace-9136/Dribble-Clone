import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import email from "../assets/email.png";
import '../styles/Home.css';
import axios from 'axios'; 
import { useNavigate ,useLocation} from 'react-router-dom';

const Home = ({}) => {  
  const navigate = useNavigate();
  const [user, setUser]=useState({});

  useEffect(() => {
    const isUserSignedUp = localStorage.getItem('isUserSignedUp');
    const username= localStorage.getItem('username');
    if (!isUserSignedUp || isUserSignedUp === 'false') { 
      navigate('/signup');
    } else {
      if (username) {
        axios.get(`http://localhost:3000/api/userInformation/${username}`)
          .then(response => {
            setUser(response.data); 
          })
          .catch(error => {
            console.error('Error fetching user information:', error);
          });
      }
    }
  }, [navigate]);

  return (
    <div>
      <Navbar user={user}/>
      <div className='home'>
      <div className="email-verification">
      <h1>Please verify your email...</h1>
      <img src={email} alt='Email Widget'></img>
      <p>Please verify your email address. We've sent a confirmation email to:</p>
      <p><b>{user.email}</b></p>
      <p>Click the confirmation link in that email to begin using Dribbble.</p>
      <p>Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can resend the confirmation email.
      <b><a href="/home"> Resend confirmation email</a></b></p>
      <p>Wrong email address? <b><a href="/home">Change it</a>.</b></p>
      </div>
    </div>
    </div>
  )
}

export default Home