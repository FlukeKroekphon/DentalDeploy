import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../../App';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import * as XLSX from "xlsx";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ModalUnit from './confirmModal/modalUnit';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsSearch } from "react-icons/bs";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { icons } from 'react-icons';
import FormInputUnit from './updateUnit'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseButton } from 'react-bootstrap';
import Input from './reservationCss/InputRes'
import Selected from './reservationCss/SelectRes'
import StyledCreate from './reservationCss/ModalCreate';

import MaterialTable from "material-table";

const AdminUnit = () => {

    const { user } = useContext(AuthContext);
    const [unit, setUnit] = useState([]);
    const [items, setItems] = useState([]);

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([
        { title: 'ชื่อยูนิต', field: 'unit_code' },
        {
            title: 'ชั้น',
            field: 'unit_floor',
            lookup: { 1: '1', 2: '2', 3: '3', 4: '4' },
        },
        {
            title: 'สถานะ',
            field: 'unavailable_start_date',
            lookup: { active: 'ปกติ', inactive: 'ปิดใช้งาน' },
        },
    ]);



    useEffect(() => {
        getDetails();
        console.log("UNIT :", unit)
    }, [user])


    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/unit/find/all").then((item) => {
            console.log("Unit :", item.data)

            let res = item.data;
            let filteredData = []
            res.map((item) => {
                return filteredData.push({ unit_id: item.unit_id, unit_code: item.unit_code, unit_floor: item.unit_floor, unavailable_start_date: item.unavailable_start_date })
            })

            setData(filteredData);
            return setUnit(item.data);
        });
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


    async function updatetheUnit(unit_id, unitCode, unitFloor, active) {
        let Code = { unit_code: unitCode }
        let Floor = { unit_floor: unitFloor }
        let Active = { unavailable_start_date: active }

        console.log("id :", unit_id, " code :", Code, " floor :", Floor, " status :", Active)
        await axios.put("http://10.6.21.41:8080/unit/updateUnit/" + unit_id, Code);
        await axios.put("http://10.6.21.41:8080/unit/updateUnit/" + unit_id, Floor);
        await axios.put("http://10.6.21.41:8080/unit/updateUnit/" + unit_id, Active);

        return getDetails();
    }



    async function deleteUnit(unit_id) {
        console.log("Delete ID :", unit_id)
        await axios.delete("http://10.6.21.41:8080/unit/realdelete/" + unit_id);
        await axios.get("http://10.6.21.41:8080/unit/find/all").then((item) => {
            console.log("new Limit ==> :", item.data)
            return setUnit(item.data);
        });
        getDetails();
    }


    async function submitForm(unit_code, unit_floor, unavailable_start_date) {

        const FindUnitName = data.filter((item) => {
            return (item.unit_code === unit_code)
        })

        if (FindUnitName.length === 0) {
            if ((unit_code === undefined) || (unit_floor === undefined) || (unavailable_start_date === undefined)) {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน")
            } else {
                console.log("Unit Form :", unit_code, unit_floor);
                const ApiSet = ({ unit_code: unit_code, unit_floor: unit_floor, unavailable_start_date: unavailable_start_date })

                await axios.post("http://10.6.21.41:8080/unit/create", ApiSet).then((res) => {
                    return console.log("Res Limit :", res)
                })
                await axios.get("http://10.6.21.41:8080/unit/find/all").then((item) => {
                    console.log("new Limit ==> :", item.data)
                    return setUnit(item.data);
                });
                getDetails();
            }
        } else {
            alert("Unit นี้มีอยู่แล้ว")
        }


    }

    const formik = useFormik({
        initialValues: {
            unit_code: '',
            unit_floor: '',
        },
        validationSchema: Yup.object({
            unit_code: Yup.string()
                .required('Required'),
            unit_floor: Yup.string()
                .required('Required'),

        }),
        onSubmit: values => {
            return submitForm(values.unit_code, values.unit_floor);
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
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminStudent">นักศึกษา</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminStudentAdmin">แอดมิน</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminTeacher">อาจารย์</Nav.Link>
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/AdminUnit">เก้าอี้ทันตกรรม</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link}>ชื่อผู้ใช้งาน : {user.first_name}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ borderRadius: '10px', color: '#0080ff', fontSize: '23px', marginRight: '80px' }} as={Link} to="/">ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br />

            <div className="PaddingDiv">
                <Container style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', maxWidth: '1500px' }}>
                    <Row>
                        <Col md={7} xl={7} lg={7}>
                            <h1 style={{ color: '#198CFF', fontWeight: 'bold', float: 'right' }}>รายชื่อยูนิต</h1>
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
                        columns={columns}
                        data={data}
                        options={{
                            exportButton: true,
                            pageSizeOptions: [5, 10, 20, 50, 100, 200],
                            actionsColumnIndex: -1,
                            headerStyle: {
                                fontFamily: "Mitr",
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }, tableLayout: 'auto'
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'ไม่มีรายชื่อเก้าอี้',
                                addTooltip: 'เพิ่มเก้าอี้ทันตกรรม',
                                deleteTooltip: 'Löschen',
                                editTooltip: 'Bearbeiten',
                                filterRow: {
                                    filterTooltip: 'Filter'
                                },
                                editRow: {
                                    deleteText: 'ต้องการลบเก้าอี้ทันตกรรมนี้หรือไม่ ?',
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
                                        submitForm(newData.unit_code, newData.unit_floor, newData.unavailable_start_date)
                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        console.log("newData :", newData)
                                        updatetheUnit(oldData.unit_id, newData.unit_code, newData.unit_floor, newData.unavailable_start_date)
                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        deleteUnit(oldData.unit_id)
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />


                </Container>
            </div>
            {
                items.length !== 0 ? (<div>
                    {console.log("มาแล้ว :", items)}
                    <ModalUnit excel={items} setItems={setItems} unit={unit} setData={setData} /></div>) : (console.log("ยัง"))
            }
        </div>
    )
}
export default AdminUnit;