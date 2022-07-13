import React, {useState, useEffect} from "react";
import styles from "./displayMark.module.scss";
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


const DisplayMark = () => {
  const auth = useAuth();
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [mark, setMark] = useState([])
  const [total, setTotal] = useState([])
  const [stype, setStype] = useState("ALL")


  const navigate = useNavigate();

  const calcTotal = (data) =>{
    data.forEach(val => {
      let t = 0
      for(let i = 0; i<val.marks.length; i++){
        t = Number(t) + Number(val.marks[i].mark);
      }
      val.t = t;
      // console.log(t)
    });
    // console.log(data)
    data.sort((a, b) => {
      return Number(b.t) - Number(a.t);
    });
    // console.log("sort")
    console.log(data)
    setMark(data)
  

  }

  const handleFilter = (e, filter) => {
    e.preventDefault();
    setStype(filter)
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/exhibition/mark",{
      params:{
        exhibituuid: exhibitId,
        stype: stype
      }
    }).then((response) => {
      // if(!response.data.register) {
      //   alert(response.data.mes)
      //   navigate('/dashboardSchool');
      // }
      // console.log(response.data.participant.uuid)
      console.log(response.data)
      calcTotal(response.data)
      
      // setMark(response.data)
        // console.log(response.data);
        // console.log(response.data[0]);
        // console.log(response.data[0].marks[0].tcriteria.uuid);
        // setParticipate(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, [stype]);

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
          <h3 className={styles.activity_day}>Mark</h3>
          <div className={styles.wrapfilter}>
            <button className={styles.filterbtn} onClick={(e) => handleFilter(e, "PRIMARY")}>Primary</button>
            <button className={styles.filterbtn} onClick={(e) => handleFilter(e, "SECONDARY")}>Secondary</button>
            <button className={styles.filterbtn} onClick={(e) => handleFilter(e, "ALL")}>All</button>
          </div>
          

          <div className={styles.wraptable}>
          <ReactHTMLTableToExcel  className={styles.export}
          table={`${exhibit.title}mark`} filename={`${exhibit.title}mark`} sheet="Sheet" buttonText="Export to Excel"/>
          <table className={styles.reportTable} id={`${exhibit.title}mark`}>
            <thead>
              <tr>
                  <th className={styles.reportTh}>School</th>
                  <th className={styles.reportTh}>Jury</th>
                  <th className={styles.reportTh}>Mark</th>
                  <th className={styles.reportTh}>Criteria</th>
                  <th className={styles.reportTh}>Total</th>

              </tr>
            </thead>
            <tbody>
            {mark.map((val, index) => {
              return(
                <tr key={index}>
                  <td className={styles.reportTh}>
                    {val.user ? <>{val.user.schools.school_name}</>: <>deleted</>}  
                   </td>
                  <td className={styles.reportTh}>
                    {
                     val.marks.map((mark, i) => {
                       return(
                         <div key={i}>
                          {mark.juries ? <>{mark.juries.name}</>: <></>}
                         </div>

                       )
                     })
                    } 
                  </td>
                  <td className={styles.reportTh}>
                    {
                      val.marks.map((mark, i) => {
                        return(
                          <div key={i}>
                            {mark.mark ? <>{mark.mark}</>: <></>}
                          </div>

                        )
                      })
                    }
                  </td>
                  <td>
                    {
                      val.marks.map((mark, i) => {
                        return(
                          <div key={i}>
                            {mark.tcriteria ? <>{parseCR(mark.tcriteria.cr)}</>: <></>}      
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

export default DisplayMark;
