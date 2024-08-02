import React, { useState } from "react";
import {
  BsPeopleFill,
  BsFillBellFill,
  BsHouseAddFill,
  BsBookFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import "./AdminDashboard.css";

function AdminDashboard() {
  const data = [
    { name: "A", Booked: 4000, Rented: 2400 },
    { name: "B", Booked: 3000, Rented: 1398 },
    { name: "C", Booked: 2000, Rented: 9800 },
    { name: "D", Booked: 2780, Rented: 1398 },
    { name: "E", Booked: 1890, Rented: 4800 },
    { name: "F", Booked: 2390, Rented: 3800 },
    { name: "G", Booked: 3490, Rented: 4300 },
  ];

  return (
    <div>
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>HOUSES</h3>
            <BsHouseAddFill className="card_icon" />
          </div>
          <h1>100</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Bookings</h3>
            <BsBookFill className="card_icon" />
          </div>
          <h1>11</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CLIENTS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rented" fill="#8884d8" />
            <Bar dataKey="Booked" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Rented"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Booked" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
