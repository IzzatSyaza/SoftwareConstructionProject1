import styles from "./addAdmin.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!username){
        errors.username = "School Name is required!";
    }
    
    // user.map(val=>{
    //     if(username === val.username){
    //         errors.username = "The Username Already Exist!";
    //     }
    // })

    if (!password){
        errors.password = "Password is required!";
    }else if(password.length < 4){
        errors.password = "Password must be at least 4 characters!";
    }

    return errors
}

useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/admin/add", {
        username: username,
        password: password,
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // history.push("/ClinicList");

      }).catch(err =>{
          alert(err);
      })
  }
}, [formErrors])


  return (
    <main>
      <div className={styles.title}>
        <h1>ADMIN</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.add}>
          <h2>Add Admin</h2>
          <form className={styles.addAdminForm} onSubmit={handleSubmit}>
            <div className={styles.adminDetail}>
                <label className={styles.adminDetailLabel}>Username</label>
                <input className={styles.adminDetailInput} type="text" placeholder="Izzat Syaza" value={username}
                onChange={(event) =>{
                setUsername(event.target.value);}} />
                <p className={styles.errorText}>{formErrors.username}</p>
            </div>

            <div className={styles.adminDetail}>
                <label className={styles.adminDetailLabel}>Password</label>
                <input className={styles.adminDetailInput} type="password" value={password} placeholder="Password"
                  onChange={(event) =>{
                setPassword(event.target.value); }} />
                <p className={styles.errorText}>{formErrors.password}</p>
            </div>
            <button className={styles.addButton}>Add Admin</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddAdmin;
