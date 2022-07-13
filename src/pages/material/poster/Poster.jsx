import React, {useState, useEffect} from "react";
import styles from "./poster.module.scss";
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
import ReactPlayer from 'react-player/lazy'


const Poster = () => {
  const {participantId} = useParams();
  const location = useLocation();
  // const {exhibit} = location.state;
  const [videoposter, setVideoposter] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/poster",{
      params:{
        participantuuid: participantId,
      }
    }).then((response) => {
        console.log(response.data);
        setVideoposter(response.data);
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
          <h2>Poster and Video</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Material</h3>
          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Poster</h2>
            <div className={styles.poster}>
              {/* {videoposter.poster} */}
              {videoposter? 
              <img style={{ width: '100%' }} src={`/uploads/${videoposter.poster}`} alt='' />
              : <h4>Poster Not Found</h4>}
            </div>
          </div>

          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Video</h2>
            <div className={styles.video}>
              {videoposter? 
              <ReactPlayer  width="100%"  url={videoposter.video} config={{ playerVars: { showinfo: 1 } }} controls/>
              : <h4>Video Not Found</h4>}
              {/* <ReactPlayer  width="100%"  url={videoposter.video} config={{ playerVars: { showinfo: 1 } }} controls/> */}
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default Poster;
