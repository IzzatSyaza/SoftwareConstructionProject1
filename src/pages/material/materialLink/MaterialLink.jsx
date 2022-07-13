import styles from "./materialLink.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const MaterialLink = () => {
  const {exhibitId, participantId} = useParams();
  const [inputFields, setInputFields] = useState([
    {link: "", title:""},
  ]);
  const [formErrors, setFormErrors] = useState([{}]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLength0, setIsLength0] = useState(false);
  

  const navigate = useNavigate();


  const handleChange = (index, event) => {
    const value = [...inputFields];
    value[index][event.target.name] = event.target.value;
    console.log(value)
    setInputFields(value);
    // console.log(exhibitId);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // let cuba = JSON.stringify(inputFields)
  //   Axios.post("http://localhost:3001/school/material", {
  //       apa: inputFields,
  //       exhibitionId: exhibitId
  //     }).then((res) => {
  //         console.log(res);
  //         alert(res.data.message);
  //         navigate(-1);


  //     }).catch(err =>{
  //         alert(err);
  //     })
  // }

  const handleAddField = (e, index) => {
    e.preventDefault();
    const values = [...inputFields];
    const value = [...formErrors];

    values.splice(index+1, 0, {link: "", title:""})
    value.splice(index+1, 0, {link: "", title:""})

    setInputFields(values);
    setFormErrors(value);
    setIsLength0(false)

  }

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1)
    setInputFields(values);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = [];
    const values = [...inputFields];
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // 
    
    values.forEach((val, index)=>{
        errors.push({link: "", title: ""})
        if(!val.link){
            errors[index].link = "Link is required!";
            if(!val.title){
                errors[index].title = "Title is required!";
            }
        }
        else if(!val.link.match(pattern)){
          errors[index].link = "Not url link";
          if(!val.title){
            errors[index].title = "Title is required!";
          }
        }
        else{
          if(!val.title){
            errors[index].title = "Title is required!";
          }
          else{
            errors[index] = {}
          }
          
        }      
    })
    setIsLength0(
    errors.every((val, index)=>{
      if(Object.keys(val).length === 0){
         return true
      }
      else return false
  }))

// console.log(errors)
    return errors
}

useEffect(() => {
  // console.log(formErrors.length);
  if(isLength0 && isSubmit){
      Axios.post("http://localhost:3001/school/material", {
        material : inputFields,
        exhibitionId: exhibitId,
        participantId: participantId,

      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // navigate(-1);

      }).catch(err =>{
          alert(err);
      })
  }
  console.log(inputFields)
  console.log(formErrors)
  // console.log(isLength0)
  setIsSubmit(false);


}, [formErrors])


  return (
    <main>
      <div className={styles.title}>
        <h1>Exhibition</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.criteria}>
          <h2>Add Material</h2>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
            {inputFields.length === 0 && <>
              <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleRemoveField(e, 0)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleAddField(e, 0)}><FaPlus/></button>
                </div>
            </>}
            { inputFields.map((inputFields, index) => (
              <div className={styles.criteriaDetail} key={index}>
                <div className={styles.descrptionCriteria}>
                  <label htmlFor="title" className={styles.criteriaDetailLabel}>Material Title</label>
                  <input className={styles.criteriaDetailInput} type="text" name="title" id="title" value={inputFields.title} placeholder="Title"
                    onChange={event => handleChange(index, event)}/>
                    {formErrors[index].title && <p className={styles.errorText}>{formErrors[index].title}</p>}
                </div>

                <div className={styles.descrptionCriteria}>
                  <label htmlFor="link" className={styles.criteriaDetailLabel}>Link for Material</label>
                  <input className={styles.criteriaDetailInput} type="text" name="link" id="link" value={inputFields.link} placeholder="Link"
                    onChange={event => handleChange(index, event)}/>
                    {formErrors[index].link && <p className={styles.errorText}>{formErrors[index].link}</p>}
                </div>
                <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleRemoveField(e, index)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(e) => handleAddField(e, index)}><FaPlus/></button>
                </div>
                
              </div>
            ))}

            <button className={styles.addButton}>Add Material</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MaterialLink;
