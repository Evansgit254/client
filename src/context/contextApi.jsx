import React, {useContext,createContext, useState, useEffect} from 'react'

export const AppProvider = createContext(null)

export const ContextApi = ({children})=>{
  const getCurrentUser = ()=>{
    const currentUser = localStorage.getItem("user")
    if(currentUser) return JSON.parse(currentUser)
    return null
  }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(()=>getCurrentUser());
    const currentUser = {name:"Francis",id:7}

    const login = ()=>{
        setIsLoggedIn(true)
        setUser(currentUser)
        // save token to localStorage
        localStorage.setItem("user",JSON.stringify(currentUser))
    }
    const logout  = ()=>{
        setIsLoggedIn(false)
        setUser(null)
        localStorage.removeItem("user")
        // remove token from localStorage
    }
    
    useEffect(()=>{
        const currentUser = getCurrentUser()
        return ()=>setUser(currentUser)
    },[isLoggedIn])
  return <AppProvider.Provider value={{
    login,
    logout,
    user
  }}>
    {children}
  </AppProvider.Provider>
}
export const useAuth = ()=>{
    return useContext(AppProvider)
}


