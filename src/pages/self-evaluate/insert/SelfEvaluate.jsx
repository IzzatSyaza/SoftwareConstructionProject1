import styles from "./selfEvaluate.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../../../Context/Auth";

const SelfEvaluate = () => {
  const {exhibitId, participantId} = useParams();
  const auth = useAuth();
  const location = useLocation();
  const {exhibit} = location.state;

//   const [inputFields, setInputFields] = useState([
//     {criteriaName: "", description: "", mark: ""},
//   ]);
  const [criteria, setCriteria] = useState([])
  const [mark, setMark] = useState([])


  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLength0, setIsLength0] = useState(false);


  const handleChange = (index, event, val) => {
    const value = [...mark];
    value[index][event.target.name] = event.target.value;
    // value[index]["criteriaId"] = "aloha";
    // console.log(value)
    setMark(value);
    // handleAddField(index);
  }

//   const handleAddField = (index) => {
//     // e.preventDefault();
//     const values = [...mark];
//     values.splice(index+1, 0, { mark: 0})
//     console.log(values)

//     setMark(values);
//   }

  const handleInputNo = (data) => {
    // e.preventDefault();
    const values = [];
    const error = []
    const cr = []

    for (let i = 0; i < data.length; i++) {
        cr.splice(i, 0,{ criteria: JSON.parse(data[i].cr), uuid: data[i].uuid})
        values.splice(i, 0,{ mark: "", criteriaId: data[i].uuid})
        error.splice(i, 0,{mark: ""})
      }
      setCriteria(cr)
      setMark(values);
      setFormErrors(error)
  }

//   const trysahaja = () => {
//     // e.preventDefault();
//     no = no +1;
//     console.log(no);
//     console.log("berapa");

    
//   }

  useEffect(()=>{
    Axios.get("http://localhost:3001/criteria/json", {
        params: {
            exid: exhibitId,
        }
      }).then((res) => {
        //   console.log(res.data);
          handleInputNo(res.data);
          // setCriteria(res.data)

      }).catch(err =>{
          alert(err);
      })
  },[]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    // let cuba = JSON.stringify(inputFields)
    // Axios.post("http://localhost:3001/criteria/mark", {
    //     mark: mark,
    //   }).then((res) => {
    //       console.log(res);
    //       alert(res.data.message);

    //   }).catch(err =>{
    //       alert(err);
    //   })
    // console.log(mark)
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
    console.log(mark);
    console.log(formErrors)
  }

  const validate = () => {
    const errors = [...formErrors];
    const values = [...mark];
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    
    values.forEach((val, index)=>{
        if(!val.mark){
            errors[index].mark = "Mark is required!";
        }
        else{
          errors[index] = {}
        }
    })

    setIsLength0(
      errors.every((val, index)=>{
        if(Object.keys(val).length === 0){
           return true
        }
        else return false
    }))


    return errors
}

useEffect(() => {
  console.log(formErrors);
  if(isLength0 && isSubmit){
      Axios.post("http://localhost:3001/criteria/evaluate", {
        mark: mark,
        participantuuid: participantId,
        exhibitionuuid: exhibitId,
        
      }).then((res) => {
          console.log(res);
          alert(res.data.message);

      }).catch(err =>{
          alert(err);
      })
      // alert("auth.user.uuid")
  }
}, [formErrors])


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
          <h2>Self-Evaluation</h2>
        </div>
        <div className={styles.today}>
        <h3 className={styles.activity_day}>SUBMISSION</h3>
          <div className={styles.activities}>
            <form className={styles.addCriteriaForm} onSubmit={handleSubmit}>
              { criteria.map((val, index) => (
                <div className={styles.criteriaDetail} key={index}>
                  <div className={styles.newCriteria}>
                    <p className={styles.criteriaTitle}>{val.criteria.criteriaName}</p>
                  </div>
                  {/* {trysahaja()} */}
                  {/* {handleAddField()} */}
                  <div className={styles.newCriteria}>
                    <div className={styles.wrapRubric}>
                    {val.criteria.rubric.map((rubric, bil)=> (
                      <div className={styles.contentRubric} key={bil}>
                          <div className={styles.rubricTitle}>
                            <h4>{rubric.title}</h4>
                          </div>

                          <div className={styles.wrapContentScore}>
                          {rubric.score.map((score, no)=>(
                            <div className={styles.wrapScore} key={no}>
                              <div className={styles.desc}>{score.desc}</div>
                              <div className={styles.range}>
                                {score.lowest === score.highest? <span>{score.highest}</span>
                                : <span>{score.lowest} - {score.highest}</span>}
                              </div>

                            </div>              
                          ))}
                      </div>
                    </div>
                  ))}
                  </div>

                  </div>

                  <div className={styles.descrptionCriteria}>
                    <label className={styles.criteriaMark}>Full Mark: {val.criteria.mark}</label>
                    {/* <textarea className={styles.criteriaDetailInput} type="text" name="description" value={inputFields.description} placeholder="Description"
                      onChange={event => handleChange(index, event)}/> */}
                      <input className={styles.criteriaDetailInput} value={mark[index].mark} type="number" id="quantity" name="mark" min="0" max={val.full_mark}
                          onChange={(e) => handleChange(index, e, val.uuid)}
                      />
                      <p className={styles.errorText}>{formErrors[index].mark}</p>
                  </div>
                    
                    
                </div>
              ))}

              <button className={styles.addButton}>Submit</button>
            </form>
          </div>
          </div>
        </div>
    </main>
  );
};

export default SelfEvaluate;
