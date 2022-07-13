import React, {useState, useEffect} from "react";
import styles from "./editCriteria.module.scss";
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
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";



const EditCriteria = () => {
  const {criteriaId} = useParams();
  const location = useLocation();
  const {exhibit, criteria} = location.state;
  const [criteriaName, setCriteriaName] = useState(criteria.title)
  const [description, setDescription] = useState(criteria.description)
  const [mark, setMark] = useState(criteria.full_mark)


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/criteria/edit", {
        title: criteriaName,
        description: description,
        mark: mark,
        criteriaId: criteriaId,
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(`/dashboardAdmin`);


      }).catch(err =>{
          alert(err);
      })
  }




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
          <h2>Criteria</h2>
        </div>
          <h3 className={styles.activity_day}>Edit</h3>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
              <div className={styles.criteriaDetail}>
                <div className={styles.newCriteria}>
                  <label className={styles.criteriaDetailLabel}>Criteria Name</label>
                  <input className={styles.criteriaDetailInput} type="text" name="criteriaName" value={criteriaName}  placeholder="Criteria Name"
                    onChange={event => setCriteriaName(event.target.value)}/>
                    {/* <p >{formErrors.inputFields}</p> */}
                </div>

                <div className={styles.newCriteria}>
                  <label className={styles.criteriaDetailLabel}>Mark</label>
                  <input className={styles.criteriaDetailInput} type="text" name="mark" value={mark} placeholder="Full Mark"
                    onChange={event => setMark(event.target.value)}/>
                </div>

                <div className={styles.descrptionCriteria}>
                  <label className={styles.criteriaDetailLabel}>Description</label>
                  <textarea className={styles.criteriaDetailInput} type="text" name="description" value={description}  placeholder="Description"
                    onChange={event => setDescription(event.target.value)}/>
                </div>

                
              </div>

            <button className={styles.addButton}>Edit Criteria</button>
          </form>
          </div>
    </main>
  );
};

export default EditCriteria;
