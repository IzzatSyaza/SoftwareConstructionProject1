import React, {useState, useEffect} from "react";
import styles from "./assignJury.module.scss";
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


const AssignJury = () => {
  const {exhibitId, participantId} = useParams();
  const location = useLocation();
  const {exhibit, participant} = location.state;

  const navigate = useNavigate();
  const [jury, setJury] = useState([]);
  const [assign, setAssign] = useState([
    {juryUuid: ""},
  ]);

  const handleChange = (index, event) => {
    const value = [...assign];
    value[index][event.target.name] = event.target.value;
    console.log(event.target.value)
    // setJury(jury.filter((val) => {
    //   return val.juries.uuid !== event.target.value
    // }))
    setAssign(value);
    // console.log(exId);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // let cuba = JSON.stringify(inputFields)
    Axios.post("http://localhost:3001/jury/assign", {
        particpantId: participantId,
        exhibitionId: exhibitId,
        juryAry: assign
      }).then((res) => {
          console.log(res);
          if(res.data.error){
            alert(res.data.error);
          }
          else{
            alert(res.data.message);
            navigate(-1);
          }
          


      }).catch(err =>{
          alert(err);
      })
  }

  const handleAddField = (e, index) => {
    e.preventDefault();
    const values = [...assign];
    values.splice(index+1, 0, {juryUuid: ""})
    setAssign(values);
  }

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    const values = [...assign];
    values.splice(index, 1)
    setAssign(values);
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
          <h2>Assign Jury to {participant.user.schools.school_name}</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>SUBMISSION</h3>
          <div className={styles.activities}>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
            { assign.map((inputFields, index) => (
              <div className={styles.criteriaDetail} key={index}>
              <div className={styles.wrapinputbtn}>
                <div className={styles.newCriteria}>
                  <label htmlFor="jurylist" className={styles.criteriaDetailLabel}>Choose Jury</label>
                  {/* <input className={styles.criteriaDetailInput} type="text" name="criteriaName" value={inputFields.criteriaName} placeholder="Criteria Name"
                    onChange={event => handleChange(index, event)}/> */}
                  <select className={styles.criteriaDetailInput} name="juryUuid" id="jurylist"
                  onChange={event => handleChange(index, event)}>
                    <option>Select Jury</option>
                    {jury.map((jury, index) => {
                      return(
                        <option key={index} value={jury.juries.uuid}>{jury.juries.name}</option>
                      )
                      
                    })}
                  </select>
                    {/* <p >{formErrors.inputFields}</p> */}
                </div>
                <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleRemoveField(e, index)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleAddField(e, index)}><FaPlus/></button>
                </div></div>
                
              </div>
            ))}

            <button className={styles.addButton}>
              <span>Assign Jury</span>
            </button>
          </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssignJury;
