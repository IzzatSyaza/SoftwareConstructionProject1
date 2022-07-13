import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import InputRadio from "../../../components/Input/Radio/Radio";



const SchoolRegister = () => {
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!schoolName){
        errors.schoolName = "School Name is required!";
    }

    if (!address){
        errors.address = "Address is required!";
    }

    if (!contact){
        errors.contact = "Contact No is required!";
    }

    if (!email){
        errors.email = "Email is required!";
    }

    if (!username){
        errors.username = "Username is required!";
    }

    if (!type){
      errors.type = "Schhol Type is required!";
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
      Axios.post("http://localhost:3001/school/register", {
        school_name: schoolName,
        address: address,
        contact: contact,
        email: email,
        username: username,
        password1: password,
        type: type,

      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // history.push("/ClinicList");

      }).catch(err =>{
          alert(err);
      })
  }
  setIsSubmit(false)
}, [formErrors])
  

  return (
    <div className={styles.container}>
      <main>
        <div>
          <div className={styles.add}>
            <div className={styles.title}><h1>REGISTER</h1></div>
            <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>School Name</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={schoolName} 
                  placeholder="Sekolah Kebangsaan Sungai Isap" 
                  onChange={(event) =>{
                    setSchoolName(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.schoolName}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>School Type</label>
                  <InputRadio type="radio" 
                    id="primary" name="type" value="PRIMARY" label="Primary School"
                    onChange={(event) =>{
                      setType(event.target.value);}}/>
                  <InputRadio type="radio" 
                    id="secondary" name="type" value="SECONDARY" label="Secondary School" 
                    onChange={(event) =>{
                      setType(event.target.value);}}/>
                  <p className={styles.errorText}>{formErrors.type}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>School Address</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={address} 
                  placeholder="Sekolah Kebangsaan Sungai Isap Kuantan 25150 Pahang"
                  onChange={(event) =>{
                    setAddress(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.address}</p>
              </div>
              

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Contact No</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={contact} 
                  placeholder="01123251" 
                  onChange={(event) =>{
                    setContact(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.contact}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Email</label>
                  <input className={styles.exhibitionDetailInput} type="email" value={email} 
                  placeholder="SKSI@gmail.com" onChange={(event) =>{
                    setEmail(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.email}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Username</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={username} 
                  placeholder="SKSI2022" onChange={(event) =>{
                    setUsername(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.username}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Password</label>
                  <input className={styles.exhibitionDetailInput} type="password" value={password} 
                  placeholder="Password" onChange={(event) =>{
                    setPassword(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.password}</p>
              </div>
              <div className={styles.btnLink}>
                          <div className={styles.btn}>
                            <button className={styles.createButton}>Register</button>
                          </div>
                          <div className={styles.regLink}>
                            <Link className={styles.link} to="/login">Sign In</Link>
                          </div>
                        </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolRegister;
