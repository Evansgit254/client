import { Badge, Button, Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsFillGearFill,
  BsFillPersonFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import "./AdminDashboard.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: (
      <Button
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75em",
        }}
      >
        <BsFillPersonFill />
        <p>Profile</p>
      </Button>
    ),
  },

  {
    key: "2",
    label: (
      <Button
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75em",
        }}
      >
        <BsFillGearFill />
        <p>Settings</p>
      </Button>
    ),
  },
  {
    key: "3",
    label: (
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75em",
        }}
      >
        <BsBoxArrowRight />
        <p>Logout</p>
      </Button>
    ),
  },
];

function Header({ OpenSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <header className="header">
      {/* <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div> */}
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div
        className="header-right"
        style={{
          display: "flex",
          gap: "1.75em",
        }}
      >
        <BsFillBellFill className="icons" />
        <Badge count={1} dot>
          <Dropdown
            open={openDropdown}
            menu={{
              items,
            }}
          >
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              <BsPersonCircle
                style={{ background: "transparent", cursor: "pointer" }}
              />
            </div>
          </Dropdown>
        </Badge>
      </div>
    </header>
  );
}

export default Header;
