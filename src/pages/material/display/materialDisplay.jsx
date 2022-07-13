import React, {useState, useEffect} from "react";
import styles from "./materialDisplay.module.scss";
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



const MaterialDisplay = () => {
  const {participantId} = useParams();
  const location = useLocation();
  // const {exhibit} = location.state;

  const navigate = useNavigate();



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
          <h2>Material</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>SUBMISSION</h3>
          <div className={styles.activities}>
            <Link to={`/exhibition/material/abstract/${participantId}`}>
              <Act 
                icon={<HiOutlineDocumentRemove />}
                content="Abstract and Activity Profile"
              />
            </Link>
            <Link to={`/exhibition/material/poster/${participantId}`}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(232,79,79)"
                content="Poster and Video"
              />
            </Link>
            <Link to={`/exhibition/material/link/${participantId}`}>
              <Act
                icon={<CgArrowsExchangeAlt />}
                icon_background="rgb(42, 170, 85)"
                content="Material"
              />
            </Link>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default MaterialDisplay;
