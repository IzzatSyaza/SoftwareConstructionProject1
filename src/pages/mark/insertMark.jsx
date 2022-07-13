import styles from "./mark.module.scss";
import React, {useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player/lazy'

import { useAuth } from "../../Context/Auth";

const InsertMark = () => {
  const {exhibitId, participantId} = useParams();
  const auth = useAuth();
  const location = useLocation();
  const {exhibit} = location.state;


  const [criteria, setCriteria] = useState([])
  const [mark, setMark] = useState([])
  const [participant, setParticipant] = useState([])
  const [videoposter, setVideoposter] = useState([])
  const [material, setMaterial] = useState([])
  const [hasJudge, setHasJudge] = useState(false)
  var i= 0;
  const navigate = useNavigate();





  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLength0, setIsLength0] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/judge",{
      params:{
        participantuuid: participantId,
        exhibitionId: exhibitId,
        useruuid: auth.user.uuid,

      }
    }).then((response) => {
        console.log(response.data);
        setHasJudge(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/jury/abstract",{
      params:{
        participantuuid: participantId,
      }
    }).then((response) => {
        // console.log(response.data);
        setParticipant(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

useEffect(() => {
  Axios.get("http://localhost:3001/jury/poster",{
    params:{
      participantuuid: participantId,
    }
  }).then((response) => {
      // console.log(response.data);
      setVideoposter(response.data);
  })
  .catch(err =>{
      console.log(err);
  })
}, []);

useEffect(() => {
  Axios.get("http://localhost:3001/jury/link",{
    params:{
      participantuuid: participantId,
    }
  }).then((response) => {
      // console.log(response.data);
      setMaterial(response.data);
  })
  .catch(err =>{
      console.log(err);
  })
}, []);


  const handleChange = (index, event, val) => {
    const value = [...mark];
    value[index][event.target.name] = event.target.value;
    // value[index]["criteriaId"] = "aloha";
    // console.log(value)
    setMark(value);
    // handleAddField(index);
  }


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
      // console.log(cr)
      setCriteria(cr)
      setMark(values);
      setFormErrors(error)
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/criteria/json", {
        params: {
            exid: exhibitId,
        }
      }).then((res) => {
        //   console.log(res.data);
          handleInputNo(res.data);
          // setCriteria(res.data)
          // console.log(JSON.parse(res.data[2].cr))
          // res.data.forEach(val=>{

          // })
          // console.log(res.data)


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
    if(!hasJudge){
      setFormErrors(validate());
      setIsSubmit(true);
      console.log(mark);
      console.log(formErrors)
    }else{
      alert("You Have Give Mark to this Participant")
    }
    
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
  // console.log(formErrors);
  if(isLength0 && isSubmit){
      Axios.post("http://localhost:3001/criteria/mark", {
        mark: mark,
        participantuuid: participantId,
        exhibitionuuid: exhibitId,
        useruuid: auth.user.uuid,
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate(-1)

      }).catch(err =>{
          alert(err);
      })
      // alert(auth.user.uuid)
  }
  setIsSubmit(false)
}, [formErrors])


  return (
    <main>
      <div className={styles.welcome}>
        <h1>
          {exhibit.title}<WiStars />
        </h1>
        <p>{exhibit.description}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Material</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Abstract and Activity Profile</h3>
          <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Abstract</h2>
            <div className={styles.abstractcontent}>
              {participant.abstract}
            </div>
          </div>
          <div className={styles.abstract}>
            <h2 className={styles.abstracttitle}>Activity Profile</h2>
            <div className={styles.abstractcontent}>
              {participant.activity_profile}
            </div>
          </div>
        </div>

        <div className={styles.today}>
          <h3 className={styles.activity_day}>Poster and Video</h3>
          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Poster</h2>
              {videoposter.map((val, index)=>(
                <div className={styles.poster}>
                  <img style={{ width: '100%' }} src={`/uploads/${val.poster}`} alt='' />
                </div>
              ))}
              {/* {videoposter? 
              <img style={{ width: '100%' }} src={`/uploads/${videoposter.poster}`} alt='' />
              : <h4>Poster Not Found</h4>} */}
          </div>

          <div className={styles.videoposter}>
            <h2 className={styles.vptitle}>Video</h2>
              {videoposter.map((val, index)=>(
                <div className={styles.video}>
                  <ReactPlayer  width="100%"  url={val.video} config={{ playerVars: { showinfo: 1 } }} controls/>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Link of Activity</h3>
          {material.map((val, index) => {
            return(
              <div className={styles.material} key={index}>
                <h2 className={styles.mtitle}>Material {++i}: </h2>
                <p className={styles.link}><a href={val.link}>{val.title}</a> </p>
                
              </div>
            )
          })}

        </div>
        
      </div>
      <div >
        <div className={styles.criteria}>
        <div className={styles.title}>
          <h2>Judge</h2>
        </div>
          <h3 className={styles.activity_day}>Criteria and Rubric</h3>
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
                  <input className={styles.criteriaDetailInput} value={mark[index].mark} type="number" id="quantity" name="mark" min="0" max={val.criteria.mark}
                  onChange={(e) => handleChange(index, e, val.uuid)}/>
                    <p className={styles.errorText}>{formErrors[index].mark}</p>
                </div>
              </div>
            ))}
            <button className={styles.addButton}>Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default InsertMark;
