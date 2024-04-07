import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../styles/Home.css"
import Logo from "../assets/Logo.png";
import { Image } from 'cloudinary-react';

const Navbar = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.setItem('isUserSignedUp', false); 
    localStorage.setItem('username', null); 
    window.location.reload();
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <nav className="navbar">    
      <div className='left'>
        <Link to="/home" className="navbar-logo">
          <img src={Logo} className='logo' alt="Dribbble Logo" /> 
        </Link>
        {/* Hamburger button */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {/* Sidebar */}
        {showSidebar && (
          <div className="sidebar">
            <div className="nav-item">
              <Link to="/home" className="nav-Link">Inspiration</Link>
            </div>
            <div className="nav-item">
              <Link to="/home" className="nav-Link">Find Work</Link>
            </div>
            <div className="nav-item">
              <Link to="/home" className="nav-Link">Learn Design</Link>
            </div>
            <div className="nav-item">
              <Link className="nav-Link">Go Pro</Link>
            </div>
          </div>
        )}
      </div>
      <div className='right'>
        <div className="nav-item search">
          <input type="text" className="nav-Link nav-search" placeholder="Search" />
        </div>
        <div className="nav-item">
          <Image cloudName="dzv3xhyp1" publicId={user.avatar} style={{borderRadius:"50%", height:"50px", width: "50px", marginLeft:"10px"}}>
          </Image>
        </div>
        <div className="nav-item">
          <button className="nav-button">Upload</button>
        </div>
        <div className="nav-item">
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
