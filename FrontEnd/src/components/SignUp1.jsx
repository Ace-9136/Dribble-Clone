// src/components/SignUp1.js
import LeftSide from "../assets/leftside.png"
import React, { useState } from 'react';
import '../styles/SignUp.css';
import axios from 'axios'; 


const SignUp1 = ({onNext}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errorMsg, setError] = useState('');
  
  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:3000/api/checkUsername/${newUsername}`);
        if (response.data.exists) {
          setError('Username already exists');
        } else {
          setError('');
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = '';

  if (password.length < 6) {
    error = "Password must be at least 6 characters";
  } else if (!terms) {
    error = "Accept terms and conditions";
  }

  if (error) {
    setError(error);
  } else {
    onNext({name, username, email, password});
  }
  };

  return (
    <div className="signup1-main">
    <div className='leftSide'>
    <img className='leftSideImg' src={LeftSide} alt="Background Image" />
    </div>
    <div className='rightSide'>
    <div className="login-container">
        <p className="loginUrl">Already a member? <a>Sign In</a></p>
      <h2>Sign up to Dribble</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {errorMsg && <p className="error">• {errorMsg}</p>}
        <div className="form-group1">
        <div className='first'>
          <label htmlFor="name">Name</label>
          <br/>
          <input
            type="text"
            id="name"
            placeholder='John'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className='last'>
          <label htmlFor="username">Username</label>
          <br/>
          <input
            type="text"
            id="username"
            placeholder='John96'
            value={username}
            onChange={handleUsernameChange}
            required
          />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br/>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='account@refero.design'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br/>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='At least 6 characters'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='terms'>
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Creating an account means you're okay with our Terms of Service, Privacy Policy, and our default Notification Settings.
          </label>
          </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default SignUp1;
