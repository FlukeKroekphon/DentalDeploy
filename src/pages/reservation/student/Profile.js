import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import { AuthContext } from '../../../App';
import axios from "axios";
const StudentProfile = () => {

    const { user } = useContext(AuthContext);
    const [details, setDetials] = useState([]);

    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])

    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/details/find/notnull").then((item) => {
            console.log("data :", item.data)
            return filterDetails(item.data);
        });
    }


    const filterDetails = (item) => {
        const res = item.filter((item) => {
            return (item.name === user)
        })
        setDetials(res);
        console.log("details :", res)
    }




    return (
        <div style={{ backgroundColor: '#ededed', minHeight: '1080px' }}>
            <nav style={{ background: '#0080ff' }}>
                <div style={{ color: '#ffff', paddingLeft: '50px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <h1 className="text-justify">Mae Fah Luang University Dental Clinic</h1>
                </div>
            </nav>
            <Navbar style={{ backgroundColor: 'white', boxShadow: '1px 1px 10px #d6d6d6' }}>
                {/* style={{ backgroundColor: 'rgba(21, 101, 192, 0.3)' }} */}
                <Container >
                    <Nav className="me-auto">
                        <Nav.Link style={{ color: '#0080ff', fontWeight: 'bold', fontSize: '18px' }} as={Link} to="/StudentDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link style={{ color: '#0080ff', fontWeight: 'bold', fontSize: '18px' }} as={Link} to="/StudentRes">จองการทำงาน</Nav.Link>
                        <Nav.Link style={{ color: '#0080ff', fontWeight: 'bold', fontSize: '18px' }} as={Link} to="/StudentHistory">ประวัติ</Nav.Link>
                        {/* <Nav.Link style={{ color: '#0080ff', fontWeight: 'bold', fontSize: '18px' }} as={Link} to="/StudentProfile">บัญชี</Nav.Link> */}
                        <Nav.Link style={{ color: '#E05701', fontWeight: 'bold', fontSize: '18px' }} as={Link}>ชื่อผู้ใช้งาน : {user.first_name}</Nav.Link>
                        <Nav.Link style={{ borderRadius: '10px', color: '#0080ff', marginLeft: '350px', fontWeight: 'bold', fontSize: '20px' }} as={Link} to="/">ออกจากระบบ</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Container style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', minHeight: '700px', minWidth: '1500px' }}>
                <h1>รายละเอียดบัญชี</h1>
                {details.map((item) => {
                    return <div key={item.id}>
                        <br />
                        <Card
                            style={{ width: '21rem', marginLeft: 'auto', marginRight: 'auto' }}
                            className="mb-2"
                        >
                            <Card.Header style={{ backgroundColor: '#d60000', color: 'white' }}> วันที่: {item.date}</Card.Header>
                            <Card.Body style={{ backgroundColor: '#fa4141' }}>

                                <Card.Text>
                                    <p style={{ color: 'yellow' }}>ต้องเปลี่ยน API เป็นของ name ของนี้ใช้ของ details </p>
                                    <Card.Title>Name: {item.name} &nbsp; &nbsp; Year: {item.studentyear} </Card.Title>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                })}
            </Container>
        </div >
    )
}
export default StudentProfile;