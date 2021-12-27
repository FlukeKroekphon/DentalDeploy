
import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from 'react-bootstrap/Navbar'
import { CloseButton, Nav } from 'react-bootstrap';
import * as XLSX from "xlsx";
import Container from 'react-bootstrap/Container'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../../App';
import '../Yup.css'
import Input from './reservationCss/InputRes'
import Button from './reservationCss/ButtonRes'
import Limit from './limit';
import StyledCreate from './reservationCss/ModalCreate';
import ConfirmLimit from './confirmModal/modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MaterialTable from "material-table";

const StudentAdminLimitCase = () => {
    const { user, limit, setLimit, currentDate, currentMonth, currentYear } = useContext(AuthContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [details, setDetials] = useState([]);
    const [items, setItems] = useState([]);

    const [data, setData] = useState([]);

    let history = useHistory();

    useEffect(() => {
        getDetails();
    }, [user])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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
            return setDetials(filterMonth);

        });
    }


    async function submitForm(date, time, od, tmd, oper, perio, sur, prosth, endo, pedo, xray, om, ortho) {
        if ((date === undefined) || (time === undefined) || (od === undefined) || (tmd === undefined) || (oper === undefined) || (perio === undefined) || (sur === undefined) || (prosth === undefined) || (endo === undefined) || (pedo === undefined) || (xray === undefined) || (om === undefined) || (ortho === undefined)) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
        } else {
            console.log("Limit :", date, time, od, tmd, oper, perio, sur, prosth, endo, pedo, xray, om, ortho);
            const ApiSet = ({ date: date, time: time, od: od, tmd: tmd, oper: oper, perio: perio, sur: sur, prosth: prosth, endo: endo, pedo: pedo, xray: xray, om: om, ortho: ortho, odyOd: 0, odyTmd: 0, odyOper: 0, odyPerio: 0, odySur: 0, odyProsth: 0, odyEndo: 0, odyPedo: 0, odyXray: 0, odyOm: 0, odyOrtho: 0 })

            const findCaseReserved = data.filter((item) => {
                return ((item.date === date) && (item.time === time))
            })

            if (findCaseReserved.length !== 0) {
                return alert("ไม่สามารถกำหนดภาระงานในช่วงเวลาเดียวกันได้")
            } else {
                await axios.post("http://10.6.21.41:8080/limitcase/create", ApiSet).then((res) => {
                    return console.log("Res Limit :", res)
                })
                await axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
                    console.log("Limit :", item.data)

                    let findMonth = item.data;
                    let filterMonth = findMonth.filter((item) => {
                        let a = item.date;
                        let thisDate = currentDate.slice(8)
                        let digitRealDate = (a).slice(8)
                        // console.log("วันที่ทะไหย่ :", thisDatte)
                        let digitData = (a).slice(5, 7)
                        let parsed = parseInt(digitData)
                        return ((parsed >= currentMonth) && (digitRealDate >= thisDate))
                    })
                    getDetails();
                    return setLimit(filterMonth);
                });
                closeModal();
                return history.push('/StudentAdminDashboard')
            }
        }
    }

    async function updateLimitCase(limit_id, date, time, od, tmd, oper, perio, sur, prosth, endo, pedo, xray, om, ortho) {
        if ((od === NaN) || (tmd === NaN) || (oper === NaN) || (perio === NaN) || (sur === NaN) || (prosth === NaN) || (endo === NaN) || (pedo === NaN) || (xray === NaN) || (om === NaN) || (ortho === NaN)) {
            alert("กรุณากรอกจำนวนภาระงาน");
        } else {
            const findCaseReserved = data.filter((item) => {
                return ((item.date === date) && (item.time === time))
            })

            if (findCaseReserved.length !== 0) {
                return alert("ไม่สามารถกำหนดภาระงานในช่วงเวลาเดียวกันได้")
            } else {
                let getOd = { od: od }
                let getTmd = { tmd: tmd }
                let getOper = { oper: oper }
                let getPerio = { perio: perio }
                let getProsth = { sur: sur }
                let getEndo = { prosth: prosth }
                let getPedo = { endo: endo }
                let getXray = { pedo: pedo }
                let getOm = { xray: xray }
                let getOrtho = { om: om }
                let getSur = { ortho: ortho }

                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getOd);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getTmd);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getOper);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getPerio);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getSur);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getProsth);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getEndo);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getPedo);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getXray);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getOm);
                await axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, getOrtho);
                getDetails();
            }
        }
    }

    async function deleteLimitCase(id) {
        console.log("Delete ID :", id)

        await axios.delete("http://10.6.21.41:8080/limitcase/delete/" + id);
        return axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
            console.log("Limit :", item.data)

            let findMonth = item.data;
            let filterMonth = findMonth.filter((item) => {
                let a = item.date;
                let thisDate = currentDate.slice(8)
                let digitRealDate = (a).slice(8)
                // console.log("วันที่ทะไหย่ :", thisDatte)
                let digitData = (a).slice(5, 7)
                let parsed = parseInt(digitData)
                return ((parsed >= currentMonth) && (digitRealDate >= thisDate))
            })
            // && digitRealDate=>
            getDetails();
            return setLimit(filterMonth);
        });
    }

    function checkColor(caselimit) {
        if (caselimit === "0") {
            return "red"
        }
    }

    function checkFont(caselimit) {
        if (caselimit === "0") {
            return "bold"
        }
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    }

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            od: '',
            tmd: '',
            oper: '',
            perio: '',
            sur: '',
            prosth: '',
            endo: '',
            pedo: '',
            xray: '',
            om: '',
            ortho: '',
        },
        validationSchema: Yup.object({
            date: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            time: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            od: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            tmd: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            oper: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            perio: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            sur: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            prosth: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            endo: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            pedo: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            xray: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            om: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
            ortho: Yup.string()
                .required('* กรุณากรอกข้อมูล'),
        }),
        onSubmit: values => {
            return submitForm(values.date, values.time, values.od, values.tmd, values.oper, values.perio, values.sur, values.prosth, values.endo, values.pedo, values.xray, values.om, values.ortho);
        },
    });

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
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/StudentAdminLimitCase">กำหนดภาระงาน</Nav.Link>
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
                <Container style={{ backgroundColor: '#ffff', padding: '15px', borderRadius: '10px', maxWidth: '1500px' }}>
                    <Row>
                        <Col md={7} xl={7} lg={7}>
                            <h1 style={{ color: '#198CFF', fontWeight: 'bold', float: 'right' }}>จำนวนภาระงานที่เหลือ</h1>
                        </Col>
                        <Col style={{ marginTop: '10px' }} md={5} xl={5} lg={5}>
                            <div style={{ textAlign: 'end' }}>
                                <label style={{ marginRight: '10px', marginLeft: '-10px' }}>อัพโหลดโดย Excel : {" "}</label>
                                <input type="file" onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }} />
                            </div>
                        </Col>
                    </Row>
                    <MaterialTable
                        title="Mae Fah Luang University Dental Clinic"
                        columns={[
                            {
                                title: 'วันที่', field: 'date', type: 'date', cellStyle: {
                                    minWidth: 140,
                                },
                            },
                            {
                                title: 'เวลา', field: 'time'
                                , lookup: { ช่วงเช้า: 'ช่วงเช้า', ช่วงบ่าย: 'ช่วงบ่าย' }
                                , cellStyle: {
                                    minWidth: 40
                                },
                            },
                            {
                                title: 'OD', field: 'od', type: "numeric", render: rowData => rowData?.od,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.od), fontWeight: checkFont(rowData?.od) }
                                }
                            },
                            {
                                title: 'TMD', field: 'tmd', type: "numeric", render: rowData => rowData?.tmd,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.tmd), fontWeight: checkFont(rowData?.tmd) }
                                }
                            },
                            {
                                title: 'OPER', field: 'oper', type: "numeric", render: rowData => rowData?.oper,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.oper), fontWeight: checkFont(rowData?.oper) }
                                }
                            },
                            {
                                title: 'PERIO', field: 'perio', type: "numeric", render: rowData => rowData?.perio,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.perio), fontWeight: checkFont(rowData?.perio) }
                                }
                            },
                            {
                                title: 'SUR', field: 'sur', type: "numeric", render: rowData => rowData?.sur,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.sur), fontWeight: checkFont(rowData?.sur) }
                                }
                            },
                            {
                                title: 'PROSTH', field: 'prosth', type: "numeric", render: rowData => rowData?.prosth,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.prosth), fontWeight: checkFont(rowData?.prosth) }
                                }
                            },
                            {
                                title: 'ENDO', field: 'endo', type: "numeric", render: rowData => rowData?.endo,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.endo), fontWeight: checkFont(rowData?.endo) }
                                }
                            },
                            {
                                title: 'PEDO', field: 'pedo', type: "numeric", render: rowData => rowData?.pedo,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.pedo), fontWeight: checkFont(rowData?.pedo) }
                                }
                            },
                            {
                                title: 'X-RAY', field: 'xray', type: "numeric", render: rowData => rowData?.xray,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.xray), fontWeight: checkFont(rowData?.xray), minWidth: 114, }
                                }
                            },
                            {
                                title: 'OM', field: 'om', type: "numeric", render: rowData => rowData?.om,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.om), fontWeight: checkFont(rowData?.om) }
                                }
                            },
                            {
                                title: 'ORTHO', field: 'ortho', type: "numeric", render: rowData => rowData?.ortho,
                                cellStyle: (cellValue, rowData) => {
                                    return { color: checkColor(rowData?.ortho), fontWeight: checkFont(rowData?.ortho) }
                                }
                            },
                        ]}
                        data={data}
                        options={{
                            exportButton: true,
                            pageSizeOptions: [5, 10, 20, 50, 100],
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
                                addTooltip: 'เพิ่มรายชื่อผู้ใช้งาน',
                                deleteTooltip: 'Löschen',
                                editTooltip: 'Bearbeiten',
                                filterRow: {
                                    filterTooltip: 'Filter'
                                },
                                editRow: {
                                    deleteText: 'ต้องการลบรายชื่อนี้หรือไม่ ?',
                                    cancelTooltip: 'Abbrechen',
                                    saveTooltip: 'Speichern'
                                }
                            },
                            grouping: {
                                placeholder: 'Spalten ziehen ...',
                                groupedBy: 'Gruppiert nach:'
                            },
                            header: {
                                actions: 'แก้ไข'
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
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        console.log("newData :", newData)

                                        var dd = String(newData.date.getDate()).padStart(2, '0');
                                        var mm = String(newData.date.getMonth() + 1).padStart(2, '0');
                                        var yyyy = newData.date.getFullYear();

                                        let date = yyyy + '-' + mm + '-' + dd;
                                        let time = newData.time;
                                        let od = newData.od;
                                        let tmd = newData.tmd;
                                        let oper = newData.oper;
                                        let perio = newData.perio;
                                        let sur = newData.sur;
                                        let prosth = newData.prosth;
                                        let endo = newData.endo;
                                        let pedo = newData.pedo;
                                        let xray = newData.xray;
                                        let om = newData.om;
                                        let ortho = newData.ortho;
                                        submitForm(date, time, od, tmd, oper, perio, sur, prosth, endo, pedo, xray, om, ortho)
                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        var dd = String(newData.date.getDate()).padStart(2, '0');
                                        var mm = String(newData.date.getMonth() + 1).padStart(2, '0');
                                        var yyyy = newData.date.getFullYear();

                                        let date = yyyy + '-' + mm + '-' + dd;
                                        let time = newData.time;
                                        console.log("Update :", oldData.limit_id, date, time, newData.od, newData.tmd, newData.oper, newData.perio, newData.sur, newData.prosth, newData.endo, newData.pedo, newData.xray, newData.om, newData.ortho)
                                        updateLimitCase(oldData.limit_id, date, time, newData.od, newData.tmd, newData.oper, newData.perio, newData.sur, newData.prosth, newData.endo, newData.pedo, newData.xray, newData.om, newData.ortho)
                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        deleteLimitCase(oldData.id)
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </Container>
            </div>
            {
                items.length !== 0 ? (<div>
                    <ConfirmLimit excel={items} setExcel={setItems} setLimit={setLimit} details={details} CloseReser={setIsOpen} /></div>) : (console.log("ยัง"))
            }


        </div>
    )
}
export default StudentAdminLimitCase;