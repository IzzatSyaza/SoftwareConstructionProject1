import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import Axios from "axios";
import { useAuth } from "./Context/Auth";
import { useSelector } from 'react-redux'


// import Container2 from "./components/Container2/Container2";

import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Campaings from "./components/Campaigns/Campaings";
import Team from "./components/Team/Team";
import AddAdmin from "./pages/admin/addAdmin/addAdmin";
import NavContext from "./Context/NavContext";
import AddExhibition from "./pages/exhibition/addExhibition/addExhibition";
import Login from "./pages/login/login";
import AddJury from "./pages/jury/AddJury/addJury";
import SchoolRegister from "./pages/school/SchoolRegister/SchoolRegister";
import AdminList from "./pages/admin/addminList/adminList";
import ExhibitionList from "./pages/exhibition/exhibitionList/exhibitionList";
import PrivateRouteAdmin from "./components/PrivateRoute/PrivateRouteAdmin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SchoolList from "./pages/school/SchoolList/SchoolList";
import JuryList from "./pages/jury/JuryList/JuryList";
import { AuthProvider } from "./Context/Auth";
import { RequireAuth } from "./components/Auth/RequireAuth";
import AddCriteria from "./pages/criteria/addcriteria/addCriteria";
import InsertMark from "./pages/mark/insertMark";
import ExhibitionJudge from "./pages/exhibition/exhibitionJudge/exhibitionJudge";
import EditAdmin from "./pages/admin/editAdmin/editAdmin";
import EditJury from "./pages/jury/editJury/editJury";
import EditExhibition from "./pages/exhibition/editExhibition/editExhibition";
import SchoolEdit from "./pages/school/SchoolEdit/SchoolEdit";
import FileUpload from "./pages/try/upload/FileUpload";
import ExhibitionRegister from "./pages/exhibition/registerExhibition/ExhibitionRegister";
import Player from "./pages/try/player/Player";
import DashboardJury from "./pages/dashboard/DashboardJury/DashboardJury";
import DashboardSchool from "./pages/dashboard/DashboardSchool/DashboardSchool";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin/DashboardAdmin";
import ExhibitionView from "./pages/exhibition/exhibitionView/exhibitionView";
import MaterialLink from "./pages/material/materialLink/MaterialLink";
import MaterialDisplay from "./pages/material/display/materialDisplay";
import ExhibitionAdmin from "./pages/exhibition/exhibitionAdmin/exhibitionAdmin";
import Assign from "./pages/assign/list/assign";
import AssignJury from "./pages/assign/assignjury/assignJury";
import MaterialUpload from "./pages/material/materialUpload/MaterialUpload";
import Abstract from "./pages/material/abstract/Abstract";
import Poster from "./pages/material/poster/Poster";
import ListLink from "./pages/material/link/ListLink";
import DisplayMark from "./pages/mark/displayMark/DisplayMark";
import SelfEvaluate from "./pages/self-evaluate/insert/SelfEvaluate";
import DisplayEvaluation from "./pages/self-evaluate/display/DisplayEvaluation";
import CriteriaList from "./pages/criteria/criteriaList/criteriaList";
import EditCriteria from "./pages/criteria/editcriteria/editCriteria";
import MaterialList from "./pages/material/materialList/materialList";
import MaterialEdit from "./pages/material/materialEdit/materialEdit";
import PersistLogin from "./components/Persist/PersistLogin";
import CR from "./pages/try/criterriarubric/CR";
import AddCR from "./pages/criteriarubric/add/addCR";
import { Home } from "./pages/home/home";
import EditCR from "./pages/criteriarubric/edit/editCR";
import AllAsign from "./pages/assign/allasign/allAsign";
import EditAssign from "./pages/assign/edit/editAssign";
import ParticipantList from "./pages/participant/list/participantList";
import ViewParticipant from "./pages/participant/view/viewParticipant";
import PosterList from "./pages/material/listPoster/posterList";
import Profile from "./pages/profile/root/profile";

