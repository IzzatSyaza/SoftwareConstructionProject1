import React, { useRef, useEffect, useCallback } from 'react';
import styles from "./Modal.module.scss";
import { MdClose } from 'react-icons/md';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';

// import Controls from "./controls/Controls";
// import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles(theme => ({
//     dialogWrapper: {
//         padding: theme.spacing(2),
//         position: 'absolute',
//         top: theme.spacing(5)
//     },
//     dialogTitle: {
//         paddingRight: '0px'
//     }
// }))

export const Modal = ({popup, setPopup, children}) => {
  const modalRef = useRef();
//   const { title, children, openPopup, setOpenPopup } = props;
//   const classes = useStyles();



const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && popup) {
        setPopup(false);
        console.log('I pressed');
      }
    },
    [setPopup, popup]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const closePopup = e => {
    if (modalRef.current === e.target) {
        setPopup(false);
    }
  };
 

  return (popup)? (
    <>
        {/* <Dialog open={openPopup} maxWidth="md" classes={{ paper: styles.dialogWrapper }}>
            <DialogTitle className={styles.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <button
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                    </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog> */}
        <div className={styles.popup} onClick={closePopup} ref={modalRef}>
            <div className={styles.popinner}>
                <button className={styles.closebtn} onClick={()=>setPopup(false)}><MdClose className={styles.icon}/></button>
                {children}
            </div>
        </div>
    </>
  ): null
}
