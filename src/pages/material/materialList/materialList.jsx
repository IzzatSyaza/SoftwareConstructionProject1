import React, {useState, useEffect} from "react";
import styles from "./materialList.module.scss";
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



const MaterialList = () => {
  const {exhibitId, participantId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [material, setMaterial] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/school/material",{
      params:{
        exhibituuid: exhibitId
      }
    }).then((response) => {
      // if(!response.data.register) {
      //   alert(response.data.mes)
      //   navigate('/dashboardSchool');
      // }
      // console.log(response.data.participant.uuid)
      setMaterial(response.data)
        console.log("response.data");
        console.log(response.data);
        // setParticipate(response.data);
    })
    .catch(err =>{
        console.log(err);
    })
}, []);

  const deleteMaterial = (e, id) =>{
    e.preventDefault();
    if (window.confirm("Do You Want To Delete The Material?") == true) {
        Axios.delete(`http://localhost:3001/school/material/delete/${id}`)
        .then((response)=> {
            alert(response.data.message);
            setMaterial(material.filter((val) => {
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
          <h2>Material</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>List</h3>
          <div className={styles.wraptable}>
            <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
              <thead>
                <tr>
                    <th className={styles.reportTh}>Title</th>
                    <th className={styles.reportTh}>Link</th>
                    <th className={styles.reportTh}>Action</th>
                    {/* <th className={styles.reportTh}>Action</th> */}
                    


                </tr>
              </thead>
              <tbody>
              {material.map((val, index) => {
                  return(
                    <tr key={index}>
                      <td className={styles.reportTd}>{val.title}</td>
                      <td className={styles.reportTd}>{val.link}</td>
                      <td className={styles.listItemAction}>
                          <Link className={styles.link} to={`/material/edit/${exhibitId}/${val.uuid}`} state={{exhibit: exhibit, material: val}}>
                            <button  className={styles.buttonEdit}>
                                <MdOutlineEdit className={styles.listIcon}/>
                                Edit
                            </button>
                          </Link>
                          <button  className={styles.buttonDelete}
                            onClick={(e)=>{deleteMaterial(e, val.uuid)}} >
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

export default MaterialList;
