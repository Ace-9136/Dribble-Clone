import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../styles/Home.css"
import Logo from "../assets/Logo.png";
import { Image, Transformation } from 'cloudinary-react';


const Navbar = ({}) => {
  const avatar = "https://res.cloudinary.com/dzv3xhyp1/image/upload/v1712155145/arrbrukqn39bc9pxvsez.jpg";
  return (
    <nav className="navbar">    
        <div className='left'>
      <Link to="/" className="navbar-logo" >
        <img src={Logo} className='logo' alt="Dribbble Logo" />  {/* Replace with your Dribbble logo image */}
      </Link>
        <div className="nav-item">
          <Link to="/inspiration" className="nav-Link">Inspiration</Link>
        </div>
        <div className="nav-item">
          <Link to="/find-work" className="nav-Link">Find Work</Link>
        </div>
        <div className="nav-item">
          <Link to="/learn-design" className="nav-Link">Learn Design</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-Link">Go Pro</Link>
        </div>
        </div>
        <div className='right'>
        <div className="nav-item">
          <input type="text" className="nav-Link nav-search" placeholder="Search" />
        </div>
        <div className="nav-item">
          <Image cloudName="dzv3xhyp1" publicId={avatar} style={{borderRadius:"50%", height:"50px", width: "50px", marginLeft:"10px"}}>
        </Image>
        </div>
        <div className="nav-item">
          <button className="nav-button">Upload</button>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
