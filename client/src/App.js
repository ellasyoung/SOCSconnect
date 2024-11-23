import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { createGlobalStyle } from "styled-components";
import SunbornSansOne from './assets/fonts/Sunborn-SansOne.otf';
import Dashboard from './pages/Dashboard';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'SunbornSansOne';
    src: url(${SunbornSansOne});
    font-weight: normal;
    font-style: normal;
  }

  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;


function App() {

  return (
    <>
      <GlobalStyle/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
