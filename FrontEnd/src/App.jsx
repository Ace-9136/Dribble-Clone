import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainSignUp from "./pages/MainSignUp";
import Home from "./pages/Home";
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainSignUp />} />
          <Route path="/home" element={<Home /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
