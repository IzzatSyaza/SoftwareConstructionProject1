import styles from "./viewParticipant.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player/lazy'

// import { useAuth } from "../../Context/Auth";

const ViewParticipant = () => {
  const {exhibitId, participantId} = useParams();
  // const auth = useAuth();
  const location = useLocation();
  const {exhibit, participant} = location.state;


  const [criteria, setCriteria] = useState([])
  const [mark, setMark] = useState([])
  // const [participant, setParticipant] = useState([])
  const [videoposter, setVideoposter] = useState([])
  const [material, setMaterial] = useState([])
  var i= 0;

  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLength0, setIsLength0] = useState(false);

//   useEffect(() => {
//     Axios.get("http://localhost:3001/jury/abstract",{
//       params:{
//         participantuuid: participantId,
//       }
//     }).then((response) => {
//         console.log(response.data);
//         setParticipant(response.data);
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// }, []);

// useEffect(() => {
//   Axios.get("http://localhost:3001/jury/poster",{
//     params:{
//       participantuuid: participantId,
//     }
//   }).then((response) => {
//       console.log(response.data);
//       setVideoposter(response.data);
//   })
//   .catch(err =>{
//       console.log(err);
//   })
// }, []);

// useEffect(() => {
//   Axios.get("http://localhost:3001/jury/link",{
//     params:{
//       participantuuid: participantId,
//     }
//   }).then((response) => {
//       console.log(response.data);
//       setMaterial(response.data);
//   })
//   .catch(err =>{
//       console.log(err);
//   })
// }, []);







  return (
    <main>
      <div className={styles.welcome}>
        <h1>
          {exhibit.title}<WiStars />
        </h1>
        <p>{exhibit.description}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>{participant.user.schools.school_name}</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Abstract and Activity Profile</h3>
          <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Abstract</h2>
            <div className={styles.abstractcontent}>
              {participant.abstract}
            </div>
          </div>
          <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Activity Profile</h2>
            <div className={styles.abstractcontent}>
              {participant.activity_profile}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewParticipant;
