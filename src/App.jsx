import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './pages/AdminDashboard/Header.jsx';
import Sidebar from './pages/AdminDashboard/Sidebar.jsx';
import Houses from './pages/AdminDashboard/Houses.jsx';
import Bookings from './pages/AdminDashboard/Bookings.jsx';
import Clients from './pages/AdminDashboard/Clients.jsx';
import Login from './pages/Auth/LoginMain.jsx';
import SignUp from "./pages/Auth/SignUp.jsx"
import { AppProvider, useAuth } from './context/contextApi.jsx';
import ProtectedRoute from './pages/Auth/ProtectedRoute.jsx';
import Reviews from './pages/AdminDashboard/Reviews.jsx';
import Payments from './pages/AdminDashboard/Payments.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Home from './components/home/Home.jsx';
import About from './pages/Landing/about/About.jsx'
import Services from './pages/Landing/services/Services.jsx'
import Blog from './pages/Landing/blog/Blog.jsx'
import Pricing from './pages/Landing/pricing/Pricing.jsx'
import Contact from './pages/Landing/contact/Contact.jsx'
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx'


function App() {

  return (
    <Router>
      
        <Routes>
        <Route path="/" element={<Landing />}>
                    <Route index element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/services" element={<Services />} />
                    <Route exact path="/blog" element={<Blog />} />
                    <Route exact path="/pricing" element={<Pricing />} />
                    <Route exact path="/contact" element={<Contact />} />
                </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute/>}>
          <Route index element={<AdminDashboard />} />
          <Route path="houses" element={<Houses />} />
          <Route path="clients" element={<Clients />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
