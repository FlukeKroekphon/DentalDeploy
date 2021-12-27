import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../../App';
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import MaterialTable from "material-table";


const StudentDashboard = () => {

    const { user, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    const [detailsFordate, setDetailsForDate] = useState([]);
    const [realColor, setColor] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        getDetails();
        console.log("Current date :", currentDate)
        console.log("User :", user)
    }, [user])

    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/details/find/teacherOnlyNull").then((item) => {
            console.log("data :", item.data)
            let findMonth = item.data;
            let filterMonth = findMonth.filter((item) => {
                let a = item.date;
                let thisDate = currentDate.slice(8)
                let digitRealDate = (a).slice(8)
                let digitData = (a).slice(5, 7)
                let parsed = parseInt(digitData)

                let getYear = (a).slice(0, 4)
                return (((parsed >= currentMonth) && (digitRealDate >= thisDate)) || (getYear > currentYear))
            })
            return filterDetails(filterMonth);
        });
    }

    //ตอนเช็คจริงๆน่าจะใช้ E-mail เผื่อมีชื่อซ้ำ

    const filterDetails = (item) => {
        const res = item.filter((item) => {
            return (item.name === user.first_name)
        })

        console.log("details :", res)
        let filteredData = []
        res.map(item => {
            return filteredData.push({ uniqueID: item.uniqueID, name: item.name, year: item.studentyear, date: item.date, time: item.time, unit: item.unit, clinic: item.clinic, worktype: item.worktype, patient: item.patient, teacher: item.teacher, dn: item.dn, hn: item.hn, toolStatus: item.toolStatus })
        })

        setData(filteredData);
    }

    async function onChangeSearch(e) {

        await axios.get("http://10.6.21.41:8080/details/find/teacherOnlyNull").then((item) => {
            console.log("new Limit ==> :", item.data)
            let findMonth = item.data;
            let filterMonth = findMonth.filter((item) => {
                let a = item.date;
                let thisDate = currentDate.slice(8)
                let digitRealDate = (a).slice(8)
                let digitData = (a).slice(5, 7)
                let parsed = parseInt(digitData)
                return (parsed >= currentMonth && digitRealDate >= thisDate)
            })
            return setDetailsForDate(filterMonth);
        });

        const res = detailsFordate.filter((item) => {
            return (item.name === user.first_name)
        })

    }





    return (
        <div style={{ backgroundColor: '#ededed', minHeight: '1080px', maxWidth: '100%' }}>
            <nav style={{ background: '#0080ff' }}>
                <div style={{ color: '#ffff', paddingLeft: '50px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <h1 className="text-justify">Mae Fah Luang University Dental Clinic</h1>
                </div>
            </nav>

            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'white' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: '80px' }} className="mr-auto">
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/StudentDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentRes">จองการทำงาน</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentHistory">ประวัติ</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link}>ชื่อผู้ใช้งาน : {user.first_name}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ borderRadius: '10px', color: '#0080ff', fontSize: '23px', marginRight: '80px' }} as={Link} to="/">ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="PaddingDiv">
                <br />
                <Container style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', minHeight: '700px', maxWidth: '1500px' }}>
                    <h1 style={{ color: '#198CFF', fontWeight: 'bold', marginBottom: '10px' }}>การจองที่อยู่ระหว่างการดำเนินการ</h1>

                    <MaterialTable
                        title="Mae Fah Luang University Dental Clinic"
                        columns={[
                            {
                                title: 'วันที่', field: 'date', type: 'date', cellStyle: {
                                    minWidth: 140,
                                },
                            },
                            {
                                title: 'ช่วงเวลา', field: 'time', cellStyle: {
                                    minWidth: 125,
                                },
                            },
                            {
                                title: 'คลินิก', field: 'clinic', cellStyle: {
                                    minWidth: 30,
                                },
                            },
                            {
                                title: 'ประเภทงาน', field: 'worktype', cellStyle: {
                                    minWidth: 145,
                                },
                            },
                            {
                                title: 'ผู้ป่วย', field: 'patient', cellStyle: {
                                    minWidth: 100,
                                },
                            },
                            {

                                title: 'สถานะการจองเครื่องมือ', field: 'toolStatus', cellStyle: {
                                    minWidth: 239, color: "black"
                                },
                            }, {
                                title: 'สถานะการจอง Unit', field: 'teacher', cellStyle: {
                                    minWidth: 213,
                                }, render: (rowData) =>
                                    rowData && (
                                        <Button
                                            variant="warning"
                                            style={{ color: 'black', align: 'center' }}
                                        >
                                            รอการดำเนินการ
                                        </Button>
                                    )
                            },

                        ]}
                        data={data}
                        options={{
                            actionsColumnIndex: -1,
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'ไม่มีการจองที่อยู่ระหว่างการดำเนินการ',
                                addTooltip: 'Hinzufügen',
                                deleteTooltip: 'Löschen',
                                editTooltip: 'Bearbeiten',
                                filterRow: {
                                    filterTooltip: 'Filter'
                                },
                                editRow: {
                                    deleteText: 'Diese Zeile wirklich löschen?',
                                    cancelTooltip: 'Abbrechen',
                                    saveTooltip: 'Speichern'
                                }
                            },
                            grouping: {
                                placeholder: 'Spalten ziehen ...',
                                groupedBy: 'Gruppiert nach:'
                            },
                            header: {
                                actions: 'รายละเอียดการจอง'
                            },
                            pagination: {
                                labelDisplayedRows: '{from}-{to} จาก {count}',
                                labelRowsSelect: 'แถว',
                                labelRowsPerPage: 'Zeilen pro Seite:',
                                firstAriaLabel: 'Erste Seite',
                                firstTooltip: 'Erste Seite',
                                previousAriaLabel: 'Vorherige Seite',
                                previousTooltip: 'Vorherige Seite',
                                nextAriaLabel: 'Nächste Seite',
                                nextTooltip: 'Nächste Seite',
                                lastAriaLabel: 'Letzte Seite',
                                lastTooltip: 'Letzte Seite'
                            },
                            toolbar: {
                                addRemoveColumns: 'Spalten hinzufügen oder löschen',
                                nRowsSelected: '{0} Zeile(n) ausgewählt',
                                showColumnsTitle: 'Zeige Spalten',
                                showColumnsAriaLabel: 'Zeige Spalten',
                                exportTitle: 'Export',
                                exportAriaLabel: 'Export',
                                exportName: 'Export als CSV',
                                searchTooltip: 'ค้นหา',
                                searchPlaceholder: 'ค้นหา'
                            }
                        }}
                    />

                </Container>
            </div >
        </div >
    )
}
export default StudentDashboard;