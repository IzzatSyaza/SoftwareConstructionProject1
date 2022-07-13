import React, {useState, useEffect} from "react";
import styles from "./exhibitionView.module.scss";
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
import { useAuth } from "../../../Context/Auth";


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



const ExhibitionView = () => {
  const auth = useAuth();
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [participant, setParticipant] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/school/participate",{
      params:{
        useruuid: auth.user.uuid,
        exhibituuid: exhibitId
      }
    }).then((response) => {
      if(!response.data.register) {
        alert(response.data.mes)
        navigate('/dashboardSchool');
      }
      // console.log(response.data.participant.uuid)
      setParticipant(response.data.participant)
        // console.log("response.data");
        // console.log(response.data);
        // setParticipate(response.data);
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
            <Link className={styles.link} to={`/fileUpload/${exhibit.uuid}/${participant.uuid}` } state={{exhibit: exhibit}}>
              <Act 
                icon={<CgArrowsExchangeAlt />}
                content="Poster and Video Link Submission"
              />
            </Link>
            <Link className={styles.link} to={`/material/add/${exhibit.uuid}/${participant.uuid}` } state={{exhibit: exhibit}}>
              <Act
                icon={<CgArrowsExchangeAlt />}
                content="Material Submission"
              />
            </Link>
            <Link className={styles.link} to={`/material/evalaute/${exhibit.uuid}/${participant.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<CgArrowsExchangeAlt />}
                content="Self-Evaluation"
              />
            </Link>
            <h3 className={styles.activity_day}>VIEW</h3>
            <Link className={styles.link} to={`/material/list/${exhibit.uuid}/${participant.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Material"
              />
            </Link>
            <Link className={styles.link} to={`/poster/list/${exhibit.uuid}/${participant.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Poster Video"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExhibitionView;
