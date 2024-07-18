import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBookFill,
  BsHouseAddFill,
  BsCash,
  BsMenuDown,
  BsJustify,
  BsX,
} from "react-icons/bs";

const links = [
  {
    icon: <BsGrid1X2Fill className="icon" />,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <BsHouseAddFill className="icon" />,
    title: "Houses",
    link: "houses",
  },
  {
    icon: <BsPeopleFill className="icon" />,
    title: "Clients",
    link: "/dashboard/clients",
  },
  {
    icon: <BsBookFill className="icon" />,
    title: "Bookings",
    link: "/dashboard/bookings",
  },
  {
    icon: <BsCash className="icon" />,
    title: "Payments",
    link: "/dashboard/payments",
  },
  {
    icon: <BsMenuButtonWideFill className="icon" />,
    title: "Reviews",
    link: "/dashboard/reviews",
  },
  // {
  //   icon: <BsFillGearFill className="icon" />,
  //   title: "Settings",
  //   link: "/dashboard/settings",
  // },
];

// TODO: Handle close sidebar onClick for small screens
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      id="sidebar"
      className={open ? "sidebar-sm-active" : ""}
      // className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> BOOK & RENT
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        {links.map((item, index) => {
          const { link, icon, title } = item;
          if (index == 3)
            return (
              <>
                <span
                  className="icon close_icon menu-sm"
                  onClick={() => setOpen(!open)}
                  style={{ color: "#fff" }}
                >
                  {open ? (
                    <BsX title="less" />
                  ) : (
                    <BsJustify title="more" className="icon" />
                  )}
                </span>
                <li
                  key={index}
                  className={`sidebar-list-item ${
                    index > 2 && !open ? "sidebar-list-item-hidden" : ""
                  }`}
                  title={title}
                >
                  <NavLink
                    to={link}
                    className={({ isActive }) =>
                      isActive ? "sidebar-list-item-active" : ""
                    }
                    end
                  >
                    <span>{icon} </span>
                    <h4>{title}</h4>
                  </NavLink>
                </li>
              </>
            );
          return (
            <li
              key={index}
              className={`sidebar-list-item ${
                index > 2 && !open ? "sidebar-list-item-hidden" : ""
              }`}
            >
              <NavLink
                to={link}
                className={({ isActive }) =>
                  isActive ? "sidebar-list-item-active" : ""
                }
                end
              >
                <span>{icon} </span>
                <h4>{title}</h4>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
