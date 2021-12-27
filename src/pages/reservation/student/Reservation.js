import React, { useContext, useEffect, useState } from 'react';
import { useFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, CloseButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import axios from "axios";
import { AuthContext } from '../../../App';
import ToolModal from './modal/tool';
import But from './reservationCss/ButtonRes';
import Input from './reservationCss/InputRes'
import Selected from './reservationCss/SelectRes';

import MaterialTable from "material-table";
import Modal from 'react-bootstrap/Modal'

const StudentRes = () => {
    const { user, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const [limit, setLimit] = useState([]);
    const [details, setDetials] = useState([]);


    const [Tool, setTools] = useState([]);

    const [open, setOpen] = useState(false);

    const [show, setShow] = useState(false);

    const [dataSetBeforeCofirm, setDataSet] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };



    useEffect(() => {
        getDetails();
        getTools();
    }, [user])


    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
            console.log("Limit :", item.data)

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

            setLimit(filterMonth);
            let itemData = []
            filterMonth.map((item) => {
                return itemData.push({ date: item.date, time: item.time, od: item.od, tmd: item.tmd, oper: item.oper, perio: item.perio, sur: item.sur, prosth: item.prosth, endo: item.endo, pedo: item.endo, xray: item.xray, om: item.om, ortho: item.ortho })
            })
            setData(itemData);
        });

        axios.get("http://10.6.21.41:8080/details/find/all").then((item) => {
            console.log("data :", item.data)
            filterDetails(item.data);
        });
    }

    const filterDetails = (item) => {
        const res = item.filter((item) => {
            return (item.name === user.first_name)
        })
        setDetials(res);
        console.log("details :", res)
    }



    const getTools = () => {
        axios.get('http://10.6.21.41:8080/Tool/find/all').then((item) => {
            console.log("Tools data :", item.data)
            return setTools(item.data);
        });
    }

    function submitForm(date, time, clinic, type, patient, dn, hn) {

        setDataSet({ date: date, time: time, clinic: clinic, type: type, patient: patient, dn: dn, hn: hn })

        setOpen(true);
    }

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            clinic: '',
            type: '',
            patient: '',
            dn: '',
            hn: ''
        },
        validationSchema: Yup.object({
            date: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            time: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            clinic: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            type: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            patient: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            dn: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
            hn: Yup.string()
                .required('*จำเป็นต้องกรอกข้อมูล'),
        }),
        onSubmit: values => {
            return submitForm(values.date, values.time, values.clinic, values.type, values.patient, values.dn, values.hn);
        },
    });



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
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentDashboard">หน้าหลัก</Nav.Link>
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/StudentRes">จองการทำงาน</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/StudentHistory">ประวัติ</Nav.Link>
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
                    <h1 style={{ color: '#0080ff', fontWeight: 'bold', marginBottom: '10px' }}>จำนวนภาระงานที่สามารถจองได้</h1>
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
                            { title: 'OD', field: 'od' },
                            { title: 'TMD', field: 'tmd' },
                            { title: 'OPER', field: 'oper' },
                            { title: 'PERIO', field: 'perio' },
                            { title: 'SUR', field: 'sur' },
                            { title: 'PROSTH', field: 'prosth' },
                            { title: 'ENDO', field: 'endo' },
                            { title: 'PEDO', field: 'pedo' },
                            {
                                title: 'X-RAY', field: 'xray', cellStyle: {
                                    minWidth: 114,
                                },
                            },
                            { title: 'OM', field: 'om' },
                            { title: 'ORTHO', field: 'ortho' },
                        ]}
                        data={data}
                        components={{
                            Actions: props => (
                                <Button
                                    onClick={(event, rowData) => handleShow()}
                                    style={{ backgroundColor: '#0080ff', marginLeft: '10px' }}
                                >
                                    จองการทำงาน
                                </Button>
                            )
                        }}
                        options={{
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'Keine Einträge',
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

                    <Modal style={{ fontFamily: 'Mitr' }} show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>รายละเอียดการจอง</Modal.Title>
                        </Modal.Header>
                        <Modal.Body ><Container>
                            <center>
                                <h1 style={{ color: '#198CFF', fontWeight: 'bold' }}>จองการทำงาน</h1>
                            </center>
                            <form style={{ textAlign: 'left' }} onSubmit={formik.handleSubmit}>
                                <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="date">วันที่</label>

                                <Input
                                    style={{ fontSize: '18px' }}
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date}
                                    min={currentDate}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <div className="error">{formik.errors.date}</div>
                                ) : null} <br /><br />


                                <lable style={{ marginRight: '2%', fontWeight: 'bold', fontSize: '20px' }}>เลือกช่วงเวลา : </lable>
                                <input
                                    style={{ fontSize: '18px' }}
                                    id="ช่วงเช้า"
                                    type="radio"
                                    value="ช่วงเช้า"
                                    name='time'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.time === "ช่วงเช้า"}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <label style={{ marginRight: '10%', fontSize: '18px' }}>ช่วงเช้า</label>


                                <input
                                    style={{ fontSize: '18px' }}
                                    id="ช่วงบ่าย"
                                    type="radio"
                                    value="ช่วงบ่าย"
                                    name='time'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.time === "ช่วงบ่าย"}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <label style={{ marginRight: '10%', fontSize: '18px' }}>ช่วงบ่าย</label>

                                {formik.touched.time && formik.errors.time ? (
                                    <div className="error">{formik.errors.time}</div>
                                ) : null}<br />



                                <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="Clinic">คลินิก</label>
                                <Selected
                                    style={{ fontSize: '18px' }}
                                    id="clinic"
                                    name="clinic"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.clinic}
                                >
                                    <option value="" label="เลือกคลินิก" />
                                    <option value="OD" label="OD" />
                                    <option value="TMD" label="TMD" />
                                    <option value="OPER" label="OPER" />
                                    <option value="PERIO" label="PERIO" />
                                    <option value="SUR" label="SUR" />
                                    <option value="PROSTH" label="PROSTH" />
                                    <option value="ENDO" label="ENDO" />
                                    <option value="PEDO" label="PEDO" />
                                    <option value="X-RAY" label="X-RAY" />
                                    <option value="OM" label="OM" />
                                    <option value="ORTHO" label="ORTHO" />
                                </Selected>
                                {formik.touched.clinic && formik.errors.clinic ? (
                                    <div className="error">{formik.errors.clinic}</div>
                                ) : null}<br />

                                <label style={{ marginRight: '3%', fontWeight: 'bold', fontSize: '20px' }} htmlFor="type">ประเภทงาน : </label>
                                <input
                                    style={{ fontSize: '18px' }}
                                    id="ฟุ้งกระจาย"
                                    type="radio"
                                    value="ฟุ้งกระจาย"
                                    name='type'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.type === "ฟุ้งกระจาย"}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <label style={{ marginRight: '2%', fontSize: '18px' }}>ฟุ้งกระจาย</label>


                                <input
                                    style={{ fontSize: '18px' }}
                                    id="ไม่ฟุ้งกระจาย"
                                    type="radio"
                                    value="ไม่ฟุ้งกระจาย"
                                    name='type'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.type === "ไม่ฟุ้งกระจาย"}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <label style={{ marginRight: '0%', fontSize: '18px' }}>ไม่ฟุ้งกระจาย</label>

                                {formik.touched.type && formik.errors.type ? (
                                    <div className="error">{formik.errors.type}</div>
                                ) : null}<br />

                                <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="patient">ชื่อคนไข้</label>
                                <Input
                                    style={{ fontSize: '18px' }}
                                    id="patient"
                                    name="patient"
                                    type="text"
                                    placeholder="ชื่อคนไข้"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.patient}
                                />
                                {formik.touched.patient && formik.errors.patient ? (
                                    <div className="error">{formik.errors.patient}</div>
                                ) : null} <br />

                                <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="dn">DN</label>
                                <Input
                                    style={{ fontSize: '18px' }}
                                    id="dn"
                                    name="dn"
                                    type="number"
                                    min="0"
                                    placeholder="DN ต้องเป็นตัวเลขเท่านั้น"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dn}
                                />
                                {formik.touched.dn && formik.errors.dn ? (
                                    <div className="error">{formik.errors.dn}</div>
                                ) : null} <br />

                                <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="hn">HN </label>
                                <Input
                                    style={{ fontSize: '18px' }}
                                    id="hn"
                                    name="hn"
                                    type="number"
                                    min="0"
                                    placeholder="HN ต้องเป็นตัวเลขเท่านั้น"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.hn}
                                />
                                {formik.touched.hn && formik.errors.hn ? (
                                    <div className="error">{formik.errors.hn}</div>
                                ) : null} <br />

                                <center>
                                    <br /><But style={{ fontWeight: 'bold', fontSize: '22px', backgroundColor: '#198CFF' }} type="submit">ถัดไป</But>
                                </center>
                                {open === true ? <ToolModal dataSetBeforeCofirm={dataSetBeforeCofirm} details={details} limit={limit} /> : console.log("Modal it's not open")}

                            </form>
                        </Container>
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        </div >
    )
}
export default StudentRes;