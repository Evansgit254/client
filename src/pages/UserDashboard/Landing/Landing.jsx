import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/common/header/Header";
import Footer from "../../../components/common/footer/Footer";

const Landing = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Landing;
