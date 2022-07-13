import React, {useState, useEffect} from "react";
import styles from "./criteriaList.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
// import DatePicker from "react-datepicker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";



const CriteriaList = () => {
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [criteria, setCriteria] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/criteria/getAll",{
      params:{
        exid: exhibitId
      }
    }).then((res) => {
      // if(!response.data.register) {
      //   alert(response.data.mes)
      //   navigate('/dashboardSchool');
      // }
      // console.log(response.data.participant.uuid)
      const cr = []
      for (let i = 0; i < res.data.length; i++) {
        cr.splice(i, 0,{ criteria: JSON.parse(res.data[i].cr), uuid: res.data[i].uuid})
      }

      setCriteria(cr)
        console.log("response.data");
        console.log(cr);
        // setParticipate(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

  const deleteCriteria = (e, id) =>{
    e.preventDefault();
    if (window.confirm("Do You Want To Delete The Criteria?") == true) {
        Axios.delete(`http://localhost:3001/criteria/delete/${id}`)
        .then((response)=> {
            alert(response.data.message);
            setCriteria(criteria.filter((val) => {
                return val.uuid != id
            }))
        }).catch(err =>{
            alert(err);
        })
    }
  }



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
          <h2>Criteria</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>List</h3>
          <div className={styles.wraptable}>
            <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
              <thead>
                <tr>
                    <th className={styles.reportTh}>Criteria</th>
                    {/* <th className={styles.reportTh}>Description</th> */}
                    <th className={styles.reportTh}>Full Mark</th>
                    <th className={styles.reportTh}>Action</th>
                    


                </tr>
              </thead>
              <tbody>
              {criteria.map((val, index) => {
                  return(
                    <tr key={index}>
                      <td className={styles.reportTd}>{val.criteria.criteriaName}</td>
                      {/* <td className={styles.reportTd}>{val.description}</td> */}
                      <td className={styles.reportTd}>{val.criteria.mark}</td>
                      <td className={styles.listItemAction}>
                          <Link className={styles.link} to={`/exhibition/criteria/rubric/edit/${exhibitId}/${val.uuid}`} state={{exhibit: exhibit, criteria: val}}>
                            <button  className={styles.buttonEdit}>
                                <MdOutlineEdit className={styles.listIcon}/>
                                Edit
                            </button>
                          </Link>
                          <button  className={styles.buttonDelete}
                            onClick={(e)=>{deleteCriteria(e, val.uuid)}} >
                                <MdDeleteOutline className={styles.listIcon}/>
                                Delete
                           </button>
                    </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CriteriaList;
