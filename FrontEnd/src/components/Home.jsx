import React, { useEffect } from 'react';
import Navbar from "./Navbar";
import email from "../assets/email.png";
import '../styles/Home.css';
const Home = ({}) => {
  return (
    <div>
      <Navbar />
      <div className='home'>
      <div className="email-verification">
      <h1>Please verify your email...</h1>
      <img src={email} alt='Email Widget'></img>
      <p>Please verify your email address. We've sent a confirmation email to:</p>
      <p><b>account@refero.design</b></p>
      <p>Click the confirmation link in that email to begin using Dribbble.</p>
      <p>Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can resend the confirmation email.
      <b><a href="/"> Resend confirmation email</a></b></p>
      <p>Wrong email address? <b><a href="/">Change it</a>.</b></p>
      </div>
    </div>
    </div>
  )
}

export default Home