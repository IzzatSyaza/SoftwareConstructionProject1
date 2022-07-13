import styles from "./addCR.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Modal } from "../../../components/Modal/Modal";
import Rubric from "../../../components/Rubric/Rubric";


const AddCR = () => {
  const {exhibitId} = useParams();
  // const location = useLocation();
  // const {exhibit, criteria} = location.state;
  const [inputFields, setInputFields] = useState([
    {
      criteriaName: "", mark: "", 
      rubric:[{
        title: "",
         score:[{
          desc:"", highest: "", lowest: ""}]
        },]
      },
  ]);

  // const {exId} = useParams();


  const [formErrors, setFormErrors] = useState([
    {
      criteriaName: "", mark: "", 
      rubric:[{
        title: "",
         score:[{
          desc:"", highest: "", lowest: ""}]
        },]
      },
  ]);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [sendError, setSendError] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState([])
  const [popup, setPopup] = useState(false)
  const [editIndex, setEditIndex] = useState("")
  const [editRubricIndex, setEditRubricIndex] = useState("")
  const [noErrors, setNoErrors] = useState(false)
  const [number, setNo] = useState({no: 10});


  

  const handleChange = (index, event) => {
    const value = [...inputFields];
    value[index][event.target.name] = event.target.value;
    console.log(value)
    setInputFields(value);
    // console.log(exId);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // let cuba = JSON.stringify(inputFields)
  //   // Axios.post("http://localhost:3001/criteria/add", {
  //   //     apa: inputFields,
  //   //     exhibitionId: exId
  //   //   }).then((res) => {
  //   //       console.log(res);
  //   //       alert(res.data.message);
  //   //       navigate(`/dashboardAdmin`);


  //   //   }).catch(err =>{
  //   //       alert(err);
  //   //   })
  // }

  const handleAddField = (e, index) => {
    e.preventDefault();
    const errors = [...formErrors];
    const values = [...inputFields];
    values.splice(index+1, 0, {
      criteriaName: "", mark: "", 
      rubric:[{
        title: "",
         score:[{
          desc:"", highest: "", lowest: ""}]
        }]
      })
    errors.splice(index+1, 0, {
      criteriaName: "", mark: "", 
      rubric:[{
        title: "",
         score:[{
          desc:"", highest: "", lowest: ""}]
        }]
      })
    setInputFields(values);
    setFormErrors(errors);
  }

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    const errors = [...formErrors];
    const values = [...inputFields];
    values.splice(index, 1)
    errors.splice(index, 1)

    setInputFields(values);
    setFormErrors(errors);
  }

  const removeRubric = (e, index, rub_i) => {
    e.preventDefault();
    const values = [...inputFields];
    const errors = [...formErrors];
    values[index].rubric.splice(rub_i, 1)
    errors[index].rubric.splice(rub_i, 1)

    setInputFields(values);
    setFormErrors(errors);
  }

  const addRubric = (e, index, rub_i) => {
    e.preventDefault();
    const values = [...inputFields];
    const errors = [...formErrors];

    values[index].rubric.splice(rub_i+1, 0, {
      title: "",
       score:[{
        desc:"", highest: "", lowest: ""}]
      })
    errors[index].rubric.splice(rub_i+1, 0, {
      title: "",
       score:[{
        desc:"", highest: "", lowest: ""}]
      })
    setInputFields(values);
    setFormErrors(errors);
  }

  const removeScore = (e, index, rub_ind,  score_ind) => {
    e.preventDefault();
    const values = [...inputFields];
    const errors = [...formErrors];

    values[index].rubric[rub_ind].score.splice(score_ind, 1)
    errors[index].rubric[rub_ind].score.splice(score_ind, 1)

    setInputFields(values);
    setFormErrors(errors);
  }

  const addScore = (e, index, rub_ind,  score_ind) => {
    e.preventDefault();
    const values = [...inputFields];
    const errors = [...formErrors];
    values[index].rubric[rub_ind].score.splice(score_ind+1, 0, {
        desc:"", highest: "", lowest: ""
      })

    errors[index].rubric[rub_ind].score.splice(score_ind+1, 0, {
      desc:"", highest: "", lowest: ""
    })
    // console.log(index)
    setInputFields(values);
    setFormErrors(errors);
  }

  const rubricChange = (event, index, rub_ind) => {
    const value = [...inputFields];
    value[index].rubric[rub_ind][event.target.name] = event.target.value;
    console.log(value)
    setInputFields(value);
  }

  const scoreChange = (event, index, rub_ind,  score_ind) => {
    const value = [...inputFields];
    value[index].rubric[rub_ind].score[score_ind][event.target.name] = event.target.value;
    console.log(value)
    setInputFields(value);
  }

  const handlePopup = (event, rubric, index, rub_ind) => {
    setEditIndex(index)
    setEditRubricIndex(rub_ind)
    // const value = [...inputFields];
    // value[index].rubric[rub_ind].score[score_ind][event.target.name] = event.target.value;
    setRecordForEdit(rubric)
    // console.log(rubric)
    setPopup(true);
    // setInputFields(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = [...formErrors];
    const values = [...inputFields];
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    // for(let i=0; i<values.length; i++){

    // }
    values.forEach((val, index)=>{
        if(!val.criteriaName){
            errors[index].criteriaName = "Criteria is required!";
        }
        else if(val.criteriaName){
          errors[index].criteriaName = "";
        }
        if(!val.mark){
          errors[index].mark = "Full Mark is required!";
        }
        else if(val.mark){
          errors[index].mark = "";
        }
        val.rubric.forEach((rubric, bil)=> {
          if(!rubric.title){
            errors[index].rubric[bil].title = "Rubric is required!";
          }
          else if(rubric.title){
            errors[index].rubric[bil].title = "";
          }
          rubric.score.forEach((score, no)=> {
            if(!score.desc){
              errors[index].rubric[bil].score[no].desc = "Rubric Description is required!";
            }
            else if(score.desc){
              errors[index].rubric[bil].score[no].desc = "";
            }
            if(!score.highest){
              errors[index].rubric[bil].score[no].highest = "Highest Mark in the range is required!";
            }
            else if(Number(score.highest)< Number(score.lowest)){
              errors[index].rubric[bil].score[no].highest = "Highest mark need to be the same or higher than lower";
            }
            else if(score.highest){
              errors[index].rubric[bil].score[no].highest = "";
            }
            
            if(!score.lowest){
              errors[index].rubric[bil].score[no].lowest = "Lowest Mark in the range is required!";
            }
            else if(Number(score.lowest) > Number(score.highest)){
              errors[index].rubric[bil].score[no].lowest = "Lowest mark need to be the same or lower than highest";
              // alert("Lowest mark need to be the same or lower than highest")
            }
            else if(score.lowest){
              errors[index].rubric[bil].score[no].lowest = "";
            }

          })
        })

        
      
        
      
    })
    // console.log(errors)
  //   errors.forEach((val)=>{
  //     if(val.criteriaName === "" && val.mark ==="")
  //     {
  //       val.rubric.forEach((rubric) =>{
  //         if(rubric.title === ""){
  //           rubric.score.forEach((score) =>{
  //             if(score.desc === "" && score.lowest === "" && score.highest === ""){
  //               setNoErrors(true)
  //             }
  //             else setNoErrors(false)
  //           })
  //         }
  //         else setNoErrors(false)
  //       })
  //     }
  //     else setNoErrors(false)
  // })
        // console.log(
        //   errors.every((val)=>{
        //     if(val.criteriaName === "" && val.mark ==="")
        //     {
        //       val.rubric.every((rubric) =>{
        //         if(rubric.title === ""){
        //           rubric.score.every((score) =>{
        //             if(score.desc === "" && score.lowest === "" && score.highest === ""){
        //               return true;
        //             }
        //             else return false;
        //           })
        //         }
        //         else return false;
        //       })
        //     }
        //     else return false;
        // })
        // )
        loop1:
        for(let i=0; i<errors.length; i++){
          if(errors[i].criteriaName === "" && errors[i].mark ===""){
            for(let bil=0; bil<errors[i].rubric.length; bil++){
              if(errors[i].rubric[bil].title === "" ){
                for(let no=0; no<errors[i].rubric[bil].score.length; no++){
                  if(errors[i].rubric[bil].score[no].desc === "" && errors[i].rubric[bil].score[no].lowest === "" && errors[i].rubric[bil].score[no].highest === "" ){
                    setNoErrors(true)
                  }else {setNoErrors(false)
                     break loop1}
                } 
              }else {setNoErrors(false)
                break loop1}
            }
          }else {setNoErrors(false)
            break }
        }
    return errors
}

useEffect(() => {
  // console.log(formErrors);
  // console.log("masuk");

  if(noErrors && isSubmit){
      Axios.post("http://localhost:3001/criteria/rubric", {
        criteria: inputFields,
        exhibitionUUID: exhibitId,
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // history.push("/ClinicList");

      }).catch(err =>{
          alert(err);
      })
  }
  console.log(JSON.stringify(inputFields))
  // console.log(noErrors)
  setIsSubmit(false)
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
          <h2>Add Criteria</h2>
          <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
            {inputFields.length === 0 && <>
              <div className={styles.listItemAction}>
                  <button className={styles.btnCriteria} onClick={(e) => handleRemoveField(e, -1)}><FaMinus/></button>
                  <button className={styles.btnCriteria} onClick={(e) => handleAddField(e, -1)}><FaPlus/></button>
                </div>
            </>}
            { inputFields.map((val, index) => (
              <div className={styles.criteriaDetail} key={index}>
              <div className={styles.wrapInput}>
                <div className={styles.wrapCriteriaMarkBtn}>
                  <div className={styles.wrapMarkCriteria}>            
                    <div className={styles.newCriteria}>
                      <label className={styles.criteriaDetailLabel}>Criteria</label>
                      <input className={styles.criteriaDetailInput} type="text" name="criteriaName" value={val.criteriaName} placeholder="Criteria Name"
                        onChange={event => handleChange(index, event)}/>
                        <p className={styles.errorText}>{formErrors[index].criteriaName}</p>
                    </div>
                      <div className={styles.fullMark}>
                        <label className={styles.criteriaDetailLabel}>Mark</label>
                        <input className={styles.criteriaDetailInput} type="number" name="mark" value={val.mark} placeholder="50" min="0"
                        onChange={event => handleChange(index, event, )}/>
                        <p className={styles.errorText}>{formErrors[index].mark}</p>
                      </div>
                  </div>
                  <div className={styles.listItemAction}>
                    <button className={styles.btnCriteria} onClick={(e) => handleRemoveField(e, index)}><FaMinus/>Criteria</button>
                    <button className={styles.btnCriteria} onClick={(e) => handleAddField(e, index)}><FaPlus/>Criteria</button>
                  </div>
                  {val.rubric.length === 0 &&
                  <div className={styles.listItemAction}>
                    <button className={styles.btnRubtic} onClick={(e) => removeRubric(e, index, -1)}><FaMinus/></button>
                    <button className={styles.btnRubtic} onClick={(e) => addRubric(e, index, -1)}><FaPlus/></button>
                  </div>}
                  
                  
                  
                </div>
                {val.rubric.map((rubric, rub_i) => (
                  <div key={rub_i}>
                    <div className={styles.wrapRubric}>
                      <div className={styles.rubricTitle}>
                        <label className={styles.criteriaDetailLabel}>Rubric</label>
                        <input className={styles.criteriaDetailInput} type="text" name="title" value={rubric.title} placeholder="rubric"
                        onClick={(e) => handlePopup(e, rubric, index, rub_i)}
                        onChange={event => rubricChange(event, index, rub_i,)}/>
                        <p className={styles.errorText}>{formErrors[index].rubric[rub_i].title}</p>
                      </div>
                        <div className={styles.listItemAction}>
                          <button className={styles.btnRubtic} onClick={(e) => removeRubric(e, index, rub_i)}><FaMinus/></button>
                          <button className={styles.btnRubtic} onClick={(e) => addRubric(e, index, rub_i)}><FaPlus/></button>
                        </div>
                    </div>
                   
                    
                    </div>
                  
                ))}
                </div>
              </div>
            ))}
             
              {/* <button onClick={() => { openInPopup("ds") }}>Modal</button> */}
              {/* <button onClick={() => { setPopup(true) }}>Modal</button> */}

              {/* <Modal  title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}/> */}
                <Modal  popup={popup} setPopup={setPopup}>
                  <Rubric 
                   rubricChange={rubricChange} 
                   scoreChange={scoreChange}
                   removeScore={removeScore}
                   addScore={addScore}
                   setPopup={setPopup}
                   recordForEdit={recordForEdit}
                   editIndex={editIndex}
                   editRubricIndex={editRubricIndex}
                   errors={formErrors}
                   
                   />
                </Modal>

            <button className={styles.addButton}>Add Criteria</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCR;
