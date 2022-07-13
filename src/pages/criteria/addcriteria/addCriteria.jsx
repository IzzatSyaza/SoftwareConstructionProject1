import styles from "./addCriteria.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const AddCriteria = () => {

  const [inputFields, setInputFields] = useState([
    {criteriaName: "", description: "", mark: ""},
  ]);
  const {exId} = useParams();


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();


  const handleChange = (index, event) => {
    const value = [...inputFields];
    value[index][event.target.name] = event.target.value;
    console.log(value)
    setInputFields(value);
    // console.log(exId);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // let cuba = JSON.stringify(inputFields)
    Axios.post("http://localhost:3001/criteria/add", {
        apa: inputFields,
        exhibitionId: exId
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(`/dashboardAdmin`);


      }).catch(err =>{
          alert(err);
      })
  }

  const handleAddField = (e, index) => {
    e.preventDefault();
    const values = [...inputFields];
    values.splice(index+1, 0, {criteriaName: "", description: "", mark: ""})
    setInputFields(values);
  }

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1)
    setInputFields(values);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // }

//   const validate = () => {
//     const errors = {};
//     const values = [...inputFields];
//     // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    
//     values.map(val=>{
//         if(!val.criteriaName){
//             errors.username = "Criteria Name is required!";
//         }
//     })


//     return errors
// }

// useEffect(() => {
//   console.log(formErrors);
//   if(Object.keys(formErrors).length === 0 && isSubmit){
//       Axios.post("http://localhost:3001/admin/add", {
//         username: username,
//         password: password,
//       }).then((res) => {
//           console.log(res);
//           alert(res.data.message);
//           // history.push("/ClinicList");

//       }).catch(err =>{
//           alert(err);
//       })
//   }
// }, [formErrors])


  return (
    <main>
      <div className={styles.title}>
        <h1>Exhibition</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.criteria}>
          <h2>Add Criteria</h2>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
            {inputFields.length === 0 && <>
              <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleRemoveField(e, 0)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleAddField(e, 0)}><FaPlus/></button>
                </div>
            </>}
            { inputFields.map((inputFields, index) => (
              <div className={styles.criteriaDetail} key={index}>
                <div className={styles.newCriteria}>
                  <label className={styles.criteriaDetailLabel}>Criteria Name</label>
                  <input className={styles.criteriaDetailInput} type="text" name="criteriaName" value={inputFields.criteriaName} placeholder="Criteria Name"
                    onChange={event => handleChange(index, event)}/>
                    {/* <p >{formErrors.inputFields}</p> */}
                </div>

                <div className={styles.newCriteria}>
                  <label className={styles.criteriaDetailLabel}>Mark</label>
                  <input className={styles.criteriaDetailInput} type="number" name="mark" value={inputFields.mark} placeholder="Full Mark"
                    onChange={event => handleChange(index, event)}/>
                </div>

                <div className={styles.descrptionCriteria}>
                  <label className={styles.criteriaDetailLabel}>Description</label>
                  <textarea className={styles.criteriaDetailInput} type="text" name="description" value={inputFields.description} placeholder="Description"
                    onChange={event => handleChange(index, event)}/>
                </div>
                <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleRemoveField(e, index)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleAddField(e, index)}><FaPlus/></button>
                </div>
                
              </div>
            ))}

            <button className={styles.addButton}>Add Criteria</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCriteria;
