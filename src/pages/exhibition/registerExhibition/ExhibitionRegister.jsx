import React, {useState, useEffect} from "react";
import styles from "./ExhibitionRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";



const ExhibitionRegister = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const {exhibitId} = useParams()
  const [abstract, setAbstract] = useState("");
  const [activity, setActivity] = useState("");
  

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
    console.log(exhibitId)
  }

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!abstract){
        errors.abstract = "Abstract is required!";
    }

    if (!activity){
        errors.activity = "Activity profile is required!";
    }
    
    return errors
}

  useEffect(() => {
    Axios.get("http://localhost:3001/school/participate",{
      params:{
        useruuid: auth.user.uuid,
        exhibituuid: exhibitId
      }
    }).then((response) => {
      if(response.data.register) {
        alert(response.data.mes)
        navigate('/dashboardSchool');
      }
        // console.log("response.data");
        // console.log(response.data);
        // setParticipate(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/exhibition/register", {
        abstract: abstract,
        activity_profile: activity,
        uuid: auth.user.uuid,
        exhibitId: exhibitId,

      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(-1)

      }).catch(err =>{
          alert(err);
      })
  }
  setIsSubmit(false);
}, [formErrors])
  

  return (
      <main>
        <div>
          <div className={styles.add}>
            <h2>EXHIBITION REGISTRATION</h2>
            <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Abstract</label>
                  <textarea className={styles.exhibitionDetailInput} type="text" value={abstract} 
                  placeholder="Abstract from the school" 
                  onChange={(event) =>{
                    setAbstract(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.abstract}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Activities Profile</label>
                  <textarea className={styles.exhibitionDetailInput} type="text" value={activity} 
                  placeholder="1. Recycle Trash
2. Reuse Paper"
                  onChange={(event) =>{
                    setActivity(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.activity}</p>
              </div>


              <button className={styles.createButton}>Register For Exhibtion</button>
            </form>
          </div>
        </div>
      </main>
  );
};

export default ExhibitionRegister;
