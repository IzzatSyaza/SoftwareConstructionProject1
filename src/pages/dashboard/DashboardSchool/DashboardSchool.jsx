import styles from "./DashboardSchool.module.scss";
import React, {useState, useEffect} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineWavingHand } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useAuth } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Card } from "../../../components/Cards/Card";


const DashboardSchool = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [exhibition, setExhibition] = useState([]);
  const [participate, setParticipate] = useState([]);



  useEffect(() => {
    Axios.get("http://localhost:3001/exhibition/open",).then((response) => {
        setExhibition(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

  const handleLogout =() => {
    auth.logout();
    navigate('/login');
  }

//   useEffect(() => {
//     Axios.get("http://localhost:3001/school/participate",{
//       params:{
//         useruuid: auth.user.uuid
//       }
//     }).then((response) => {
//         console.log("response.data");
//         console.log(response.data);
//         setParticipate(response.data);
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// }, []);


  return (
    <main className={styles.container}>
      <div className={styles.welcome}>
        <h1>
          Welcome to RCE ISKANDAR , {auth.user.username}.
          <MdOutlineWavingHand />
        </h1>
        <p>Here is list of open exhibition</p>
      </div>

      <div className={styles.cards_container}>
        {exhibition.map((exhibit, index) => {return(
          <Card exhibit={exhibit} key={index} role={auth.user.user_type} uuid={auth.user.uuid}/>
          
        )})}
      </div>
      {/* <button className={styles.buttonEdit} onClick={handleLogout} disabled>Logout</button> */}
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
};

export default DashboardSchool;
