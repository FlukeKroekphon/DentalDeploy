import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../../App';
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsSearch } from "react-icons/bs";
import Pagination from 'react-bootstrap/Pagination'

import MaterialTable from "material-table";

// หา Sumary ของแต่ละ case ใน details ของแต่ละวันก่อน
//fillter details เพื่อใช้ดู date time แล้วก็ มาเทียบกับ limit case

const StudentAdminDashboard = () => {

    const { user, setLimit, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])


    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
            // console.log("Limit :", item.data)
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

            console.log("Filter Month :", filterMonth)

            setData(filterMonth);
            return setLimit(filterMonth);

        });
    }



    function sum(a, b) {
        let c = parseInt(b)
        // console.log("a :", typeof a, "c :", typeof c)
        return a + c;
    }


    function checkColor(Reserved, Sumcase) {
        let all = (parseInt(Reserved) + parseInt(Sumcase))
        if (parseInt(Reserved) === all) {
            return "red"
        }
    }

    function checkFont(caselimit) {
        if (caselimit === "0") {
            return "bold"
        }
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
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/StudentAdminDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminReservation">เลือกที่นั่ง</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminLimitCase">กำหนดภาระงาน</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentAdminHistory">ประวัติ</Nav.Link>
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

                    <h1 style={{ color: '#198CFF', fontWeight: 'bold', marginBottom: '10px' }}>จำนวนภาระงานทั้งหมด</h1>


                    <MaterialTable
                        title="Mae Fah Luang University Dental Clinic"
                        columns={[
                            {
                                title: 'วันที่', field: 'date', type: 'date', cellStyle: {
                                    minWidth: 140,
                                },
                            },
                            {
                                title: 'เวลา', field: 'time', cellStyle: {
                                    minWidth: 125,
                                },
                            },
                            {
                                title: 'OD', field: 'od', render: rowData => rowData.odyOd + "/" + sum(rowData.odyOd, rowData.od),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyOd, rowData.od), fontWeight: checkFont(rowData.od) }
                                }
                            },
                            {
                                title: 'TMD', field: 'tmd', render: rowData => rowData.odyTmd + "/" + sum(rowData.odyTmd, rowData.tmd),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyTmd, rowData.tmd), fontWeight: checkFont(rowData.tmd) }
                                }
                            },
                            {
                                title: 'OPER', field: 'oper', render: rowData => rowData.odyOper + "/" + sum(rowData.odyOper, rowData.oper),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyOper, rowData.oper), fontWeight: checkFont(rowData.oper) }
                                }
                            },
                            {
                                title: 'PERIO', field: 'perio', render: rowData => rowData.odyPerio + "/" + sum(rowData.odyPerio, rowData.perio),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyPerio, rowData.perio), fontWeight: checkFont(rowData.perio) }
                                }
                            },
                            {
                                title: 'SUR', field: 'sur', render: rowData => rowData.odySur + "/" + sum(rowData.odySur, rowData.sur),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odySur, rowData.sur), fontWeight: checkFont(rowData.sur) }
                                }
                            },
                            {
                                title: 'PROSTH', field: 'prosth', render: rowData => rowData.odyProsth + "/" + sum(rowData.odyProsth, rowData.prosth),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyProsth, rowData.prosth), fontWeight: checkFont(rowData.prosth) }
                                }
                            },
                            {
                                title: 'ENDO', field: 'endo', render: rowData => rowData.odyEndo + "/" + sum(rowData.odyEndo, rowData.endo),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyEndo, rowData.endo), fontWeight: checkFont(rowData.endo) }
                                }
                            },
                            {
                                title: 'PEDO', field: 'pedo', render: rowData => rowData.odyPedo + "/" + sum(rowData.odyPedo, rowData.pedo),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyPedo, rowData.pedo), fontWeight: checkFont(rowData.pedo) }
                                }
                            },
                            {
                                title: 'X-RAY', field: 'xray', render: rowData => rowData.odyXray + "/" + sum(rowData.odyXray, rowData.xray),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyXray, rowData.xray), fontWeight: checkFont(rowData.xray), minWidth: 114, }
                                }
                            },
                            {
                                title: 'OM', field: 'om', render: rowData => rowData.odyOm + "/" + sum(rowData.odyOm, rowData.om),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyOm, rowData.om), fontWeight: checkFont(rowData.om) }
                                }
                            },
                            {
                                title: 'ORTHO', field: 'ortho', render: rowData => rowData.odyOrtho + "/" + sum(rowData.odyOrtho, rowData.ortho),
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData.odyOrtho, rowData.ortho), fontWeight: checkFont(rowData.ortho) }
                                }
                            },
                        ]}
                        data={data}
                        options={{
                            exportButton: true,
                            pageSizeOptions: [5, 10, 20, 50, 100],
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'ภาระงานไม่ได้ถูกกำหนดไว้',
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
export default StudentAdminDashboard;