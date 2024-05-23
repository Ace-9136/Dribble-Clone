import { useState } from 'react';
import LeftSide from "../assets/leftside.png";
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import axios from 'axios';

const SignUp1 = ({ onNext }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.trim() !== '') {
      try {
        const response = await axios.get(`${API_BASE_URL}/checkUsername/${newUsername}`);
        setErrorMsg(response.data.exists ? 'Username already exists' : '');
      } catch (error) {
        console.error('Error checking username:', error);
      }
    } else {
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
    } else if (!terms) {
      setErrorMsg('Accept terms and conditions');
    } else {
      try {
        const emailExistsResponse = await axios.get(`${API_BASE_URL}/checkEmail/${email}`);
        if (emailExistsResponse.data.exists) {
          setErrorMsg('Email Already Exists');
          return; // Stop execution if email already exists
        }
        await onNext({ name, username, email, password });
      } catch (error) {
        console.error('Error signing up:', error);
        setErrorMsg('Failed to sign up. Please try again.');
      }
    }
  };
  const handleLogin = ()=>{
    navigate('/login', { replace: true })
  }

  return (
    <div className="signup1-main">
      <div className='leftSide'>
        <img className='leftSideImg' src={LeftSide} alt="Background Image" />
      </div>
      <div className='rightSide'>
        <div className="login-container">
          <p className="loginUrl">Already a member? <a onClick={handleLogin}>Sign In</a></p>
          <h2>Sign up to Dribble</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {errorMsg && <p className="error">• {errorMsg}</p>}
            <div className="form-group1">
              <div className='first'>
                <label htmlFor="name">Name</label>
                <br />
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
                <br />
                <input
                  type="text"
                  id="username"
                  placeholder='John96'
                  style={{ maxWidth: "100%"}}
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <br />
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
              <br />
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
                Creating an account means you&apos;re okay with our <a><b>Terms of Service</b></a>, <a><b>Privacy Policy</b></a>, and our default Notification Settings.
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
