import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../../Context/Auth";
import { useNavigate, useLocation, Navigate } from "react-router-dom";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const  auth  = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        Axios.get("http://localhost:3001/user/auth",).then((response) => {
            if(response.data.err){
            alert(response.data.err);
            }
            else{
            auth.login({ 
                username: response.data.username,
                user_type: response.data.user_type, 
                uuid: response.data.uuid, 
                authen: response.data.auth, 
                accessToken: response.data.accessToken
             });
             setIsLoading(false)
            }
        })
        .catch(err =>{
            console.log(err);
            console.log("err");
            // navigate("/login")
            setIsLoading(false)

        })
        // console.log(auth)
    }, []);

    // useEffect(() => {
    //     // console.log(`isLoading: ${isLoading}`)
    //     // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    //     if(auth.user.authen){
    //         setIsLoading(false)
    //     }
    //     console.log("test")
    //     console.log(auth.user)


    // },)

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : auth.user.authen ?
                    <Outlet />
                    : <Navigate to="/login" replace={true} />
            }
        </>
    )
}

export default PersistLogin