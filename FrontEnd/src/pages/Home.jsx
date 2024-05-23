import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import emailImage from '../assets/email.png';
import '../styles/Home.css';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const USER_INFO_ENDPOINT = `${API_BASE_URL}/userInformation`;

  useEffect(() => {
  const isUserSignedUp = localStorage.getItem('isUserSignedUp');
  const username = localStorage.getItem('username');
  
  console.log('isUserSignedUp:', isUserSignedUp); // Debugging statement
  console.log('username:', username); // Debugging statement

  if (!isUserSignedUp || isUserSignedUp === 'false') {
    navigate('/signup', { replace: true });
  } else if (username) {
    axios.get(`${USER_INFO_ENDPOINT}/${username}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }
}, [navigate]);


  return (
    <div>
      <Navbar user={user} />
      <div className='home'>
        <div className="email-verification">
          <h1>Please verify your email...</h1>
          <img src={emailImage} alt='Email Widget' />
          <p>Please verify your email address. We&apos;ve sent a confirmation email to:</p>
          <p><b>{user.email}</b></p>
          <p>Click the confirmation link in that email to begin using Dribbble.</p>
          <p>Didn&apos;t receive the email? Check your Spam folder, it may have been caught by a filter. If you still don&apos;t see it, you can resend the confirmation email.
            <b><a href="/home">Resend confirmation email</a></b></p>
          <p>Wrong email address? <b><a href="/home">Change it</a>.</b></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
