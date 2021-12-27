import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from "axios";
import { Nav, Container } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../../App';
import { BsSearch } from "react-icons/bs";
import TeacherSelectWork from './selectwork';


const TeacherDashboard = () => {
    const { user, setStudentYear, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    let history = useHistory();

    const [details, setDetails] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [detailsFordate, setDetailsForDate] = useState([]);
    const [year2, setYear2] = useState();
    const [year3, setYear3] = useState();
    const [year4, setYear4] = useState();
    const [year5, setYear5] = useState();

    const [year3details, setYear3details] = useState();
    const [year4details, setYear4details] = useState();
    const [year5details, setYear5details] = useState();


    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])

    useEffect(() => {
        checkYear();
        console.log("year 2 :", year2, " year 3 :", year3, " year 4 :", year4, " year 5 :", year5)
    }, [details])


    async function getDetails() {
        return await axios.get("http://10.6.21.41:8080/details/find/teachernull").then((item) => {
            console.log("Limit :", item.data)
            let findMonth = item.data;
            let filterMonth = findMonth.filter((item) => {
                let a = item.date;
                let thisDate = currentDate.slice(8)
                let digitRealDate = (a).slice(8)
                // console.log("วันที่ทะไหย่ :", thisDatte)
                let digitData = (a).slice(5, 7)
                let parsed = parseInt(digitData)

                let getYear = (a).slice(0, 4)
                return (((parsed >= currentMonth) && (digitRealDate >= thisDate)) || (getYear > currentYear))
            })
            return setDetails(filterMonth);
        });
    }

    async function onChangeSearch(e) {

        await axios.get("http://10.6.21.41:8080/details/find/teachernull").then((item) => {
            console.log("new Limit ==> :", item.data)
            let findMonth = item.data;
            let filterMonth = findMonth.filter((item) => {
                let a = item.date;
                let thisDate = currentDate.slice(8)
                let digitRealDate = (a).slice(8)
                // console.log("วันที่ทะไหย่ :", thisDatte)
                let digitData = (a).slice(5, 7)
                let parsed = parseInt(digitData)

                let getYear = (a).slice(0, 4)
                return (((parsed >= currentMonth) && (digitRealDate >= thisDate)) || (getYear > currentYear))
            })
            return setDetailsForDate(filterMonth);
        });

        console.log("Change Date :", e.target.value)
        setSearchDate(e.target.value)
    }

    function Searching() {
        console.log("Searching :", searchDate)
        const checking = detailsFordate.filter((item) => {
            return item.date === searchDate
        })
        console.log("Filter Date", checking)
        setDetails(checking)
    }

    function eliminateDuplicates(arr) {
        console.log("Clinic List ==>", arr)
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        console.log("After sort :", out)
        return out;
    }

    function findClinic(data) {
        let Arr = [];
        for (let i = 0; i < data.length; i++) {
            let set = data[i].clinic
            Arr.push(set);
        }
        return Arr;
    }


    function checkYear() {

        let b = details.filter((item) => {
            return (item.studentyear === "3")
        })
        let arrB = findClinic(b)
        // console.log(arrB)
        setYear3details(eliminateDuplicates(arrB))


        let c = details.filter((item) => {
            return (item.studentyear === "4")
        })
        let arrC = findClinic(c)
        // console.log(arrC)
        setYear4details(eliminateDuplicates(arrC))


        let d = details.filter((item) => {
            return (item.studentyear === "5")
        })
        let arrD = findClinic(d)
        // console.log(arrD)
        setYear5details(eliminateDuplicates(arrD))



        let bb = b.length;
        let cc = c.length;
        let dd = d.length;

        setYear3(bb);
        setYear4(cc);
        setYear5(dd);
    }

    return (
        <div style={{ backgroundColor: '#ededed', minHeight: '1080px' }}>
            {console.log("rerender")}
            <nav style={{ background: '#0080ff' }}>
                <div style={{ color: '#ffff', paddingLeft: '50px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <h1 className="text-justify">Mae Fah Luang University Dental Clinic</h1>
                </div>
            </nav>

            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'white' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: '80px' }} className="mr-auto">
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/TeacherDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/TeacherSelectWork">การเลือกตรวจงาน</Nav.Link>
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/TeacherHistory">ประวัติ</Nav.Link>
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#424242', fontSize: '23px' }} as={Link}>ชื่อผู้ใช้งาน : {user.first_name}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ borderRadius: '10px', color: '#0080ff', fontSize: '23px', marginRight: '80px' }} as={Link} to="/">ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



            <br />
            <div className="PaddingDiv">
                <Container style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', minHeight: '700px', maxWidth: '1500px' }}>
                    <h1 style={{ color: '#198CFF' }}>จำนวนนักศึกษาที่รออนุมัติ</h1>
                    {/* <center>
                        <label style={{ fontSize: '18px' }}>ทั้งหมด {year3 + year4 + year5} รายการ</label>
                    </center> */}
                    {/* <input
                        style={{ fontSize: '18px' }}
                        type="date"
                        min={currentDate}
                        className="searchTerm"
                        id="input_text"
                        placeholder="ค้นหาวันที่"
                        onChange={onChangeSearch}
                    >
                    </input>
                    <button onClick={() => Searching()} type="submit" className="searchButton">
                        <BsSearch />
                    </button> */}
                    <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>


                        <label style={{ marginTop: '10px', fontSize: '18px' }}>นักศึกษาชั้นปีที่ 3 จำนวน {year3} รายการ</label>
                        <ProgressBar
                            onClick={() => { setStudentYear(3); history.push('/TeacherSelectWork') }}
                            style={{ height: '30px', fontSize: '18px', cursor: 'pointer' }}>
                            {year3details?.map((item, index) => {
                                // return console.log("index :", item)
                                let a = ["primary", "secondary", "success", "warning", "danger", "info", "light", "dark"]
                                return <ProgressBar variant={a[index]} now={10} max={100} label={item} key={index} />
                            })}
                        </ProgressBar>
                        <label style={{ marginTop: '10px', fontSize: '18px' }}>นักศึกษาชั้นปีที่ 4 จำนวน {year4} รายการ</label>
                        <ProgressBar
                            onClick={() => { setStudentYear(4); history.push('/TeacherSelectWork') }}
                            style={{ height: '30px', fontSize: '18px', cursor: 'pointer' }}>
                            {year4details?.map((item, index) => {
                                // return console.log("index :", item)
                                let a = ["primary", "secondary", "success", "warning", "danger", "info", "light", "dark"]
                                return <ProgressBar variant={a[index]} now={10} max={100} label={item} key={index} />
                            })}
                        </ProgressBar>
                        <label style={{ marginTop: '10px', fontSize: '18px' }}>นักศึกษาชั้นปีที่ 5 จำนวน {year5} รายการ</label>
                        <ProgressBar
                            onClick={() => { setStudentYear(5); history.push('/TeacherSelectWork') }}
                            style={{ height: '30px', fontSize: '18px', cursor: 'pointer' }}>
                            {year5details?.map((item, index) => {
                                // return console.log("index :", item)
                                let a = ["primary", "secondary", "success", "warning", "danger", "info", "light", "dark"]
                                return <ProgressBar variant={a[index]} now={10} max={100} label={item} key={index} />
                            })}
                        </ProgressBar>
                    </div>
                </Container >
            </div>
        </div >
    )
}
export default TeacherDashboard;