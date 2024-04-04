import React, { useState, useEffect } from 'react';
import '../styles/SignUp.css';
import Logo from "../assets/Logo.png";
import { Image } from 'cloudinary-react';
import axios from 'axios';

const SignUp2 = ({ name, username, email, password, handleBackStep, onNext }) => {
    const [avatar, setAvatar] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [location, setLocation] = useState('');
    const [isUploading, setIsUploading] = useState(false); // New state for loading indicator

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUploading) {
          alert('Please wait while the image is being uploaded.'); // Alert user to wait for upload
          return;
      }
        onNext({ avatar, location });
    }

    const uploadImage = async () => {
      setIsUploading(true); // Set loading state to true during upload
      const formData1 = new FormData();
      formData1.append('file', selectedImage);
      formData1.append('upload_preset', 'nzot2ovg');

      try {
          const response = await axios.post('https://api.cloudinary.com/v1_1/dzv3xhyp1/image/upload', formData1);
          setAvatar(response.data.secure_url);
      } catch (error) {
          console.error('Error uploading image:', error);
          console.log('Cloudinary error response:', error.response);
      } finally {
          setIsUploading(false); // Set loading state to false after upload completes
      }
  };

    return (
        <div className='signup3-main'>
            <div className='header'>
                <img src={Logo} alt="Logo" className='Logo' />
            </div>
            <div className='signup2-container'>
                <h1>Welcome! Let's create your profile</h1>
                <p>Let others get to know you better! You can do these later</p>
                <form onSubmit={handleSubmit}>
                    <h2 className='step2h2'>Add an Avatar</h2>
                    <div className="avatar-container">
                        {avatar ? (
                            <Image cloudName="dzv3xhyp1" publicId={avatar} style={{borderRadius:"50%", height:"50px", width: "50px"}}  />
                        ) : (
                            <div className="blank-circle" style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "lightgray" }}></div>
                        )}
                        <div className='fileSelector'>
                            <input
                                type="file"
                                placeholder="Enter your avatar"
                                value={email}
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                required
                            />
                            <button onClick={uploadImage} className='uploadBtn' disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload Image'}</button>
                        </div>
                    </div>
                    <h2 className='step2h2'>Add your location</h2>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <div className='btncontainer'>
                        <button type="button" className='step2Btn' onClick={handleBackStep}>Back</button>
                        <button type="submit" className='step2Btn'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp2;
