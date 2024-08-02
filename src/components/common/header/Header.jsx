import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header className="P-5">
        <div className="container flex items-center justify-between">
          <div className="logo">
            {/* <img src="./images/logo.png" alt="" /> */}
            <p className="text-primary-main font-bold text-xl">Rent Up</p>
          </div>
   
          <div className="flex space-x-3">
            <Link to="/login" className="text-white">
              <button className="btn-primary">Sign In</button>
            </Link>
          <Link to="/signup" className="text-white">
            <button className="btn-secondary">Register</button>
          </Link>
          </div>
{/* 
          <div className="toggle ">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
