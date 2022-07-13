import React, {useState, useEffect} from "react";
import styles from "./FileUpload.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import Progress from "../../../components/FileUpload/FileProgress/Progress";


const FileUpload = () => {
  const [abstract, setAbstract] = useState("");
  const [activity, setActivity] = useState("");
//   const [file, setFile] = useState("");

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File...');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // setFormErrors(validate());
//     // setIsSubmit(true);
//   }

const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('try', "hello try");


    try {
      const res = await Axios.post("http://localhost:3001/exhibition/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
      alert("papa")

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
        alert(err.response.data.msg)
      } else {
        setMessage(err.response.data.msg);
        alert(err.response.data.msg)

      }
      setUploadPercentage(0)
    }
  };

//   const validate = () => {
//     const errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!abstract){
//         errors.schoolName = "School Name is required!";
//     }

//     if (!activity){
//         errors.address = "Address is required!";
//     }

//     if (!file){
//         errors.contact = "Contact No is required!";
//     }
    

//     return errors
// }


// useEffect(() => {
//   console.log(formErrors);
//   if(Object.keys(formErrors).length === 0 && isSubmit){
//       Axios.post("http://localhost:3001/school/register", {
//         // school_name: schoolName,
//         // address: address,
//         // contact: contact,

//       }).then((res) => {
//           console.log(res);
//           alert(res.data.message);
//           // history.push("/ClinicList");

//       }).catch(err =>{
//           alert(err);
//       })
//   }
// }, [formErrors])
  

  return (
    <div className={styles.container}>
      <main>
        <div>
          <div className={styles.add}>
            <h2>FILE UPLOAD TEST</h2>
            <form className={styles.addExhibitionForm} onSubmit={onSubmit}>
              {/* <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Abstract</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={schoolName} 
                  placeholder="Sekolah Kebangsaan Sungai Isap" 
                  onChange={(event) =>{
                    setAbstract(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.schoolName}</p>
              </div> */}

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Upload FILE</label>
                  <input className={styles.inputfile} type="file" id="customFile" 
                  onChange={onChange}/>
                  <label htmlFor="customFile">
                      {filename}
                  </label>
                  <p className={styles.errorText}>{formErrors.address}</p>
              </div>
              <Progress percentage={uploadPercentage}/>


              <button className={styles.createButton}>Upload</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileUpload;
