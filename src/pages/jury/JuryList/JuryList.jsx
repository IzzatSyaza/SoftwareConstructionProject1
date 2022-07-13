import React, {useState, useEffect} from "react";
import styles from "./JuryList.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import Axios from "axios";



const JuryList = () => {
  const [jury, setJury] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/jury/getAll",).then((response) => {
            console.log(response);
            console.log("response");
            setJury(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteJury = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/jury/delete/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setJury(jury.filter((val) => {
                    return val.uuid != id
                }))
            }).catch(err =>{
                alert(err);
            })
        }
    }

  return (
    <main>
      <div className={styles.title}>
        <h1>JURY</h1>
        <WiStars />
      </div>
      <div >
        <div className={styles.add}>
          <h2>JURY LIST</h2>
          <div className={styles.wraptable}>
          <table className={styles.reportTable} id="reportByClinic">
            <thead>
              <tr>
                  <th className={styles.reportTh}>No</th>
                  <th className={styles.reportTh}>Username</th>
                  <th className={styles.reportTh}>Name</th>
                  <th className={styles.reportTh}>Contact</th>
                  <th className={styles.reportTh}>Email</th>
                  <th className={styles.reportTh}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jury.map((val, i) => {
                            return(
                                <tr key={i}>
                                    <td className={styles.listItem}>{++i}</td>
                                    <td className={styles.listItem}>{val.username}</td>
                                    <td className={styles.listItem}>{val.juries.name}</td>
                                    <td className={styles.listItem}>{val.juries.contact}</td>
                                    <td className={styles.listItem}>{val.juries.email}</td>
                                    <td className={styles.listItemAction}>
                                    <Link className={styles.link} to={"/editJury/"+val.uuid} state={{jury: val}}>
                                    <button  className={styles.buttonEdit}>
                                        <MdOutlineEdit className={styles.listIcon}/>
                                        <span>Edit</span>
                                    </button>
                                    </Link>
                                    <button  className={styles.buttonDelete}
                                    onClick={(e)=>{deleteJury(e, val.uuid)}}
                                    >
                                        <MdDeleteOutline className={styles.listIcon}/>
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
            </tbody>
                        
                    
                </table></div>
        </div>
      </div>
    </main>
  );
};

export default JuryList;
