
import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import { Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../../App';
import './whycss.css'
import '../Yup.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';

import Search from '@material-ui/icons/Search';
import Modal from 'react-bootstrap/Modal'
import MaterialTable from "material-table";


const TeacherSelectWork = () => {
    const { user, studentYear, setStudentYear, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    const [details, setDetails] = useState([]);

    const [Tool, setTools] = useState([]);

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (dataUniqueID) => { setShow(true); getTools(dataUniqueID); };

    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])



    const getDetails = () => {
        if (studentYear === 0) {
            axios.get("http://10.6.21.41:8080/details/find/teachernull").then((item) => {
                // console.log("Limit :", item.data)
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
                let filteredData = []
                filterMonth.map((item) => {
                    return filteredData.push({ id: item.id, uniqueID: item.uniqueID, name: item.name, year: item.studentyear, date: item.date, time: item.time, unit: item.unit, clinic: item.clinic, worktype: item.worktype, patient: item.patient, teacher: item.teacher, dn: item.dn, hn: item.hn, toolStatus: item.toolStatus })
                })
                setData(filteredData);
                return setDetails(filterMonth);
            })
        } else {
            console.log("student Year :", studentYear)
            axios.get("http://10.6.21.41:8080/details/find/teachernull").then((item) => {

                let findStudentYear = item.data;
                let getByStudentYear = findStudentYear.filter((item) => {
                    return (item.studentyear === studentYear.toString())
                })
                console.log("getByStudentYear ==>", getByStudentYear)

                let findMonth = getByStudentYear;
                let filterMonth = findMonth.filter((item) => {
                    let a = item.date;
                    let thisDate = currentDate.slice(8)
                    let digitRealDate = (a).slice(8)
                    let digitData = (a).slice(5, 7)
                    let parsed = parseInt(digitData)

                    let getYear = (a).slice(0, 4)
                    return (((parsed >= currentMonth) && (digitRealDate >= thisDate)) || (getYear > currentYear))
                })
                let filteredData = []
                filterMonth.map((item) => {
                    return filteredData.push({ id: item.id, uniqueID: item.uniqueID, name: item.name, year: item.studentyear, date: item.date, time: item.time, unit: item.unit, clinic: item.clinic, worktype: item.worktype, patient: item.patient, teacher: item.teacher, dn: item.dn, hn: item.hn, toolStatus: item.toolStatus })
                })
                setData(filteredData);
                return setDetails(filterMonth);
            })
        }
    }





    const getTools = (dataUniqueID) => {
        axios.get('http://10.6.21.41:8080/Tool/find/all').then((item) => {
            console.log("Tools data :", item.data)
            return filterToolsDetails(item.data, dataUniqueID);
        });
    }

    const filterToolsDetails = (item, dataUniqueID) => {
        const res = item.filter((item) => {
            return (item.uniqueID === dataUniqueID)
        })

        const detailsShow = data?.filter((item) => {
            return (item.uniqueID === dataUniqueID)
        })
        console.log("Details Show :", detailsShow)
        setDetails(detailsShow);
        console.log("Details Tools:", res)
        setTools(res);
    }


    async function submitApprove(id) {
        let body = []
        id.map((item) => {
            return body.push({ id: item.id, teacher: user.first_name })
        })
        console.log("Select ID :", body)
        await axios.put("http://10.6.21.41:8080/details/updateTeacher/", body)
        getDetails();
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
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/TeacherDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link onClick={() => setStudentYear(0)} style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/TeacherSelectWork">การเลือกตรวจงาน</Nav.Link>
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
                    <h1 style={{ color: '#198CFF', fontWeight: 'bold' }}>จองการตรวจงาน</h1>

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
                                title: 'ผู้ป่วย', field: 'patient', cellStyle: {
                                    minWidth: 215,
                                },
                            }, {
                                title: 'ชั้นปี', field: 'year', cellStyle: {
                                    minWidth: 30,
                                },
                            }, {
                                title: 'ชื่อนักศึกษา', field: 'name', cellStyle: {
                                    minWidth: 215,
                                },
                            },
                            {
                                title: "รายละเอียดการจอง",
                                field: "internal_action",
                                align: 'center',
                                cellStyle: {
                                    minWidth: 206,
                                },
                                editable: false,
                                render: (rowData) =>
                                    rowData && (
                                        <Search
                                            // color="secondary"
                                            style={{ color: "#198CFF", cursor: 'pointer', align: 'center' }}
                                            onClick={() => handleShow(rowData.uniqueID)}
                                        >
                                        </Search>
                                    )
                            }
                        ]}
                        data={data}
                        options={{
                            selection: true,
                            exportButton: true,
                            pageSizeOptions: [5, 10, 20, 50, 100],
                            actionsColumnIndex: -1,
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        actions={[
                            {
                                tooltip: 'อนุมัติ',
                                icon: 'check',
                                onClick: (evt, data) => submitApprove(data)
                            }
                        ]}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'ไม่มีการขออนุมัติการตรวจงาน',
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
                                nRowsSelected: 'ต้องการอนุมัติ {0} รายการ',
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

            <Modal style={{ fontFamily: 'Mitr' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>รายละเอียดการจอง</Modal.Title>
                </Modal.Header>
                <Modal.Body ><Container>
                    <Row>
                        <Col sm={6} md={6}><p>วันที่ : {details[0]?.date}</p></Col>
                        <Col sm={6} md={6}><p>ช่วงเวลา : {details[0]?.time}</p></Col>

                    </Row>
                    <Row>
                        <Col sm={7} md={7}><p>ชื่อผู้จอง : {details[0]?.name}</p> </Col>
                        <Col sm={5} md={5}><p>ชั้นปี : {details[0]?.year}</p> </Col>

                    </Row>
                    <Row>
                        <Col sm={6} md={6}><p>คลินิก : {details[0]?.clinic}</p></Col>

                        <Col sm={6} md={6}><p>Unit : {details[0]?.unit}</p></Col>

                    </Row>
                    <Row>
                        <Col sm={6} md={6}><p>DN : {details[0]?.dn}</p></Col>
                        <Col sm={6} md={6}><p>HN : {details[0]?.hn}</p></Col>
                    </Row>
                    <Row>
                        <Col sm={6} md={6}><p>ผู้ป่วย : {details[0]?.patient}</p></Col>
                        <Col sm={6} md={6}><p>ประเภทงาน : {details[0]?.worktype}</p></Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>สถานะการจองอุปกรณ์ : {(details[0]?.toolStatus === "จัดเตรียมแล้ว") ? <label style={{ color: 'green' }}>จัดเตรียมแล้ว</label> : <label style={{ color: '#FF433D' }}>รอการเบิกอุปกรณ์</label>}</Col>
                    </Row>
                </Container>
                    <Container>
                        <Table
                            striped
                            bordered
                            hover
                            variant=''
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                maxWidth: '97%',
                                marginTop: '20px',
                            }}
                        >
                            <Row>
                                <Col>
                                    <thead className='theadAdmin1' style={{}}>
                                        <tr style={{ backgroundColor: 'white' }}>
                                            <th style={{ width: 460 }} className="text-primary">อุปกรณ์</th>
                                            <th className="text-primary" >จำนวน</th>
                                        </tr>
                                    </thead>
                                    {Tool?.map((item) => {
                                        if (item.testkit_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดตรวจ</td>
                                                        <td>{item.testkit_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.glassofwater_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>แก้วน้ำ</td>
                                                        <td>{item.glassofwater_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Tripplesyring_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Tripple syring</td>
                                                        <td>{item.Tripplesyring_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.FabricMiddlepunch_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ผ้าเจาะกลาง</td>
                                                        <td>{item.FabricMiddlepunch_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.veil_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ผ้าคลุม</td>
                                                        <td>{item.veil_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.UNC15Probe_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>UNC 15 Probe</td>
                                                        <td>{item.UNC15Probe_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.medicinecup_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ถ้วยนํ้ายา</td>
                                                        <td>{item.medicinecup_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Dappendish_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Dappen dish</td>
                                                        <td>{item.Dappendish_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Mouthprop_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Mouth prop</td>
                                                        <td>{item.Mouthprop_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Glasslab_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Glass lab</td>
                                                        <td>{item.Glasslab_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Airotor_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Airotor</td>
                                                        <td>{item.Airotor_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Contra_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Contra</td>
                                                        <td>{item.Contra_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.cottonbud_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ไม้พันสำลี </td>
                                                        <td>{item.cottonbud_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Rubbercup_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Rubber cup/tip/Brush</td>
                                                        <td>{item.Rubbercup_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.AnestheticSyringe_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Syringe ยาชา</td>
                                                        <td>{item.AnestheticSyringe_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.BladeHolder_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Blade Holder</td>
                                                        <td>{item.BladeHolder_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Blade_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Blade No....</td>
                                                        <td>{item.Blade_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Compositstopperset_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดอุด Composit</td>
                                                        <td>{item.Compositstopperset_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Amalgamfillingset_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดอุด Amalgam</td>
                                                        <td>{item.Amalgamfillingset_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Compositsandingsetslowrewind_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดขัด Composit กรอช้า</td>
                                                        <td>{item.Compositsandingsetslowrewind_toolcc1}</td>
                                                    </tr>
                                                </tbody>

                                            )
                                        } else {
                                            return
                                        }
                                    })}

                                    {Tool?.map((item) => {
                                        if (item.Compositsandingsetfastrewinding_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดขัด Composit กรอเร็ว</td>
                                                        <td>{item.Compositsandingsetfastrewinding_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.plasticcomposit_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>plastic composit</td>
                                                        <td>{item.plasticcomposit_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Spoonexcavatorlarge_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Spoon excavator ใหญ่</td>
                                                        <td>{item.Spoonexcavatorlarge_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.MatrixV3_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Matrix V3 Ring ...</td>
                                                        <td>{item.MatrixV3_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.MatrixV3Forcep_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Matrix V3 Forcep</td>
                                                        <td>{item.MatrixV3Forcep_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Rounddimondbursetslow_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Round dimond bur (กรอช้า)</td>
                                                        <td>{item.Rounddimondbursetslow_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Cylinderdimondbursetslow_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Cylinder dimond bur (กรอช้า)</td>
                                                        <td>{item.Cylinderdimondbursetslow_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Rounddimondbursetfast_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Tripple</td>
                                                        <td>{item.Rounddimondbursetfast_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Cylinderdimondbursetfast_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Cylinder dimond bur (กรอเร็ว)</td>
                                                        <td>{item.Cylinderdimondbursetfast_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Dycalcarrier_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Dycal carrier </td>
                                                        <td>{item.Dycalcarrier_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Spatulaplastic_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Spatula plastic</td>
                                                        <td>{item.Spatulaplastic_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Cementspatula_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Cement spatula</td>
                                                        <td>{item.Cementspatula_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Mendrelscrubset_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดขัด Mendrel</td>
                                                        <td>{item.Mendrelscrubset_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Poponsmall_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Pop on เล็ก/ใหญ่</td>
                                                        <td>{item.Poponsmall_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Rubberdamset_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุด Rubber dam</td>
                                                        <td>{item.Rubberdamset_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.clamp_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>clamp No.</td>
                                                        <td>{item.clamp_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Steelheadslowdown_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>หัว Steel กรอช้า</td>
                                                        <td>{item.Steelheadslowdown_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.Astropolpolishingset_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>ชุดขัด Astropol</td>
                                                        <td>{item.Astropolpolishingset_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.IvoryTofflemirematrix_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>Ivory / Tofflemire matrix</td>
                                                        <td>{item.IvoryTofflemirematrix_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                    {Tool?.map((item) => {
                                        if (item.hightpowersuction_toolcc1 !== ' ') {
                                            return (
                                                <tbody>
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td>hight power suction</td>
                                                        <td>{item.hightpowersuction_toolcc1}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        } else {
                                            return
                                        }
                                    })}
                                </Col>
                            </Row>
                        </Table>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default TeacherSelectWork;