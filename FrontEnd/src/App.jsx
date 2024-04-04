import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainSignUp from "./components/MainSignUp";
import Home from "./components/Home";
import './App.css';

function App() {
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    // Check if user is signed up (you can use any method to check this)
    const isUserSignedUp = localStorage.getItem('isUserSignedUp');
    if (isUserSignedUp) {
     setSignedUp(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={signedUp ? <Home /> : <MainSignUp />} />
          <Route path="/home" element={signedUp ? <Home /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
