import React, { useEffect, useState } from 'react';
import '../styles/SignUp.css';
import Logo from "../assets/Logo.png";
import Card from './Card';
import option1 from "../assets/option1.png";
import option2 from "../assets/option2.png";
import option3 from "../assets/option3.png";

const SignUp3 = ({ handleBackStep, onSubmit, formData }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    console.log(selectedOption);
  },[selectedOption]);

  const handleFormSubmit = () => {
    // Add the selected option to the form data
    onSubmit({ selectedOption });
  };
  
  return (
    <div className='signup3-main'>
      <div className='header'> 
        <img src={Logo} alt="Logo" className='Logo'/>
      </div>
      <div className='signup3-container'>
        <h1>What brings you to dribble?</h1>
        <p>Select the options that best describe you. Don't worry, you can explore other options later.</p>
        <div className='card-container'>
          <Card img={option1} content="I'm a designer looking to share my work" onClick={() => handleOptionChange('designer')} isSelected={selectedOption === 'designer'} />
          <Card img={option2} content="I'm looking to hire a designer" onClick={() => handleOptionChange('recruiter')} isSelected={selectedOption === 'recruiter'} />
          <Card img={option3} content="I'm looking for design inspiration" onClick={() => handleOptionChange('inspiration')} isSelected={selectedOption === 'inspiration'} />
        </div>
        <button type="submit" onClick={handleFormSubmit}>Finish</button>
      </div>
    </div>
  );
}

export default SignUp3;
