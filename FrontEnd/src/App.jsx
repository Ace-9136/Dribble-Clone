import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSignUp from "./pages/MainSignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home /> } />
          <Route path="/signup" element={<MainSignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
