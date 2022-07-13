import React, {useState, useEffect} from "react";
import styles from "./editAssign.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
// import DatePicker from "react-datepicker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";


const EditAssign = () => {
  const {exhibitId, assignId} = useParams();
  const location = useLocation();
  const {exhibit, asg} = location.state;

  const navigate = useNavigate();
  const [jury, setJury] = useState([]);
  const [assign, setAssign] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    // let cuba = JSON.stringify(inputFields)
    Axios.put("http://localhost:3001/jury/assign/edit", {
        assignId: assignId,
        exhibitionId: exhibitId,
        juryId: assign
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(-1);


      }).catch(err =>{
          alert(err);
      })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/getAll",{
      params:{
        exhibitionuuid: exhibitId
      }
    }).then((response) => {
        console.log(response.data);
        setJury(response.data);
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
          <h2>Assign Jury to {asg.user.schools.school_name}</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Edit</h3>
          <div className={styles.activities}>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
              <div className={styles.criteriaDetail} >
                <div className={styles.newCriteria}>
                  <label htmlFor="jurylist" className={styles.criteriaDetailLabel}>Choose Jury</label>
                  {/* <input className={styles.criteriaDetailInput} type="text" name="criteriaName" value={inputFields.criteriaName} placeholder="Criteria Name"
                    onChange={event => handleChange(index, event)}/> */}
                  <select className={styles.criteriaDetailInput} name="juryUuid" id="jurylist"
                   onChange={(event)=>{setAssign(event.target.value);}} >
                    <option>Select Jury</option>
                    {jury.map((jury, index) => {
                      return(
                        <option key={index} value={jury.juries.uuid}>{jury.juries.name}</option>
                      )
                      
                    })}
                  </select>
                    {/* <p >{formErrors.inputFields}</p> */}
                </div>
                
              </div>

            <button className={styles.addButton}>
              <span>Edit Assign</span>
            </button>
          </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditAssign;
