import React, {useState, useEffect} from "react";
import styles from "./displayEvaluation.module.scss";
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
import { useAuth } from "../../../Context/Auth";
import ReactHTMLTableToExcel from "react-html-table-to-excel"


const DisplayEvaluation = () => {
  const auth = useAuth();
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [mark, setMark] = useState([])

  const navigate = useNavigate();

  const calcTotal = (data) =>{
    console.log(data)
    data.forEach(val => {
      let t = 0
      for(let i = 0; i<val.self_evaluates.length; i++){
        t = Number(t) + Number(val.self_evaluates[i].mark);
      }
      val.t = t;
      // console.log(t)
    });
    
    data.sort((a, b) => {
      return Number(b.t) - Number(a.t);
    });
    // console.log("sort")
    console.log(data)
    setMark(data)
  

  }

  useEffect(() => {
    Axios.get("http://localhost:3001/exhibition/evaluation",{
      params:{
        exhibituuid: exhibitId
      }
    }).then((response) => {
      // if(!response.data.register) {
      //   alert(response.data.mes)
      //   navigate('/dashboardSchool');
      // }
      // console.log(response.data.participant.uuid)
      // setMark(response.data)
      calcTotal(response.data)
        // console.log("response.data");
        // console.log(response.data);
        // setParticipate(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

const parseCR= (data) =>{
  let value = JSON.parse(data)
  return value.criteriaName
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
          <h2>Report</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>Self Evaluation</h3>
          <div className={styles.wraptable}>
          <ReactHTMLTableToExcel  className={styles.export}
          table={`${exhibit.title}self_evaluation`} filename={`${exhibit.title}self_evaluation`} sheet="Sheet" buttonText="Export to Excel"/>
          <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
            <thead>
              <tr>
                  <th className={styles.reportTh}>School</th>
                  <th className={styles.reportTh}>Evaluation</th>
                  <th className={styles.reportTh}>Criteria</th>
                  <th className={styles.reportTh}>Total</th>

              </tr>
            </thead>
            <tbody>
            {mark.map((val, index) => {
              return(
                <tr key={index}>
                  <td className={styles.reportTd}>{val.user.schools.school_name}</td>
                  <td className={styles.reportTd}>
                    {
                     val.self_evaluates.map((sv, i) => {
                       return(
                         <div key={i}>
                            {sv.mark ? <>{sv.mark}</>: <></>}   
                         </div>

                       )
                     })
                    } 
                  </td>
                  <td className={styles.reportTd}>
                    {
                      val.self_evaluates.map((sv, a) => {
                        return(
                          <div key={a}>
                          {sv.tcriteria ? <>{parseCR(sv.tcriteria.cr)}</>: <></>}
                          </div>

                        )
                      })
                    }
                  </td>
                  <td>
                    {val.t ? <>{val.t}</>: <></>}
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

export default DisplayEvaluation;
