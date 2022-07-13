import React, {useState, useEffect} from "react";
import styles from "./participantList.module.scss";
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
import {MdOutlineEdit, MdDeleteOutline, MdRemoveRedEye} from "react-icons/md";



const ParticipantList = () => {
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [criteria, setCriteria] = useState([])

  const navigate = useNavigate();
  const [participant, setParticipant] = useState([]);
  var no = 0;

  useEffect(() => {
    Axios.get("http://localhost:3001/exhibition/participant",{
      params:{
        exhibitionuuid: exhibitId
      }
    }).then((response) => {
        console.log(response.data);
        setParticipant(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

//   useEffect(() => {
//     Axios.get("http://localhost:3001/criteria/getAll",{
//       params:{
//         exid: exhibitId
//       }
//     }).then((res) => {
//       // if(!response.data.register) {
//       //   alert(response.data.mes)
//       //   navigate('/dashboardSchool');
//       // }
//       // console.log(response.data.participant.uuid)
//       const cr = []
//       for (let i = 0; i < res.data.length; i++) {
//         cr.splice(i, 0,{ criteria: JSON.parse(res.data[i].cr), uuid: res.data[i].uuid})
//       }

//       setCriteria(cr)
//         console.log("response.data");
//         console.log(cr);
//         // setParticipate(response.data);
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// }, []);

  // const deleteCriteria = (e, id) =>{
  //   e.preventDefault();
  //   if (window.confirm("Do You Want To Delete The Criteria?") == true) {
  //       Axios.delete(`http://localhost:3001/criteria/delete/${id}`)
  //       .then((response)=> {
  //           alert(response.data.message);
  //           setCriteria(criteria.filter((val) => {
  //               return val.uuid != id
  //           }))
  //       }).catch(err =>{
  //           alert(err);
  //       })
  //   }
  // }



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
          <h2>Participant</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>List</h3>
          <div className={styles.wraptable}>
            <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
              <thead>
                <tr>
                    <th className={styles.reportTh}>No</th>
                    <th className={styles.reportTh}>School</th>
                    <th className={styles.reportTh}>View</th>
                    


                </tr>
              </thead>
              <tbody>
              {participant.map((val, index) => {
                  return(
                    <tr key={index}>
                      <td className={styles.reportTd}>{++no}</td>
                      <td className={styles.reportTd}>{val.user.schools.school_name}</td>
                      {/* <td className={styles.reportTd}>{val.description}</td> */}
                      <td className={styles.listItemAction}>
                          <Link className={styles.link} to={`/exhibition/participant/view/${exhibitId}/${val.uuid}`} state={{exhibit: exhibit, participant: val}}>
                            <button  className={styles.buttonEdit}>
                                <MdRemoveRedEye className={styles.listIcon}/>
                                View
                            </button>
                          </Link>
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

export default ParticipantList;
