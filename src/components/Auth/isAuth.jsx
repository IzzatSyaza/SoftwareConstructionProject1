// import { useContext, createContext, useState, useEffect } from "react";
// import Axios from "axios";

// const PersistContext = createContext(null)

// export const PesistProvider = ({children}) => {
//     const [authState, setAuthState] = useState({
//         username: "",
//         uuid: 0,
//         user_type: "",
//         status: false,
//       });

//       useEffect(() => {
//     Axios.get("http://localhost:3001/user/auth")
//       .then((response) => {
//         if (response.data.error) {
//           console.log(response.data.error)
//         //   setIsLoading(false);
//         } else {
//           setAuthState({
//             username: response.data.username,
//             uuid: response.data.uuid,
//             userType: response.data.user_type,
//             status: response.data.status,
//           });
//           // setIsLoading(false);
//           // console.log("Try auth")
//           // console.log(authState);
//           // console.log("Try auth")
//           // console.log(response.data.username)
//         }
//       });
//   }, []);
      
// }



