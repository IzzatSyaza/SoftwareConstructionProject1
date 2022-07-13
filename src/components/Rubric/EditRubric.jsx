import styles from "./rubric.module.scss";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const Rubric = ({recordForEdit, rubricChange, scoreChange, removeScore, addScore, editIndex, editRubricIndex, errors, setPopup}) => {

  const [rubricValue, setRubricValue] = useState([])
//   useEffect(() => {
//     console.log(recordForEdit)
//     // if (recordForEdit !== null)
//     setRubricValue({
//             ...recordForEdit
//         })
// }, [recordForEdit])
  return (
    

        <div className={styles.s}>
          <h2>Rubric For Citeria</h2>
          <div className={styles.addCriteriaForm} >
          {/* {rubricValue.map((rubric, rubric_index) => {
            return ( */}
              <div className={styles.criteriaDetail} >
                <div className={styles.rubricTitle}>
                  <label className={styles.criteriaDetailLabel}>Rubric Title</label>
                  <input className={styles.criteriaDetailInput} type="text" name="title" value={recordForEdit.title} placeholder="Rubric"
                    onChange={event => rubricChange(event, editIndex, editRubricIndex,)}/>
                  <p className={styles.errorText}>{errors[editIndex].rubric[editRubricIndex].title}</p>
                </div>
                {recordForEdit.score.length === 0 && 
                <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(event) => removeScore(event, editIndex, editRubricIndex, -1)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(event) => addScore(event, editIndex, editRubricIndex, -1)}><FaPlus/></button>
                </div>}
                {recordForEdit.score.map((score, score_index) => {return(
                  <div key={score_index}>
                    <div className={styles.wrapInput}>
                      <div className={styles.wrapRange}>
                        <div className={styles.rubricRange}>
                          <label className={styles.criteriaDetailLabel}>Lowest</label>
                          <input className={styles.criteriaDetailInput} type="number" name="lowest" min="0" value={score.lowest} placeholder="0"
                            onChange={event => scoreChange(event, editIndex, editRubricIndex, score_index)}/>
                           <p className={styles.errorText}>{errors[editIndex].rubric[editRubricIndex].score[score_index].lowest}</p>

                        </div>
                        <div className={styles.rubricRange}>
                          <label className={styles.criteriaDetailLabel}>Highest</label>
                          <input className={styles.criteriaDetailInput} type="number" name="highest" min="0" value={score.highest} placeholder="3"
                            onChange={event => scoreChange(event, editIndex, editRubricIndex, score_index)}/>
                           <p className={styles.errorText}>{errors[editIndex].rubric[editRubricIndex].score[score_index].highest}</p>
                        </div>
                      </div> 
                      <div className={styles.wrapDesc}>
                        <div className={styles.rubricDesc}>
                          <label className={styles.criteriaDetailLabel}>Description</label>
                          <textarea className={styles.criteriaDetailInput} type="text" name="desc" value={score.desc} placeholder="Description for score"
                            onChange={event => scoreChange(event, editIndex, editRubricIndex, score_index)}/>
                           <p className={styles.errorText}>{errors[editIndex].rubric[editRubricIndex].score[score_index].desc}</p>

                        </div>
                        <div className={styles.listItemAction}>
                          <button className={styles.buttonAddRemove} onClick={(event) => removeScore(event, editIndex, editRubricIndex, score_index)}><FaMinus/></button>
                          <button className={styles.buttonAddRemove} onClick={(event) => addScore(event, editIndex, editRubricIndex, score_index)}><FaPlus/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
                

              
              </div>
            {/* ) */}
          {/* })} */}



            <button className={styles.addButton} onClick={()=>setPopup(false)}>Save Rubric</button>
          </div>
        </div>
  );
};

export default Rubric;
