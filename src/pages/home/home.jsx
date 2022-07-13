import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./home.module.scss";

export const Home = () => {
  return (
    
    <>
      {/* <main className={styles.container}> */}
      <div className={styles.welcome}>
        <h1>
          RCE ISKANDAR SYSTEM{/* <MdOutlineWavingHand /> */}
        </h1>
        <div className={styles.wrapBtn}>
          <div className={styles.btn1}>
            <button className={styles.cta}>
              <Link className={styles.link} to="register">REGISTER</Link>
            </button>
          </div>
          <div className={styles.btn2}>
            <button className={styles.cta}>
              <Link className={styles.link} to="login">LOGIN</Link>
            </button>
          </div>
        </div>
      </div>
        {/* <div className={styles.c}>
          <div className={styles.hero}>
            <div className={styles.content}>
              
              <a href="#projects" type="button" className={styles.cta}>Portfolio</a>
            </div>
          </div>
        </div> */}
    {/* </main> */}
      
    </>
  )
}
