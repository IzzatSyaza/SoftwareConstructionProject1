import React, {useState, useEffect} from "react";
import styles from "./SchoolList.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";

import Axios from "axios";



const SchoolList = () => {
  const [school, setSchool] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/school/getAll",).then((response) => {
            console.log(response);
            console.log("response");
            setSchool(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteSchool = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/school/delete/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setSchool(school.filter((val) => {
                    return val.uuid !== id
                }))
            }).catch(err =>{
                alert(err);
            })
        }
    }

  return (
    <main>
      <div className={styles.title}>
        <h1>SCHOOL</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.add}>
          <h2>SCHOOL LIST</h2>
          <div className={styles.wraptable}>
          <table className={styles.reportTable} id="reportByClinic">
            <thead>
              <tr>
                  <th className={styles.reportTh}>No</th>
                  <th className={styles.reportTh}>School</th>
                  <th className={styles.reportTh}>Contact</th>
                  <th className={styles.reportTh}>Email</th>
                  <th className={styles.reportTh}>Address</th>
                  <th className={styles.reportTh}>Action</th>

              </tr>
            </thead>
            <tbody>
              {school.map((val, index) => {
                            return(
                                <tr key={index}>
                                    <td className={styles.listItem}>{++i}</td>
                                    <td className={styles.listItem}>{val.schools.school_name}</td>
                                    <td className={styles.listItem}>{val.schools.contact}</td>
                                    <td className={styles.listItem}>{val.schools.email}</td>
                                    <td className={styles.listItem}>{val.schools.address}</td>

                                    <td className={styles.listItemAction}>
                                    <Link className={styles.link} to={`/school/edit/${val.uuid}`} state={{school: val}}>
                                    <button  className={styles.buttonEdit} >
                                        <MdOutlineEdit className={styles.listIcon}/>
                                        Edit
                                    </button>
                                    </Link>
                                    <button  className={styles.buttonDelete}
                                    onClick={(e)=>{deleteSchool(e, val.uuid)}} >
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

export default SchoolList;
