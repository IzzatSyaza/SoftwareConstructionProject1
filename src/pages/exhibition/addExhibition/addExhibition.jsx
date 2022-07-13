import React, {useState, useEffect} from "react";
import styles from "./addExhibition.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
// import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import InputRadio from "../../../components/Input/Radio/Radio";






const AddExhibition = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!title){
        errors.title = "Exhibition Title is required!";
    }

    if (!description){
        errors.description = "Description is required!";
    }

    if (!startDate){
        errors.startDate = "Start date No is required!";
    }

    if (!endDate){
        errors.endDate = "End date is required!";
    }

    if (!status){
        errors.status = "Status is required!";
    }
    
    // user.map(val=>{
    //     if(username === val.username){
    //         errors.username = "The Username Already Exist!";
    //     }
    // })


    return errors
}


useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/exhibition/create", {
        title: title,
        description: description,
        start_date: startDate,
        end_date: endDate,
        status: status,
      }).then((res) => {
          console.log(res.data.exhibit.uuid);
          alert(res.data.message);
          navigate(`/exhibition/criteria/rubric/${res.data.exhibit.uuid}`);

      }).catch(err =>{
          alert(err);
      })
  }
}, [formErrors])


  return (
    <main>
      <div className={styles.title}>
        <h1>Exhibition</h1>
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.add}>
          <h2>Add Exhibition</h2>
          <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
          <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Exhibition Title</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={title} 
                  placeholder="RCE ISkandar Exhibition 2022" 
                  onChange={(event) =>{
                    setTitle(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.title}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Description</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={description} 
                  placeholder="Description of Exhibition"
                  onChange={(event) =>{
                    setDescription(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.description}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Start Date</label>
                  {/* <DatePicker className={styles.exhibitionDetailInput} dateFormat="yyyy-MM-dd" value={startDate} selected={startDate} 
                  onChange={startDate => setStartDate(startDate)} /> */}

                  <input className={styles.exhibitionDetailInput} type="date" value={startDate} 
                  placeholder="" 
                  onChange={(event) =>{
                    setStartDate(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.startDate}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>End Date</label>
                  <input className={styles.exhibitionDetailInput} type="date" value={endDate} 
                  placeholder="" onChange={(event) =>{
                    setEndDate(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.endDate}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Status</label>
                  <InputRadio type="radio"
                  id="open" name="status" value="OPEN" label="Open"
                  onChange={(event) =>{
                      setStatus(event.target.value);}}/>
                  <InputRadio type="radio"
                  id="close" name="status" value="CLOSE" label="Close"
                  onChange={(event) =>{
                      setStatus(event.target.value);}}/>
                  <p className={styles.errorText}>{formErrors.status}</p>
              </div>


            <button className={styles.createButton}>Create Exhibition</button>
          </form>
        </div>

      </div>
    </main>
  );
};

export default AddExhibition;
