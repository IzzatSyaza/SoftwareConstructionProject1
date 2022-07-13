import React, {useState, useEffect} from "react";
import styles from "./allAsign.module.scss";
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



const AllAsign = () => {
  const {exhibitId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [criteria, setCriteria] = useState([])
  const [participant, setParticipant] = useState([]);
  const [assign, setAssign] = useState([]);
  const [del, setDel] = useState(false);


  const navigate = useNavigate();

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
//         // console.log("response.data");
//         // console.log(cr);
//         // setParticipate(response.data);
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// }, []);

useEffect(() => {
  Axios.get("http://localhost:3001/exhibition/assign",{
    params:{
      exhibitionuuid: exhibitId
    }
  }).then((response) => {
      console.log(response.data);
      setAssign(response.data);
  })
  .catch(err =>{
      console.log(err);
  })
}, [del]);

  const deleteAssign = (e, id, index) =>{
    e.preventDefault();
    if (window.confirm("Do You Want To Delete The Assign For Juries?") == true) {
        Axios.delete(`http://localhost:3001/exhibition/assign/delete/${id}`)
        .then((response)=> {
            alert(response.data.message);
            // setAssign(assign[index].assigns.filter((val) => {
            //     return val.uuid !== id
            // }))
            setDel(!del)
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
          <h2>Participant Assign to Jury</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>List</h3>
          <div className={styles.wraptable}>
            <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
              <thead>
                <tr>
                    <th className={styles.reportTh}>Participant</th>
                    {/* <th className={styles.reportTh}>Description</th> */}
                    <th className={styles.reportTh}>Juries</th>
                    <th className={styles.reportTh}>Action</th>
                    


                </tr>
              </thead>
              <tbody>
              {assign.map((val, index) => {
                  return(
                    <tr key={index}>
                      <td className={styles.reportTd}>{val.user.schools.school_name}</td>
                      {val.assigns && 
                      <td>
                      {val.assigns.map((assign, ind) => (
                        <table key={ind}>
                        <tbody>
                        <tr >
                          <td className={styles.reportTd}>{assign.juries.name}</td>
                        </tr>
                        </tbody>
                        </table>
                      ))}
                      </td>
                      }
                      
                      {val.assigns &&<td>
                      {val.assigns.map((assign, i) => (
                        <table key={i}>
                        <tbody>
                        <tr >
                          <td className={styles.listItemAction}>
                          <Link className={styles.link} to={`/exhibition/assign/edit/${exhibitId}/${assign.uuid}`} state={{exhibit: exhibit, asg: val}}>
                            <button  className={styles.buttonEdit}>
                                <MdOutlineEdit className={styles.listIcon}/>
                                Edit
                            </button>
                          </Link>
                          <button  className={styles.buttonDelete}
                            onClick={(e)=>{deleteAssign(e, assign.uuid, index)}} >
                                <MdDeleteOutline className={styles.listIcon}/>
                                Delete
                           </button>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                      ))}
                      </td>
                      }
                      

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

export default AllAsign;
