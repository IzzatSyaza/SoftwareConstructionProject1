import React, {useState, useEffect} from "react";
import styles from "./posterList.module.scss";
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
import {MdOutlineEdit, MdRemoveRedEye, MdDeleteOutline, MdOutlineAdd} from "react-icons/md";
import { Modal } from "../../../components/Modal/Modal";
import ViewPoster from "../viewPoster/viewPoster";



const PosterList = () => {
  const {exhibitId, participantId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;
  const [material, setMaterial] = useState([])
  const [popup, setPopup] = useState(false)
  const [selectedVP, setSelectedVP] = useState()


  const navigate = useNavigate();
  var no = 0;
  useEffect(() => {
    Axios.get("http://localhost:3001/school/videoposter",{
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
        Axios.delete(`http://localhost:3001/school/videoposter/delete/${id}`)
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

  const handlePopup = (event, val, index, rub_ind) => {
    event.preventDefault();
    setSelectedVP(val)
    setPopup(true);
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
          <h2>Poster and Video</h2>
        </div>
        <div className={styles.today}>
          <h3 className={styles.activity_day}>List</h3>
          <Link className={styles.link} to={`/fileUpload/${exhibit.uuid}/${participantId}` } state={{exhibit: exhibit}}>
            <button  className={styles.buttonAdd} >
                <MdOutlineAdd className={styles.listIcon}/>Add
            </button>
          </Link>
          <div className={styles.wraptable}>
            <table className={styles.reportTable} id={`${exhibit.title}self_evaluation`}>
              <thead>
                <tr>
                  <th className={styles.reportTh}>No</th>
                    <th className={styles.reportTh}>Video</th>
                    <th className={styles.reportTh}>Poster</th>
                    <th className={styles.reportTh}>Action</th>
                    {/* <th className={styles.reportTh}>Action</th> */}
                    


                </tr>
              </thead>
              <tbody>
              {material.map((val, index) => {
                  return(
                    <tr key={index}>
                      <td className={styles.reportTd}>{++no}</td>
                      <td className={styles.reportTd}>{val.video}</td>
                      <td className={styles.reportTd}>{val.poster}</td>
                      <td className={styles.listItemAction}>
                        <button  className={styles.buttonEdit} onClick={(e) => handlePopup(e, val)}>
                              <MdRemoveRedEye className={styles.listIcon}/>
                              View
                          </button>
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
            <Modal  popup={popup} setPopup={setPopup}>
                <ViewPoster 
                  vp={selectedVP}
                />
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PosterList;
