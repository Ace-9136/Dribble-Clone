import React, { useEffect, useState } from 'react';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import SignUp3 from './SignUp3';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const MainSignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));  
    setStep(step + 1); // Increment step to navigate to the next step
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleBackStep = () => {
    setStep(step - 1); // Decrement step to navigate to the previounps step
  };

  const handleSubmitForm = async (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    const {avatar}=formData;
    try {
      // Make a POST request to the backend on localhost:3000
      const response = await axios.post('http://localhost:3000/api/userprofile', formData);
      console.log('Response from backend:', response.data);
      localStorage.setItem('isUserSignedUp', true); 
      navigate('/home', { replace: true , state:{avatar}});
    } catch (error) {
      console.error('Error submitting form:', error);
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
