import styles from "./rubric.module.scss";
import React, {useState, useEffect, useMemo} from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const formatRecord = (data) => {
  return data
}
const Rubric = ({recordForEdit, rubricChange, scoreChange, removeScore, addScore, editIndex, editRubricIndex, errors, setPopup}) => {
  const [savedRecored] = useMemo(()=>formatRecord(recordForEdit), [recordForEdit])
  const [savedIndex] = useMemo(()=>formatRecord(editIndex), [editIndex])
  const [savedRIndex] = useMemo(()=>formatRecord(editRubricIndex), [editRubricIndex])
  const [savedError] = useMemo(()=>formatRecord(errors), [errors])

  

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
                    onChange={event => rubricChange(event, savedIndex, savedRIndex,)}/>
                  <p className={styles.errorText}>{savedError[savedIndex].rubric[savedRIndex].title}</p>
                </div>
                {recordForEdit.score.length === 0 && 
                <div className={styles.listItemAction}>
                  <button className={styles.buttonAddRemove} onClick={(event) => removeScore(event, savedIndex, savedRIndex, -1)}><FaMinus/></button>
                  <button className={styles.buttonAddRemove} onClick={(event) => addScore(event, savedIndex, savedRIndex, -1)}><FaPlus/></button>
                </div>}
                {savedRecored.score.map((score, score_index) => {return(
                  <div key={score_index}>
                    <div className={styles.wrapInput}>
                      <div className={styles.wrapRange}>
                        <div className={styles.rubricRange}>
                          <label className={styles.criteriaDetailLabel}>Lowest</label>
                          <input className={styles.criteriaDetailInput} type="number" name="lowest" min="0" value={score.lowest} placeholder="0"
                            onChange={event => scoreChange(event, savedIndex, savedRIndex, score_index)}/>
                           <p className={styles.errorText}>{savedError[savedIndex].rubric[savedRIndex].score[score_index].lowest}</p>

                        </div>
                        <div className={styles.rubricRange}>
                          <label className={styles.criteriaDetailLabel}>Highest</label>
                          <input className={styles.criteriaDetailInput} type="number" name="highest" min="0" value={score.highest} placeholder="3"
                            onChange={event => scoreChange(event, savedIndex, savedRIndex, score_index)}/>
                           <p className={styles.errorText}>{savedError[savedIndex].rubric[savedRIndex].score[score_index].highest}</p>
                        </div>
                      </div> 
                      <div className={styles.wrapDesc}>
                        <div className={styles.rubricDesc}>
                          <label className={styles.criteriaDetailLabel}>Description</label>
                          <textarea className={styles.criteriaDetailInput} type="text" name="desc" value={score.desc} placeholder="Description for score"
                            onChange={event => scoreChange(event, savedIndex, savedRIndex, score_index)}/>
                           <p className={styles.errorText}>{savedError[savedIndex].rubric[savedRIndex].score[score_index].desc}</p>

                        </div>
                        <div className={styles.listItemAction}>
                          <button className={styles.buttonAddRemove} onClick={(event) => removeScore(event, savedIndex, savedRIndex, score_index)}><FaMinus/></button>
                          <button className={styles.buttonAddRemove} onClick={(event) => addScore(event, savedIndex, savedRIndex, score_index)}><FaPlus/></button>
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
