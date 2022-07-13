import styles from "./materialEdit.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const MaterialEdit = () => {
  const {exhibitId, materialId} = useParams(); 
   const location = useLocation();
   const {exhibit, material} = location.state;

  const [formErrors, setFormErrors] = useState([{}]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLength0, setIsLength0] = useState(false);

  const [title, setTitle] = useState(material.title)
  const [link, setLink] = useState(material.link)


  const navigate = useNavigate();


  // const handleChange = (index, event) => {
  //   const value = [...inputFields];
  //   value[index][event.target.name] = event.target.value;
  //   // console.log(value)
  //   setInputFields(value);
  //   // console.log(exhibitId);
  // }

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



  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = [];
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // 
    
    if(!link){
        errors.link = "Link is required!";
    }
    else if(!link.match(pattern)){
      errors.link = "Not url link"
    }
    if(!title){
      errors.title = "Title is required!";
    }
              
// console.log(errors)
    return errors
}

useEffect(() => {
  // console.log(formErrors.length);
  if(Object.keys(formErrors).length === 0&& isSubmit){
      Axios.put("http://localhost:3001/school/material/edit", {
        title : title,
        link: link,
        materialId: materialId,

      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // navigate(-1);

      }).catch(err =>{
          alert(err);
      })
  }
  // console.log(inputFields)
  // console.log(formErrors)
  // console.log(isLength0)

}, [formErrors])


  return (
    <main>
      <div className={styles.title}>
        <h1>Exhibition</h1>
        <WiStars />
      </div>
      <div >
        <div className={styles.criteria}>
          <h2>Add Material</h2>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
              <div className={styles.criteriaDetail} >
                <div className={styles.descrptionCriteria}>
                  <label htmlFor="title" className={styles.criteriaDetailLabel}>Material Title</label>
                  <input className={styles.criteriaDetailInput} type="text" name="title" id="title" value={title} placeholder="Title"
                    onChange={event => setTitle(event.target.value)}/>
                    <p className={styles.errorText}>{formErrors.title}</p>
                </div>

                <div className={styles.descrptionCriteria}>
                  <label htmlFor="link" className={styles.criteriaDetailLabel}>Link for Material</label>
                  <input className={styles.criteriaDetailInput} type="text" name="link" id="link" value={link} placeholder="Link"
                    onChange={event => setLink(event.target.value)}/>
                    <p className={styles.errorText}>{formErrors.link}</p>
                </div>

                
              </div>

            <button className={styles.addButton}>Edit Material</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MaterialEdit;
