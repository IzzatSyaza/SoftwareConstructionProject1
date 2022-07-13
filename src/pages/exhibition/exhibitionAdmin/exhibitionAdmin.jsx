import React, {useState, useEffect} from "react";
import styles from "./exhibitionAdmin.module.scss";
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



const ExhibitionAdmin = () => {
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;

  const navigate = useNavigate();



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
          <h3 className={styles.activity_day}>Assign</h3>
          <div className={styles.activities}>
            <Link className={styles.link} to={`/exhibition/assign/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act 
                icon={<HiOutlineDocumentRemove />}
                content="Assign Juries to Participant"
              />
            </Link>
            <h3 className={styles.activity_day}>Add</h3>
            <Link className={styles.link} to={`/exhibition/criteria/rubric/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(232,79,79)"
                content="Add Critreia"
              />
            </Link>
            <h3 className={styles.activity_day}>View</h3>
            <Link className={styles.link} to={`/exhibition/assign/list/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Assign Juries"
              />
            </Link>
            <Link className={styles.link} to={`/exhibition/criteria/list/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Criteria"
              />
            </Link>
            <Link className={styles.link} to={`/exhibition/report/mark/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Mark"
              />
            </Link>
            <Link className={styles.link} to={`/exhibition/participant/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="Participant"
              />
            </Link>
            <Link className={styles.link} to={`/exhibition/report/evaluation/${exhibit.uuid}`} state={{exhibit: exhibit}}>
              <Act
                icon={<HiOutlineDocumentRemove />}
                icon_background="rgb(42, 170, 85)"
                content="School Self-Evaluation"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExhibitionAdmin;
