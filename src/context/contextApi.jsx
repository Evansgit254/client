import axios from 'axios'
import React, {useContext,createContext, useState, useEffect} from 'react'

export const AppProvider = createContext(null)

export const ContextApi = ({children})=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [accessToken,setAccessToken] = useState(()=>localStorage.getItem("token_access"))
    const [refreshToken,setRefreshToken] = useState(()=>localStorage.getItem("token_refresh"))

    const getCurrentUser = async()=>{
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/auth/users/me/", {
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        })
        setUser(response.data)
      console.log(response)
      } catch (error) {
        // use refresh token to get new access token
        console.log(error)
      }
    }
    // LOGIN
    const login = ()=>{
        setIsLoggedIn(true)
        setUser(currentUser)
        // save token to localStorage
        getCurrentUser()
        
    }
    // LOGOUT
    const logout  = ()=>{
        setIsLoggedIn(false)
        setUser(null)
        localStorage.removeItem("user")
        // remove token from localStorage
    }

    const setAuthToken = (token)=>{
      localStorage.setItem("token_access",token.access)
      localStorage.setItem("token_refresh",token.refresh)
      setAccessToken(token.access)
      setRefreshToken(token.refresh)
    }
    
    useEffect(()=>{
        getCurrentUser()
    },[])

  return <AppProvider.Provider value={{
    login,
    logout,
    user,
    setAuthToken
  }}>
    {children}
  </AppProvider.Provider>
}
export const useAuth = ()=>{
    return useContext(AppProvider)
}


