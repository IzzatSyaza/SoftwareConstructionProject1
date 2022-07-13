// import React, {useState, useEffect} from "react";
// import styles from "./editJury.module.scss";
// import { Link } from "react-router-dom";
// import { WiStars } from "react-icons/wi";
// import { FaArrowRight } from "react-icons/fa";
// import Axios from "axios";
// import { useNavigate, useParams, useLocation } from "react-router-dom";



// const EditJury = () => {
//   const {juryId} = useParams();
//   const location = useLocation();
//   const {jury} = location.state;

//   const [name, setName] = useState(jury.juries.name);
//   const [contact, setContact] = useState(jury.juries.contact);
//   const [email, setEmail] = useState(jury.juries.email);
//   const [username, setUsername] = useState(jury.username);
//   const [password, setPassword] = useState("");

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
  


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate());
//     setIsSubmit(true);
//   }

//   const validate = () => {
//     const errors = {};
//     // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!name){
//         errors.name = "School Name is required!";
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
//       Axios.put("http://localhost:3001/jury/edit", {
//         name: name,
//         contact: contact,
//         email: email,
//         username: username,
//         password: password,
//         id: juryId
//       }).then((res) => {
//           console.log(res);
//           alert(res.data.message);
//           // history.push("/ClinicList");

//       }).catch(err =>{
//           alert(err);
//       })
//       // console.log(name + contact)
//   }
// }, [formErrors])

//   return (
//     <main>
//       <div className={styles.title}>
//         <h1>Jury</h1>
//       </div>
//       <div >
//         {/* ANALYTICS */}

//         <div className={styles.add}>
//           <h2>Edit Jury</h2>
//           <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Name</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={name} 
//                   placeholder="Izzat Syaza" 
//                   onChange={(event) =>{
//                     setName(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.name}</p>
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
//                   placeholder="izzat@gmail.com" onChange={(event) =>{
//                     setEmail(event.target.value);}} />
//                   <p className={styles.errorText}>{formErrors.email}</p>
//               </div>

//               <div className={styles.exhibitionDetail}>
//                   <label className={styles.exhibitionDetailLabel}>Username</label>
//                   <input className={styles.exhibitionDetailInput} type="text" value={username} 
//                   placeholder="izzat2022" onChange={(event) =>{
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
//               <div >

//               </div>
//               <button className={styles.createButton}>Edit Jury</button>
//             </form>
//         </div>
  
//       </div>
//     </main>
//   );
// };

// export default EditJury;
