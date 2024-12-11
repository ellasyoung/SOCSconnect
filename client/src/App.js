//Natalie Doehla 
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
import RequestTime from "./pages/RequestTime";
import RecurringWeekly from "./pages/RecurringWeekly";
import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute"; 
import AppWrapper from "./auth/AppWrapper";
import RecurringMonthly from "./pages/RecurringMonthly";
import MeetingPage from './pages/MeetingPage';
import SingleBooking from './pages/SingleBooking'
import MeetingPoll from "./pages/MeetingPolls";

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
      <GlobalStyle />
      <AuthProvider> 
      <AppWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/register" element={<Register />} />            
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/meeting/:meetingId" element={<MeetingPage />} />

            <Route 
            path="/single-booking" 
            element={
              <ProtectedRoute>
                <SingleBooking />
              </ProtectedRoute>
            }
            />
            
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/request-time" 
              element={
                <ProtectedRoute>
                  <RequestTime />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recurring-weekly" 
              element={
                <ProtectedRoute>
                  <RecurringWeekly />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/recurring-monthly"
              element={
                <ProtectedRoute>
                  <RecurringMonthly />
                </ProtectedRoute>
              }
              />
            <Route
              path="/meeting-poll"
              element={
                <ProtectedRoute>
                  <MeetingPoll />
                </ProtectedRoute>
              }
              />
          </Routes>
        </Router>
      </AppWrapper>
      </AuthProvider>
    </>
  );
}

export default App;
