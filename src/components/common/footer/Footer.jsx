import React from "react";
import { footer } from "../../../constants/data";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="p-5 py-12 bg-primary-main flex items-center justify-between px-12">
        <div className="text-white">
          <h1 className="font-bold text-5xl leading-relaxed">Do You Have Questions ?</h1>
          <p className=" text-lg">We'll help you to grow your career and growth.</p>
        </div>
        {/* <a href="tel:5555555555" className="btn-tertiary"> */}
          <button className="btn-tertiary">Contact Us Today</button>
        {/* </a> */}
      </section>

      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src="../images/logo-light.png" alt="" />
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
              </p>

              <div className="input flex">
                <input
                  type="text"
                  placeholder="Email Address"
                  style={{
                    borderRadius: "8px 0 0  8px",
                  }}
                />
                <button
                  className="btn-primary"
                  style={{
                    borderRadius: "0 8px  8px 0",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© {year} RentUP.</span>
      </div>
    </>
  );
};

export default Footer;
