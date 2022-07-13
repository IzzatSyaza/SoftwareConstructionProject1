import React, {useEffect, useState, useContext} from "react";
import styles from "./login.module.scss";
import Axios from "axios";
import {useAuth} from '../../Context/Auth';
import { useNavigate, useLocation, Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import{startlogin, successlogin, failedlogin} from '../../components/Action/Action'





const Login = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path

    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();


    Axios.defaults.withCredentials = true;

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
              accessToken: response.data.accessToken
           });

           if(response.data.user_type === "ADMIN"){
            navigate('/dashboardAdmin', {replace: true});
          }
          else if(response.data.user_type === "JURY"){
            navigate('/dashboardJury', {replace: true});
          }
          else if(response.data.user_type === "SCHOOL"){
            navigate('/dashboardSchool', {replace: true});
          }
          }
      })
      .catch(err =>{
          console.log(err);
      console.log(state)
      })
  },[]);

    const login = (e) => {
        e.preventDefault();
        // console.log(username);
        // console.log(state)

        dispatch(startlogin())
        Axios.post("http://localhost:3001/user/login",{
          username: username,
          password: password,
        }).then((response)=>{
          if(response.data.err){
            alert(response.data.err);
          }
          else{
            // console.log(response.data)
            // const accessToken = response?.data?.accessToken;
            // const user_type = response?.data?.user_type;
            // const uuid = response?.data?.uuid;
            dispatch(successlogin(response.data));

            auth.login({ 
                username: username,
                user_type: response.data.user_type, 
                uuid: response.data.uuid, 
                authen: response.data.auth, 
                accessToken: response.data.accessToken
             });
            //  console.log(state)
             

            // setAuth({
            //   username: response.data.username,
            //   mcms_id: response.data.id,
            //   userType: response.data.userType,
            //   status: true,
            // });
    
            // console.log(response.data.username);
            // console.log(authState);
            if(response.data.user_type === "ADMIN"){
              navigate('/dashboardAdmin', {replace: true});
            }
            else if(response.data.user_type === "JURY"){
              navigate('/dashboardJury', {replace: true});
            }
            else if(response.data.user_type === "SCHOOL"){
              navigate('/dashboardSchool', {replace: true});
            }
            
          }
        }).catch(err =>{
          dispatch(failedlogin(err));
            alert(err);
        })
      }


    return (
        <div className={styles.container}>
            <main>
            <div className={styles.login}>
                <div className={styles.title}><h1>RCE ISKANDAR SYSTEM</h1></div>
                <div>
                    <form className={styles.loginForm} onSubmit={login}>
                        <div className={styles.loginDetail}>
                            <label className={styles.loginLabel}>Username</label>
                            <input className={styles.loginInput} type="text"  value={username} placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>
                        <div className={styles.loginDetail}>
                            <label className={styles.loginLabel}>Password</label>
                            <input className={styles.loginInput} type="password" value={password} placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className={styles.btnLink}>
                          <div className={styles.btn}>
                            <button className={styles.loginButton}>LOGIN</button>
                          </div>
                          <div className={styles.regLink}>
                            <Link className={styles.link} to="/register">School Register</Link>
                          </div>
                        </div>
                        
                    </form>
                    
                </div>
                
            </div></main>
        </div>
    )
}

export default Login;