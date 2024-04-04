// src/components/SignUp1.js
import LeftSide from "../assets/leftside.png"
import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignUp1 = ({onNext}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({name,username,email,password});
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
            onChange={(e) => setUsername(e.target.value)}
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
