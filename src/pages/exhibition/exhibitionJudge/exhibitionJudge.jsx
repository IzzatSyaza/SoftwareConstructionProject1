import React, {useState, useEffect} from "react";
import styles from "./exhibitionJudge.module.scss";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";



import Axios from "axios";




const Act = ({ icon, icon_background, content }) => {
  return (
    <div className={styles.activity}>
      <div className={styles.icon} style={{ background: `${icon_background}` }}>
        {icon}
      </div>
      <div className={styles.content}>
        <span>{content}</span>
        <div className={styles.view}>
          <span>
            View
            <BsArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

Act.defaultProps = {
  icon: <IoChatboxOutline />,
  icon_background: "rgb(85, 79, 232)",
  content: "Lorem ipsum dolor sit amet consectetur.",
};

const ExhibitionJudge = () => {
  const auth = useAuth();
  const [participant, setParticipant] = useState([]);
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/participant",{
      params:{
        exhibitionuuid: exhibitId,
        useruuid: auth.user.uuid,
      }
    }).then((response) => {
        console.log(response.data);
        setParticipant(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);



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
          <h2>Activity</h2>
        </div>
        {participant && <>
        {participant.map((participant, index) => {
          return(
            <div className={styles.today}>
              {participant.participant ? 
              <h3 className={styles.activity_day}>{participant.participant.user.schools.school_name}</h3>: <></>}
              
              <div className={styles.activities}>
                {/* <Link to={`/exhibition/material/display/${participant.participant.uuid}`}>
                  <Act 
                    icon={<HiOutlineDocumentRemove />}
                    content="School Material"
                  />
                </Link> */}
                {participant.participant ? 
                  <Link className={styles.Link} to={`/exhibition/mark/${exhibitId}/${participant.participant.uuid}`} state={{exhibit: exhibit}}>
                  <Act
                    icon={<HiOutlineDocumentRemove />}
                    icon_background="rgb(232,79,79)"
                    content="Material and Judge"
                  />
                </Link>:
                  <></>}
                {/* <Link className={styles.Link} to={`/exhibition/mark/${exhibitId}/${participant.participant.uuid}`} state={{exhibit: exhibit}}>
                  <Act
                    icon={<HiOutlineDocumentRemove />}
                    icon_background="rgb(232,79,79)"
                    content="Material and Judge"
                  />
                </Link> */}
              </div>
              {/* <button type="button" className={styles.buttonEdit}>jjiji</button> */}
            </div>)
        })}
        </>}
      </div>

      
    </main>
  );
};

export default ExhibitionJudge;
