import axios from "axios";
export const getClients = async () => {
  try {
    const response = await axios.get(`${base_url}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const addClient = async (body) => {
  try {
    const response = await axios.post(`${base_url}/users_user/`, body);
    return response.data;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const updateClient = async (id, client) => {
  try {
    const response = await axios.put(`${base_url}/users_user/${id}`, client, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/users_user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getHouses = async () => {
  try {
    const response = await axios.get(); // Added base_url to endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const addHouse = async (body) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/v1/properties/create/`, body); // Used base_url
    return response.data;
  } catch (error) {
    console.error("Error adding house:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const updateHouse = async (id, data) => {
  try {
    const response = await axios.put(`${base_url}/houses/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating house:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const deleteHouse = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/houses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting house:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getReviews = async () => {
  try {
    const response = await axios.get(`${base_url}/reviews`); // Used base_url
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getBookings = async () => {
  try {
    const response = await axios.get(`${base_url}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getPayments = async () => {
  try {
    const response = await axios.get(`${base_url}/payments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};
