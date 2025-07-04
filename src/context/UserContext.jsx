// import { set } from "mongoose";
import React,{createContext,useState} from "react";

const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);

    const updateUser = (userData) =>{
        setUser(userData);
    }
    // function to clear user data from local storage (e.g., on logout)

    const clearUser = () =>{
        setUser(null);
        // localStorage.removeItem('token'); // Clear token from local storage
    }

    return (
        <UserContext.Provider value = {{user,updateUser,clearUser}}>{children}</UserContext.Provider>
    )
}


export {UserContext,UserProvider};