const ROLES = {
  user1 : "ADMIN",
  user2 : "JURY",
  user3 : "SCHOOL"
}
Axios.defaults.withCredentials = true;


function App() {
  const state=useSelector(state => state.UserReducer)

  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const auth =useAuth()
  const navigate = useNavigate();
  const location = useLocation();


  const [user, setUser] = useState({
    username: "",
    uuid: 0,
    user_type: "",
    status: false,
  });

//   useEffect(() => {
//     Axios.get("http://localhost:3001/user/auth",).then((response) => {
//         if(response.data.err){
//         alert(response.data.err);
//         }
//         else{
//         setUser({ 
//             username: response.data.username,
//             user_type: response.data.user_type, 
//             uuid: response.data.uuid, 
//             // accessToken: response.data.accessToken
//          });
//          console.log("bich")
        
//         }
//     })
//     .catch(err =>{
//         console.log(err);
//     })
//     // console.log(state)
// },[]);


  return (
    <div className="App">
      {/* <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar />}
          content={
            <Routes>
              <Route path="*" element={<main>NOT FOUND</main>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/campaings" element={<Campaings />} />
              <Route path="/team" element={<Team />} />
              <Route path="/messages" element={<main>Messages</main>} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route path="/addExhibition" element={<AddExhibition />} />
              <Route path="/addJury" element={<AddJury />} />
              <Route path="/addSchool" element={<AddSchool />} />
              <Route path="/adminList" element={<AdminList />} />
              <Route path="/exhibitionList" element={<ExhibitionList />} />


              <Route path="/login" element={<Login />} />


            </Routes>
          }
        />
      </NavContext.Provider> */}
      <AuthProvider >
      <Routes>
          {/* PUBLIC PAGES */}
          <Route path="*" element={<main>NOT FOUND</main>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SchoolRegister />} />
          
          {/* ADMIN PRIVATE PAGE */}
          <Route element={<PersistLogin/>}>
          <Route path="/dashboardAdmin" element={
            <RequireAuth allowUser={[ROLES.user1]}><DashboardAdmin/></RequireAuth>}/>
          <Route path="/addAdmin" element={
            <RequireAuth allowUser={[ROLES.user1]}><AddAdmin/></RequireAuth> }/>
          <Route path="/addJury" element={
            <RequireAuth allowUser={[ROLES.user1]}><AddJury/></RequireAuth> }/>
          <Route path="/adminList" element={
            <RequireAuth allowUser={[ROLES.user1]}><AdminList/></RequireAuth> }/>
          <Route path="/schoolList" element={
            <RequireAuth allowUser={[ROLES.user1]}><SchoolList/></RequireAuth> }/>
          <Route path="/juryList" element={
            <RequireAuth allowUser={[ROLES.user1]}><JuryList/></RequireAuth> }/>
          <Route path="/addExhibition" element={
            <RequireAuth allowUser={[ROLES.user1]}><AddExhibition/></RequireAuth> }/>
          <Route path="/exhibitionList" element={
            <RequireAuth allowUser={[ROLES.user1]}><ExhibitionList/></RequireAuth> }/>
          <Route path="/addCriteria/:exId" element={
            <RequireAuth allowUser={[ROLES.user1]}><AddCriteria/></RequireAuth> }/>
          <Route path="/editAdmin/:adminId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditAdmin/></RequireAuth> }/>
          <Route path="/editJury/:juryId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditJury/></RequireAuth> }/>
          <Route path="/exhibition/edit/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditExhibition/></RequireAuth> }/>
          <Route path="/school/edit/:schoolId" element={
            <RequireAuth allowUser={[ROLES.user1]}><SchoolEdit/></RequireAuth> }/>
          <Route path="/exhibition/admin/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><ExhibitionAdmin/></RequireAuth> }/>
          <Route path="/exhibition/assign/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><Assign/></RequireAuth> }/>
          <Route path="/exhibition/assign/jury/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user1]}><AssignJury/></RequireAuth> }/>
          <Route path="/exhibition/report/mark/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><DisplayMark/></RequireAuth> }/>  
          <Route path="/exhibition/report/evaluation/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><DisplayEvaluation/></RequireAuth> }/>  
          <Route path="/exhibition/criteria/list/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><CriteriaList/></RequireAuth> }/>
          <Route path="/exhibition/criteria/edit/:criteriaId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditCriteria/></RequireAuth> }/>
          <Route path="/rubric" element={
            <RequireAuth allowUser={[ROLES.user1]}><CR/></RequireAuth> }/>
          <Route path="/exhibition/criteria/rubric/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><AddCR/></RequireAuth> }/>
          <Route path="/exhibition/criteria/rubric/edit/:exhibitId/:crId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditCR/></RequireAuth> }/>
          <Route path="/exhibition/assign/list/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><AllAsign/></RequireAuth> }/>
          <Route path="/exhibition/assign/edit/:exhibitId/:assignId" element={
            <RequireAuth allowUser={[ROLES.user1]}><EditAssign/></RequireAuth> }/>
          <Route path="/exhibition/participant/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user1]}><ParticipantList/></RequireAuth> }/>
          <Route path="/exhibition/participant/view/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user1]}><ViewParticipant/></RequireAuth> }/>
          
            
            
          
          
          <Route path="/player" element={
            <RequireAuth allowUser={[ROLES.user1]}><Player/></RequireAuth> }/>


          {/* JURY PRIVATE PAGE */}
          <Route path="/dashboardJury" element={
            <RequireAuth allowUser={[ROLES.user2]}><DashboardJury/></RequireAuth>}/>
          <Route path="/exhibition/judge/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user2]}><ExhibitionJudge/></RequireAuth>}/>
          <Route path="/exhibition/mark/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user2]}><InsertMark/></RequireAuth> }/>
          <Route path="/exhibition/material/display/:participantId" element={
            <RequireAuth allowUser={[ROLES.user2]}><MaterialDisplay/></RequireAuth> }/>
          <Route path="/exhibition/material/abstract/:participantId" element={
            <RequireAuth allowUser={[ROLES.user2]}><Abstract/></RequireAuth> }/>
          <Route path="/exhibition/material/poster/:participantId" element={
            <RequireAuth allowUser={[ROLES.user2]}><Poster/></RequireAuth> }/>
          <Route path="/exhibition/material/link/:participantId" element={
            <RequireAuth allowUser={[ROLES.user2]}><ListLink/></RequireAuth> }/>
          {/* <Route path="/profile" element={
            <RequireAuth allowUser={[ROLES.user2]}><Profile/></RequireAuth> }/> */}

            {/* SCHOOL PRIVATE PAGE */}
          <Route path="/dashboardSchool" element={
            <RequireAuth allowUser={[ROLES.user3]}><DashboardSchool/></RequireAuth>}/>
          <Route path="/exhibitionRegister/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user3]}><ExhibitionRegister/></RequireAuth> }/>
          <Route path="/exhibition/view/:exhibitId" element={
            <RequireAuth allowUser={[ROLES.user3]}><ExhibitionView/></RequireAuth> }/>
          <Route path="/fileUpload/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user3]}><MaterialUpload/></RequireAuth> }/>
          <Route path="/material/add/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user3]}><MaterialLink/></RequireAuth> }/>
          <Route path="/material/evalaute/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user3]}><SelfEvaluate/></RequireAuth> }/>
          <Route path="/material/list/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user3]}><MaterialList/></RequireAuth> }/>
          <Route path="/material/edit/:exhibitId/:materialId" element={
            <RequireAuth allowUser={[ROLES.user3]}><MaterialEdit/></RequireAuth> }/>
          <Route path="/poster/list/:exhibitId/:participantId" element={
            <RequireAuth allowUser={[ROLES.user3]}><PosterList/></RequireAuth> }/>
          {/* <Route path="/profile" element={
            <RequireAuth allowUser={[ROLES.user2]}><Profile/></RequireAuth> }/> */}
        </Route>    
      </Routes>
      </AuthProvider>

      
      
    </div>
  );
}

export default App;
