import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import { Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../App';
import axios from "axios";
import MaterialTable from "material-table";
import { BsSearch } from "react-icons/bs";

const StudentAdminHistory = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])

    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/details/find/notnull").then((item) => {
            const res = item.data;
            let filteredData = []
            res.map((item) => {
                return filteredData.push({ uniqueID: item.uniqueID, name: item.name, year: item.studentyear, date: item.date, time: item.time, unit: item.unit, clinic: item.clinic, worktype: item.worktype, patient: item.patient, teacher: item.teacher, dn: item.dn, hn: item.hn, toolStatus: item.toolStatus })
            })
            setData(filteredData);
        });
    }



    return (
        <div style={{ backgroundColor: '#ededed', minHeight: '1080px' }}>
            <nav style={{ background: '#0080ff' }}>
                <div style={{ color: '#ffff', paddingLeft: '50px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <h1 className="text-justify">Mae Fah Luang University Dental Clinic</h1>
                </div>
            </nav>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'white' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: '80px' }} className="mr-auto">
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminReservation">เลือกที่นั่ง</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminLimitCase">กำหนดภาระงาน</Nav.Link>
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/StudentAdminHistory">ประวัติ</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link}>ชื่อผู้ใช้งาน : {user.first_name}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ borderRadius: '10px', color: '#0080ff', fontSize: '23px', marginRight: '80px' }} as={Link} to="/">ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br />

            <div className="PaddingDiv">
                <Container style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', minHeight: '700px', maxWidth: '1500px' }}>
                    <h1 style={{ color: '#198CFF', fontWeight: 'bold', marginBottom: '10px' }}>ประวัติการอนุมัติการจอง</h1>

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
                                title: 'Unit', field: 'unit', cellStyle: {
                                    minWidth: 100,
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
                                title: 'ชื่อนักศึกษา', field: 'name', cellStyle: {
                                    minWidth: 220,
                                },
                            },
                            {
                                title: 'คนไข้', field: 'patient', cellStyle: {
                                    minWidth: 220,
                                },
                            },
                        ]}
                        data={data}
                        options={{
                            exportButton: true,
                            actionsColumnIndex: -1,
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'ไม่มีประวัติการอนุมัติการจองการทำงาน',
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
            </div>
        </div >
    )
}
export default StudentAdminHistory;