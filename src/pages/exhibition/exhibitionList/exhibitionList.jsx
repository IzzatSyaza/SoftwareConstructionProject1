import React, {useState, useEffect} from "react";
import styles from "./exhibitionList.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";

import Axios from "axios";



const ExhibitionList = () => {
  const [exhibition, setExhibition] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/exhibition/getAll",).then((response) => {
            console.log(response);
            console.log("response");
            setExhibition(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteExhibition = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/exhibition/delete/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setExhibition(exhibition.filter((val) => {
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
        <h1>EXHIBITION</h1>
        <WiStars />
      </div>
      <div >
        {/* ANALYTICS */}

        <div className={styles.add}>
          <h2>EXHIBITION LIST</h2>
          <table className={styles.reportTable} id="reportByClinic">
            <thead>
              <tr>
                  <th className={styles.reportTh}>No</th>
                  <th className={styles.reportTh}>Exhibition</th>
                  <th className={styles.reportTh}>Description</th>
                  <th className={styles.reportTh}>Status</th>
                  <th className={styles.reportTh}>Action</th>
              </tr>
            </thead>
            <tbody>
              {exhibition.map((val) => {
                            return(
                                <tr key={val.uuid}>
                                    <td className={styles.listItem}>{++i}</td>
                                    <td className={styles.listItem}>{val.title}</td>
                                    <td className={styles.listItem}>{val.description}</td>
                                    <td className={styles.listItem}>{val.status}</td>
                                    <td className={styles.listItemAction}>
                                    <Link className={styles.link} to={`/exhibition/edit/${val.uuid}`} state={{exhibit: val}}>
                                    <button  className={styles.buttonEdit}>
                                        <MdOutlineEdit className={styles.listIcon}/>
                                        Edit
                                    </button>
                                    </Link>
                                    <button  className={styles.buttonDelete}
                                    onClick={(e)=>{deleteExhibition(e, val.uuid)}} >
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
    </main>
  );
};

export default ExhibitionList;
