import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;
export const getClients = () => {
  return fetch(`http://127.0.0.1:8000/api/v1/auth/users/`).then((res) => res.json());
  // return axios.get(`${base_url}/users`)
};
export const addClient = (body) => {
  return fetch(`${base_url}/users_user/`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
export const updateClient = async (id, client) => {
  const response = await fetch(`${base_url}/users_user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  return response.json();
};

export const deleteClient = async (id) => {
  const response = await fetch(`${base_url}/users_user/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
export const getHouses = () => {
  return fetch(`http://localhost:3000/houses`).then((res) => res.json());
};
export const addHouse = (body) => {
  return fetch(`http://localhost:3000/houses`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
export const updateHouse = async (id, data) => {
  const response = await fetch(`http://localhost:3000/houses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const deleteHouse = async (id) => {
  const response = await fetch(`http://localhost:3000/houses/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
export const getReviews = () => {
  return fetch(`http://localhost:3000/reviews`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
};

export const getBookings = () => {
  return fetch().then((res) => res.json());
};
export const getPayments = () => {
  return fetch().then((res) => res.json());
};
