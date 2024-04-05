import React, { useEffect, useState } from 'react';
import SignUp1 from '../components/SignUp1';
import SignUp2 from '../components/SignUp2';
import SignUp3 from '../components/SignUp3';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 

const MainSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));  
    setStep(step + 1); 
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleBackStep = () => {
    setStep(step - 1); 
  };

  const handleSubmitForm = async (data) => {
    // Include selectedOption in form data
    const updatedFormData = { ...formData, ...data };
  
    try {
      const response = await axios.post('http://localhost:3000/api/userprofile', updatedFormData);
      console.log('Response from backend:', response.data);
      
      if (response.status === 201) {
        localStorage.setItem('isUserSignedUp', true);
        navigate('/home', {
          replace: true,
          state: { username: response.data.username }
        });
      } else {
        throw new Error('Failed to sign up');
        // Or you can throw an error with the actual message from the backend
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to sign up. Please try again.'); // Show an alert for the error
      navigate('/'); // Navigate back to the '/' route
    }
  };
  

  return (
    <div className="three-step-form">
      {step === 1 && <SignUp1 onNext={handleNextStep} />}
      {step === 2 && (
        <SignUp2
          onNext={handleNextStep}
          onBack={handleBackStep}
          formData={formData}
        />
      )}
      {step === 3 && (
        <SignUp3
          onBack={handleBackStep}
          onSubmit={handleSubmitForm}
          formData={formData}
        />
      )}
    </div>
  );
};

export default MainSignUp;
