import { useContext, createContext, useState } from "react";
import Axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";


const AuthContext = createContext(null)


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        Axios.get("http://localhost:3001/user/logout",)
        .then((response) => {
            console.log(response)
            // navigate('/login');
        })
        .catch(err =>{
            console.log(err);
            // navigate("/login")

        })
    }

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}
