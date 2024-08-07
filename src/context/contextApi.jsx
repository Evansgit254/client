import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

export const AppProvider = createContext(null);

export const ContextApi = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() =>
    localStorage.getItem("user"));
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("token_access")
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("token_refresh")
  );

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/auth/users/me/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setGlobalUser(response.data)
      setIsLoggedIn(true);
    } catch (error) {
      // Handle token refresh if the access token is expired
      if (error.response) {
        if(error.response.status === 403 || error.response.status === 401){
          await refreshAccessToken();
        }
      } else {
        console.error(error);
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/jwt/refresh/",
        {
          refresh: refreshToken,
        }
      );
      setAuthToken(response.data);
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
        credentials
      );
      setAuthToken(response.data);
      await getCurrentUser();
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };
  const setGlobalUser = (user)=>{
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }
  const removeGlobalUser = ()=>{
    setUser(null)
    localStorage.removeItem("user")
  }
  const logout = () => {
    setIsLoggedIn(false);
    removeGlobalUser()
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const setAuthToken = (token) => {
    localStorage.setItem("token_access", token.access);
    localStorage.setItem("token_refresh", token.refresh);
    setAccessToken(token.access);
    setRefreshToken(token.refresh);
  };

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, [accessToken]);

  return (
    <AppProvider.Provider
      value={{
        login,
        logout,
        user,
        isLoggedIn,
        setAuthToken,
        accessToken,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppProvider);
};
