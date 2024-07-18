import React from 'react';
// import link
import {Link} from 'react-router-dom';
// import logo
import Logo from '../../assets/img/logo.svg';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b'>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        
        {/* Notification and Account Sections */}
        <div className='flex items-center gap-6'>
          {/* Notifications */}
          <Link className='relative hover:text-green-900 transition' to="/notifications">
            <FaBell className='text-2xl' />
            <span className='absolute top-0 right-0 inline-block w-3 h-3 bg--600 rounded-full'></span>
          </Link>
          
          {/* Messages */}
          <Link className='relative hover:text-green-900 transition' to="/messages">
            <FaEnvelope className='text-2xl' />
            <span className='absolute top-0 right-0 inline-block w-3 h-3 bg--600 rounded-full'></span>
          </Link>
          
          {/* Account */}
          <Link className='bg-green-700 hover:bg-green-800 text-white p-3 rounded-full transition flex items-center justify-center' to="/account">
            <FaUserCircle className='text-2xl' />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


