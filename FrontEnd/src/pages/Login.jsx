import LeftSide from "../assets/leftside.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = () => {
    navigate('/signup', { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(username);
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      if (response.status === 200) {
        localStorage.setItem('isUserSignedUp', 'true');
        localStorage.setItem('username', response.data.username);
        navigate('/home', { replace: true });
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div className="signup1-main">
      <div className='leftSide'>
        <img className='leftSideImg' src={LeftSide} alt="Background Image" />
      </div>
      <div className='rightSide'>
        <div className="login-container">
          <p className="loginUrl">Don&apos;t have an account? <a onClick={handleSignup}>Sign Up</a></p>
          <h2>Login to Dribble</h2>
          <form onSubmit={handleLogin} className="login-form">
            {errorMsg && <p className="error">• {errorMsg}</p>}
            <div className="form-group">
              <label htmlFor="email">Username / Email</label>
              <br />
              <input
                type="text"
                id="email"
                value={username}
                placeholder='account@refero.design'
                style={{ maxWidth: "100%"}}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
