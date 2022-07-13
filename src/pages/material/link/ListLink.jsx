import React, {useState, useEffect} from "react";
import styles from "./link.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
// import DatePicker from "react-datepicker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";


const ListLink = () => {
  const {participantId} = useParams();
  const location = useLocation();
  // const {exhibit} = location.state;
  const [material, setMaterial] = useState([])
  var i= 0;

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/link",{
      params:{
        participantuuid: participantId,
      }
    }).then((response) => {
        console.log(response.data);
        setMaterial(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

  return (
    <main>
      <div className={styles.welcome}>
        <h1>
          {/* {exhibit.title} */}
        </h1>
        {/* <p>{exhibit.description}</p> */}
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Abstract and Activity Profile</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Material</h3>

          {/* <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Abstract</h2>
            <div className={styles.abstractcontent}>
            </div>
          </div>
          <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Activity Profile</h2>c
            <div className={styles.abstractcontent}>
            </div>
          </div> */}
          {material.map((val, index) => {
            return(
              <div className={styles.material}>
                <h2 className={styles.mtitle}>Material {++i}: </h2>
                <p className={styles.link}><a href={val.link}>{val.title}</a> </p>
                
              </div>
            )
          })}

        </div>
        
      </div>
    </main>
  );
};

export default ListLink;
