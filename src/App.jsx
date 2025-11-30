// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Register from './pages/Auth/Register.jsx'
import Login from "./pages/Auth/Login.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Students from "./pages/Student.jsx";
import Home from "./pages/Home/Home.jsx";
import AppFooter from './pages/Home/AppFooter.jsx'
import UserManagement from './pages/Dashboard/UserManagement.jsx'
import About from "./pages/Home/About.jsx";
import 'antd/dist/reset.css';
// import 'react-toastify/dist/ReactToastify.css';
import FeeManagement from "./pages/Dashboard/FeeManagement.jsx";
import Attendance from "./pages/Dashboard/Attendance.jsx";
import StudentInfo from './pages/Home/StudentInfo.jsx'
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard.jsx";
import ResultEntry from "./pages/Dashboard/ResultEntry.jsx";
import FeeStatus from "./pages/Home/FeeStatus.jsx";
import StudentProfile from "./pages/Home/StudentProfile.jsx";
import Contact from "./pages/Home/Contact.jsx";
import EventsPage from "./pages/Home/EventsPage.jsx";
import Profile from "./pages/Home/Profile.jsx";
import Schedule from "./pages/Home/Schedule.jsx";
import NotFoundPage from "./pages/Home/NotFoundPage.jsx";
const App = () => {
  return (
       <SnackbarProvider maxSnack={3}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<EventsPage />} />
       
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}/>
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>}/>
        <Route path="/UserManagement" element={<ProtectedRoute><UserManagement /></ProtectedRoute>}/>
        <Route path="/FeeManagement" element={<ProtectedRoute><FeeManagement /></ProtectedRoute>}/>
        <Route path="/Attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>}/>
        <Route path="/Student-info" element={<StudentInfo />}/>
        <Route path="/Result-entry" element={<ProtectedRoute><ResultEntry /></ProtectedRoute>}/>
        <Route path="/fee-status" element={<FeeStatus />}/>
        <Route path="/student-profile" element={<StudentProfile />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/schedule" element={<Schedule />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      
      <AppFooter/>
        <Toaster position="top-right" reverseOrder={false} />
    </Router>
      </SnackbarProvider>
     
  );
};

export default App;
