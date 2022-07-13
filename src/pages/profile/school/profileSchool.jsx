// import React, {useState, useEffect} from "react";
// import styles from "./SchoolEdit.module.scss";
// import { Link } from "react-router-dom";
// import { WiStars } from "react-icons/wi";
// import { FaArrowRight } from "react-icons/fa";
// import Axios from "axios";
// import InputRadio from "../../../components/Input/Radio/Radio";
// import { useNavigate, useParams, useLocation } from "react-router-dom";


// const SchoolEdit = () => {
//   const {schoolId} = useParams();
//   const location = useLocation();
//   const {school} = location.state;
//   const [schoolName, setSchoolName] = useState(school.schools.school_name);
//   const [address, setAddress] = useState(school.schools.address);
//   const [contact, setContact] = useState(school.schools.contact);
//   const [email, setEmail] = useState(school.schools.email);
//   const [username, setUsername] = useState(school.username);
//   const [password, setPassword] = useState("");
//   const [schoolStatus, setSchoolStatus] = useState(school.status);


//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate());
//     setIsSubmit(true);
//   }

//   const validate = () => {
//     const errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!schoolName){
//         errors.schoolName = "School Name is required!";
//     }

//     if (!address){
//         errors.address = "Address is required!";
//     }

//     if (!contact){
//         errors.contact = "Contact No is required!";
//     }

//     if (!email){
//         errors.email = "Email is required!";
//     }

//     if (!username){
//         errors.username = "Username is required!";
//     }
    
//     // user.map(val=>{
//     //     if(username === val.username){
//     //         errors.username = "The Username Already Exist!";
//     //     }
//     // })

//     if (!password){
//         errors.password = "Password is required!";
//     }else if(password.length < 4){
//         errors.password = "Password must be at least 4 characters!";
//     }

//     return errors
// }


// useEffect(() => {
//   console.log(formErrors);
//   if(Object.keys(formErrors).length === 0 && isSubmit){
//       Axios.put("http://localhost:3001/school/edit", {
//         school_name: schoolName,
//         address: address,
//         contact: contact,
//         email: email,
//         username: username,
//         password: password,
//         status: schoolStatus,
//         id: schoolId,
//       }).then((res) => {
//           console.log(res);
//           alert(res.data.message);
//           // history.push("/ClinicList");

//       }).catch(err =>{
//           alert(err);
//       })
//   }
// }, [formErrors])
  

//   return (
//       <main>
//         <div>
//           <div className={styles.add}>
//             <h2>School Edit</h2>
//             <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>School Name</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={schoolName} 
//                   placeholder="Sekolah Kebangsaan Sungai Isap" 
//                   onChange={(event) =>{
//                     setSchoolName(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.schoolName}</p>
//               </div>
//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>School Address</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={address} 
//                   placeholder="Sekolah Kebangsaan Sungai Isap Kuantan 25150 Pahang"
//                   onChange={(event) =>{
//                     setAddress(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.address}</p>
//               </div>

//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Contact No</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={contact} 
//                   placeholder="01123251" 
//                   onChange={(event) =>{
//                     setContact(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.contact}</p>
//               </div>

//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Email</label>
//                   <input className={styles.exhibitionDetailInput} type="email" value={email} 
//                   placeholder="SKSI@gmail.com" onChange={(event) =>{
//                     setEmail(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.email}</p>
//               </div>

//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Username</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={username} 
//                   placeholder="SKSI2022" onChange={(event) =>{
//                     setUsername(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.username}</p>
//               </div>

//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Password</label>
//                   <input className={styles.exhibitionDetailInput} type="password" value={password} 
//                   placeholder="Password" onChange={(event) =>{
//                     setPassword(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.password}</p>
//               </div>
//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Status</label>
//                   <InputRadio type="radio" checked={schoolStatus === "ACTIVE"} 
//                     id="active" name="status" value="ACTIVE" label="Active"
//                     onChange={(event) =>{
//                       setSchoolStatus(event.target.value);}}/>
//                   <InputRadio type="radio" checked={schoolStatus === "INACTIVE"}
//                     id="inactive" name="status" value="INACTIVE" label="Inactive" 
//                     onChange={(event) =>{
//                       setSchoolStatus(event.target.value);}}/>
//                   {/* <input className={styles.radioInput} type="radio" id="active" name="status" value="ACTIVE"/>
//                   <label for="active">Active</label>
//                   <input className={styles.radioInput} type="radio" id="inactive" name="status" value="INACTIVE"/>
//                   <label for="inactive">Inactive</label> */}
//                   <p className={styles.errorText}>{formErrors.password}</p>
//               </div>
//               <button className={styles.createButton}>Edit School</button>
//             </form>
//           </div>
//         </div>
//       </main>
//   );
// };

// export default SchoolEdit;
