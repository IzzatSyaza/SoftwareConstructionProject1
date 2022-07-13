import { useState, useEffect } from "react";
import { useAuth } from "../../Context/Auth";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import NavContext from "../../Context/NavContext";
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";
import { useSelector } from 'react-redux'
import Axios from "axios";


export const RequireAuth = ({allowUser, children}) => {

     const state=useSelector(state => state.UserReducer)
    const navigate=useNavigate()
    const location = useLocation()
    const auth =useAuth()
    const [nav, setNav] = useState(false);
    const value = { nav, setNav };


    useEffect(() => {
        // Axios.get("http://localhost:3001/user/auth",).then((response) => {
        //     if(response.data.err){
        //     alert(response.data.err);
        //     }
        //     else{
        //     auth.login({ 
        //         username: response.data.username,
        //         user_type: response.data.user_type, 
        //         uuid: response.data.uuid, 
        //         accessToken: response.data.accessToken
        //      });
        //      console.log("bich")
        //     }
        // })
        // .catch(err =>{
        //     console.log(err);
        // })
        // console.log(auth)
    });

   

    if(auth.user.username && allowUser.includes(auth.user.user_type) ){
        return (
        <NavContext.Provider value={value}>
            <Navbar type={auth.user.user_type}/>
            <Container stickyNav={<RightNavbar/>} content={children}/>
        </NavContext.Provider>)
    }
    if(!auth.user){
        return <Navigate to ='/login' state={{path: location.pathname}} />
    }
    if(!allowUser.includes(auth.user.user_type)){
        // alert(allowUser)
        return <Navigate to ='/login' state={{path: location.pathname}} />
    }

    // return (
    //     <NavContext.Provider value={value}>
    //         <Navbar type={auth.user.user_type}/>
    //         <Container stickyNav={<RightNavbar/>} content={children}/>
    //     </NavContext.Provider>
    // )
}
