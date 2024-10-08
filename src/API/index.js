import axios from "axios";
export const getClients = async () => {
  try {
    const response = await axios.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const addClient = async (body) => {
  try {
    const response = await axios.post(body);
    return response.data;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const updateClient = async (id, client) => {
  try {
    const response = await axios.put(client, {
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
    const response = await axios.delete();
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
    const response = await axios.post(body); // Used base_url
    return response.data;
  } catch (error) {
    console.error("Error adding house:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const updateHouse = async (id, data) => {
  try {
    const response = await axios.put(data, {
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
    const response = await axios.delete();
    return response.data;
  } catch (error) {
    console.error("Error deleting house:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getReviews = async () => {
  try {
    const response = await axios.get(); // Used base_url
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getBookings = async () => {
  try {
    const response = await axios.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const getPayments = async () => {
  try {
    const response = await axios.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};
