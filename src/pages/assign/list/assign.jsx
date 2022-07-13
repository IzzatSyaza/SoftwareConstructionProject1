import React, {useState, useEffect} from "react";
import styles from "./assign.module.scss";
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
import { FaUserAlt } from "react-icons/fa";

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



const Assign = () => {
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;

  const navigate = useNavigate();
  const [participant, setParticipant] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3001/exhibition/participant",{
      params:{
        exhibitionuuid: exhibitId
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
          {exhibit.title}
        </h1>
        <p>{exhibit.description}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Activity</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>SUBMISSION</h3>
          <div className={styles.activities}>
            {participant.map((participant, index) =>{
              return(
              <Link className={styles.link} to={`/exhibition/assign/jury/${exhibitId}/${participant.uuid}`}
               state={{exhibit: exhibit, participant: participant}} key={index}>
                <Act 
                  icon={<FaUserAlt />}
                  content={participant.user.schools.school_name}
                />
              </Link>
              )
            })}
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Assign;
