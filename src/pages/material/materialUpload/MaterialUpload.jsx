import React, {useState, useEffect} from "react";
import styles from "./materialUpload.module.scss";
import Axios from "axios";
import Progress from "../../../components/FileUpload/FileProgress/Progress";
import { useAuth } from "../../../Context/Auth";
import { useNavigate, useParams, useLocation } from "react-router-dom";



const MaterialUpload = () => {
  const auth = useAuth();
  const {exhibitId, participantId} = useParams();
  const location = useLocation();
  const {exhibit} = location.state;

  const navigate = useNavigate();

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File...');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [video, setVideo] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [data, setData] = useState([]);



  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('particpantuuid', participantId);
    formData.append('exhibitionuuid', exhibitId);
    formData.append('videolink', video);
    setData(formData)
    setFormErrors(validate());
    setIsSubmit(true);


    // try {
    //   const res = await Axios.post("http://localhost:3001/school/videoposter", formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     onUploadProgress: progressEvent => {
    //       setUploadPercentage(
    //         parseInt(
    //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         )
    //       );
    //     }
    //   });
      
    //   // Clear percentage
    //   setTimeout(() => setUploadPercentage(0), 10000);

    //   const { fileName, filePath } = res.data;

    //   setUploadedFile({ fileName, filePath });

    //   setMessage('File Uploaded');
    //   alert("ok")

    // } catch (err) {
    //   if (err.response.status === 500) {
    //     setMessage('There was a problem with the server');
    //     alert(err.response.data.msg)
    //   } else {
    //     setMessage(err.response.data.msg);
    //     alert(err.response.data.msg)

    //   }
    //   setUploadPercentage(0)
    // }
  };

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (!file){
      errors.poster = "Poster required!";
  }
    if (!video){
        errors.video = "Video Link is required!";
    }
    if(!video.match(p)){
      errors.video = "Not youtube video!";
    }
    

    return errors
}


useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/school/videoposter", data, {
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
      })
      .then((res) => {
          console.log(res);
          alert(res.data.message);
          // history.push("/ClinicList");

      }).catch(err =>{
          alert(err);
      })
  }
  setIsSubmit(false);
}, [formErrors])
  

  return (
      <main>
        <div>
          <div className={styles.add}>
            <h2>Poster and Video</h2>
            <form className={styles.addExhibitionForm} onSubmit={onSubmit}>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Upload FILE</label>
                  <input className={styles.inputfile} type="file" id="customFile" 
                  onChange={onChange}/>
                  <label htmlFor="customFile">
                      {filename}
                  </label>
                  <p className={styles.errorText}>{formErrors.poster}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Video Link</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={video} 
                  placeholder="link video" 
                  onChange={(event) =>{
                    setVideo(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.video}</p>
              </div>
              <Progress percentage={uploadPercentage}/>

              <button className={styles.createButton}>Upload</button>
            </form>
            {/* {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>File Upload</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null} */}
          </div>
        </div>
      </main>
  );
};

export default MaterialUpload;
