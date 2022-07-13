import styles from "./viewPoster.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player/lazy'


const ViewPoster = ({vp}) => {


  const [videoposter, setVideoposter] = useState([])





  return (
    <main>
        <div className={styles.title}>
          <h2>Poster and Video</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>View</h3>
          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Poster</h2>
              {/* {videoposter.map((val, index)=>(
                <div className={styles.poster}>
                  <img style={{ width: '100%' }} src={`/uploads/${val.poster}`} alt='' />
                </div>
              ))} */}
              <div className={styles.poster}>
                  <img style={{ width: '100%' }} src={`/uploads/${vp.poster}`} alt='Poster Lost' />
                </div>
              {/* {videoposter? 
              <img style={{ width: '100%' }} src={`/uploads/${videoposter.poster}`} alt='' />
              : <h4>Poster Not Found</h4>} */}
          </div>

          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Video</h2>
              {/* {videoposter.map((val, index)=>(
                <div className={styles.video}>
                  <ReactPlayer  width="100%"  url={val.video} config={{ playerVars: { showinfo: 1 } }} controls/>
                </div>
              ))} */}
              <div className={styles.video}>
                  <ReactPlayer  width="100%"  url={vp.video} config={{ playerVars: { showinfo: 1 } }} controls/>
                </div>
          </div>
        </div>
  
    </main>
  );
};

export default ViewPoster;
