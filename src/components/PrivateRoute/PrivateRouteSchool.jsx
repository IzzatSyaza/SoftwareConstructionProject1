import { useState } from "react";
import { Navigate } from "react-router-dom";
import NavContext from "../../Context/NavContext";
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";




const PrivateRouteSchool = ({  children }) => {
    const auth = useAuth();
    const [nav, setNav] = useState(false);
    const value = { nav, setNav };

    return auth ? <NavContext.Provider value={value}>
        <Navbar/>
        <Container stickyNav={<RightNavbar/>} content={children}/>
    </NavContext.Provider> : <Navigate to="/login" />;
  }
 
function useAuth() {
    return true;
  }

  export default PrivateRouteSchool;
