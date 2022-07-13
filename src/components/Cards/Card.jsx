import styles from "./Card.module.scss";
import React from 'react'
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { IoChatboxOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { RiRegisteredFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {Link} from "react-router-dom"
import Axios from "axios";
export const Card = ({exhibit, role, uuid}) => {

    //Icon Component
  const Icon = ({ icon, icon_background }) => {
    return (
      <div className={styles.icon} style={{ background: `${icon_background}` }}>
        {icon}
      </div>
    );
  };

  //RANDOM ICON FUNCTION
  const generate_icon = (card_state) => {
    switch (card_state) {
      default:
        return null;
      case "One Time":
        return (
          <Icon
            icon={<IoChatboxOutline />}
            icon_background="rgb(85, 79, 232)"
          />
        );
      case "Off-Track": {
        return (
          <Icon
            icon={<HiOutlineDocumentRemove />}
            icon_background="rgb(232,79,79)"
          />
        );
      }
      case "At Risk": {
        return (
          <Icon
            icon={<CgArrowsExchangeAlt />}
            icon_background="rgb(42, 170, 85)"
          />
        );
      }
    }
  };

  const Tag = ({ background, color, children }) => {
    return (
      <div
        className={styles.tag}
        style={{ background: background, color: color }}
      >
        <h3 className={styles.tag_title}>OPEN</h3>
      </div>
    );
  };

  const generate_tag = (role) => {
    switch (role) {
      default:
        return null;
      case "ADMIN":
        return (
          <Tag background="rgb(209,250,229)" color="rgb(58,158,117)">
            {role}
          </Tag>
        );
      case "JURY": {
        return (
          <Tag background="rgb(255,228,230)" color="rgb(226,35,77)">
            {role}
          </Tag>
        );
      }
      case "SCHOOL": {
        return (
          <Tag background="rgb(254,243,199)" color="rgb(217,119,6)">
            {role}
          </Tag>
        );
      }
    }
  };

  // const checkregister = async (uuid, exuuid) => {
  //   let check = await Axios.get("http://localhost:3001/school/participate",{
  //     params:{
  //       useruuid: uuid,
  //       exhibituuid: exuuid
  //     }
  //   })

  //   if(check.data === true){
  //     return <div>
  //       kolo
  //     </div>
  //   }
  //   else return null
   
  // }
  return (
    <div className={styles.card_container}>
      {/* <div className={styles.icon}>{generate_icon("At Risk")}</div> */}
      <h3 className={styles.card_title}>{exhibit.title}</h3>
      <p>
        {exhibit.description}
      </p>
      <h4 className={styles.date}>
        {exhibit.start_date} <BsArrowRight /> {exhibit.end_date} 
      </h4>
      <div className={styles.view_more}>
        {generate_tag(role)}
        {role === "SCHOOL" ? 
        <Link className={styles.link} to={`/exhibition/view/${exhibit.uuid}`} state={{exhibit: exhibit}}>
            <span>
                Submit <BsArrowRight />
            </span>
        </Link>: role === "JURY"? 
        <Link className={styles.link} to={`/exhibition/judge/${exhibit.uuid}`} state={{exhibit: exhibit}}>
            <span>
                Judge <BsArrowRight />
            </span>
        </Link>: 
        <Link className={styles.link} to={`/exhibition/admin/${exhibit.uuid}`} state={{exhibit: exhibit}}>
            <span>
                Manage <BsArrowRight />
            </span>
        </Link>
        }
        
      </div>
      <div className={styles.message}>
      
      {role === "SCHOOL"? 
        <Link className={styles.link} to={`/exhibitionRegister/${exhibit.uuid}`} >
        <button className={styles.buttonAddRemove} disabled>
            <span>
              <RiRegisteredFill /> REGISTER
            </span>
        </button>
        </Link>: null}
      
      </div>
    </div>
  )
}
