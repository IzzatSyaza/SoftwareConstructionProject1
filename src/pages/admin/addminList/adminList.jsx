import React, {useState, useEffect} from "react";
import styles from "./adminList.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";

import Axios from "axios";



const AdminList = () => {
  const [admin, setAdmin] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/admin/getAll",).then((response) => {
            console.log(response);
            console.log("response");
            setAdmin(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteAdmin = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/admin/delete/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setAdmin(admin.filter((val) => {
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
        <h1>ADMIN</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.add}>
          <h2>ADMIN LIST</h2>
          <div className={styles.wraptable}>
          <table className={styles.reportTable} id="reportByClinic">
            <thead>
              <tr>
                  <th className={styles.reportTh}>No</th>
                  <th className={styles.reportTh}>Username</th>
                  <th className={styles.reportTh}>Action</th>
              </tr>
            </thead>
            <tbody>
              {admin.map((val) => {
                            return(
                                <tr key={val.uuid}>
                                    <td className={styles.listItem}>{++i}</td>
                                    <td className={styles.listItem}>{val.username}</td>
                                    <td className={styles.listItemAction}>
                                    <Link className={styles.link} to={"/editAdmin/"+val.uuid}>
                                    <button  className={styles.buttonEdit}>
                                        <MdOutlineEdit className={styles.listIcon}/>
                                        Edit
                                    </button>
                                    </Link>
                                    <button  className={styles.buttonDelete}
                                    onClick={(e)=>{deleteAdmin(e, val.uuid)}}
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

export default AdminList;
