import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp1 from '../components/SignUp1';
import SignUp2 from '../components/SignUp2';
import SignUp3 from '../components/SignUp3';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const MainSignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleSubmitForm = async (data) => {
    const updatedFormData = { ...formData, ...data };

    try {
      const response = await axios.post(`${API_BASE_URL}/userprofile`, updatedFormData);
      if (response.status === 201) {
        localStorage.setItem('isUserSignedUp', 'true');
        localStorage.setItem('username', response.data.username);
        navigate('/home', { replace: true });
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to sign up. Please try again.');
      navigate('/');
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
