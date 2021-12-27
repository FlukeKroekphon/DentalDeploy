
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, Redirect } from "react-router-dom";

import React, { createContext, useEffect, useState } from 'react';

import Login from './pages/signin/login.js';
import StudentDashboard from './pages/reservation/student/dashboard.js';
import StudentLimt from './pages/reservation/student/limit.js';
import StudentRes from './pages/reservation/student/Reservation.js';
import StudentHistory from './pages/reservation/student/history.js';
import StudentProfile from './pages/reservation/student/Profile.js';
import StudentAdminDashboard from './pages/reservation/studentadmin/dashboard.js';
import StudentAdminHistory from './pages/reservation/studentadmin/history.js';
import StudentAdminLimitCase from './pages/reservation/studentadmin/caselimit.js';
import StudentAdminReservation from './pages/reservation/studentadmin/reservation.js';
import Adminconfirm from './pages/reservation/Admintool/Adminconfirm.js';
import ToolModal from './pages/reservation/student/modal/tool.js';
import TeacherDashboard from './pages/reservation/teacher/dashboard.js';
import TeacherSelectWork from './pages/reservation/teacher/selectwork.js';
import TeacherHistory from './pages/reservation/teacher/history.js';
import TeacherProfile from './pages/reservation/teacher/profile.js';
import AdminStudent from './pages/reservation/Admin/student.js';
import AdminStudentAdmin from './pages/reservation/Admin/studentAdmin.js';
import AdminUnit from './pages/reservation/Admin/unit.js';
import AdminTeacher from './pages/reservation/Admin/teacher.js';
import Adminconfirmfromadmin from './pages/reservation/Admintool/Adminconfirmfromadmin.js';


const AuthContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState([]);

  const [studentYear, setStudentYear] = useState(0)

  const [currentDate, setCurrentDate] = useState([]);
  const [currentMonth, setMonth] = useState([]);
  const [currentYear, setYear] = useState([]);

  useEffect(() => {
    checkCurrentDate();
    getMounth();
    checkYear();
    console.log('User :', user, ' Status :', loginStatus);
  }, [user])

  function checkCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log("Today :", today)
    setCurrentDate(today)
  }

  async function getMounth() {
    let a = new Date();
    let d = a.getMonth();
    return await setMonth(d + 1)
  }

  function checkYear() {
    let a = new Date();
    let year = a.getFullYear();
    setYear(year)
  }

  return (
    <div className="App">

      <AuthContext.Provider value={{ user, setUser, loginStatus, setLoginStatus, limit, setLimit, studentYear, setStudentYear, currentDate, currentMonth, currentYear }}>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/StudentDashboard" render={() => loginStatus === true ? <StudentDashboard /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentRes" render={() => loginStatus === true ? <StudentRes /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentLimt" render={() => loginStatus === true ? <StudentLimt /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentHistory" render={() => loginStatus === true ? <StudentHistory /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentProfile" render={() => loginStatus === true ? <StudentProfile /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentAdminDashboard" render={() => loginStatus === true ? <StudentAdminDashboard /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentAdminReservation" render={() => loginStatus === true ? <StudentAdminReservation /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentAdminHistory" render={() => loginStatus === true ? <StudentAdminHistory /> : (<Redirect to="/" />)}></Route>
          <Route path="/StudentAdminLimitCase" render={() => loginStatus === true ? <StudentAdminLimitCase /> : (<Redirect to="/" />)}></Route>
          <Route path="/Adminconfirm" render={() => loginStatus === true ? <Adminconfirm /> : (<Redirect to="/" />)}></Route>
          <Route path="/ToolModal" render={() => loginStatus === true ? <ToolModal /> : (<Redirect to="/" />)}></Route>
          <Route path="/TeacherDashboard" render={() => loginStatus === true ? <TeacherDashboard /> : (<Redirect to="/" />)}></Route>
          <Route path="/TeacherSelectWork" render={() => loginStatus === true ? <TeacherSelectWork /> : (<Redirect to="/" />)}></Route>
          <Route path="/TeacherHistory" render={() => loginStatus === true ? <TeacherHistory /> : (<Redirect to="/" />)}></Route>
          <Route path="/TeacherProfile" render={() => loginStatus === true ? <TeacherProfile /> : (<Redirect to="/" />)}></Route>
          <Route path="/AdminStudent" render={() => loginStatus === true ? <AdminStudent /> : (<Redirect to="/" />)}></Route>
          <Route path="/AdminStudentAdmin" render={() => loginStatus === true ? <AdminStudentAdmin /> : (<Redirect to="/" />)}></Route>
          <Route path="/AdminUnit" render={() => loginStatus === true ? <AdminUnit /> : (<Redirect to="/" />)}></Route>
          <Route path="/AdminTeacher" render={() => loginStatus === true ? <AdminTeacher /> : (<Redirect to="/" />)}></Route>
          <Route path="/Adminconfirmfromadmin" render={() => loginStatus === true ? <Adminconfirmfromadmin /> : (<Redirect to="/" />)}></Route>
          <Route path="/:id">
            <h1 style={{ color: 'black' }}>Error 404 page not found</h1>
          </Route>
        </Switch>
      </AuthContext.Provider>
    </div >
  );
}
export { AuthContext };
export default App;
