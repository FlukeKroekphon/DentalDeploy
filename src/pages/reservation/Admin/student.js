import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../../App';
import axios from "axios";
import { Button } from 'react-bootstrap';
import * as XLSX from "xlsx";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ModalUser from './confirmModal/modalUser';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsSearch } from "react-icons/bs";
import UpdateAdmin from './updateAdmin'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseButton } from 'react-bootstrap';
import Input from './reservationCss/InputRes'
import StyledCreate from './reservationCss/ModalCreate';

import MaterialTable from "material-table";


const AdminStudent = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUser] = useState([]);
    const [userExcel, setUserExcel] = useState([]);
    const [editingIndex, setEditingIndex] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [allRole, setAllrole] = useState([]);

    const [columns, setColumns] = useState([
        { title: 'รหัสนักศึกษา', field: 'student_id' },
        { title: 'ชื่อ-สกุล', field: 'first_name' },
        {
            title: 'ชั้นปี', minWidth: 100,
            field: 'student_year',
            lookup: { 3: '3', 4: '4', 5: '5' },
        },
        { title: 'E-mail', field: 'email', type: 'email' },
        {
            title: 'ตำแหน่ง',
            field: 'role',
            editable: 'never',
            lookup: { student: 'Student' },
        },
    ]);

    const [data, setData] = useState([]);



    useEffect(() => {
        getDetails();
        console.log("userDetails :", userDetails)
    }, [user])

    useEffect(() => {
        console.log("editingIndex :", editingIndex)
    }, [editingIndex])


    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/name/find/all").then((item) => {
            console.log("Name :", item.data)
            setAllrole(item.data)
            let setTeacher = item.data;
            let filterTeacher = setTeacher.filter((item) => {
                return (item.role === "student")
            })

            setUser(filterTeacher);

            let filteredData = []
            filterTeacher.map((item) => {
                return filteredData.push({ id: item.id, student_id: item.student_id, first_name: item.first_name, student_year: item.student_year, email: item.email, role: item.role })
            })

            setData(filteredData);
        });
    }


    function changeStatus(ID) {
        setEditingIndex([ID])
    }


    async function deleteLimitCase(id) {
        console.log("Delete ID :", id)
        await axios.delete("http://10.6.21.41:8080/name/realdelete/" + id);
        return axios.get("http://10.6.21.41:8080/name/find/all").then((item) => {

            let setTeacher = item.data;
            let filterTeacher = setTeacher.filter((item) => {
                return (item.role === "student")
            })

            return setData(filterTeacher);
        });

    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function submitForm(student_id, first_name, student_year, email, role) {

        const filterFindID = allRole.filter((item) => {
            return ((item.student_id === student_id) || (item.email === email))
        })

        if (filterFindID.length === 0) {
            const ApiSet = ({ student_id: student_id, first_name: first_name, student_year: student_year, email: email, role: role })
            console.log("Api set :", ApiSet)
            if ((student_id === undefined) || (first_name === undefined) || (student_year === undefined) || (email === undefined)) {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน")
            } else {

                await axios.post("http://10.6.21.41:8080/name/create", ApiSet).then((res) => {
                    return console.log("Res Limit :", res)
                })
                await axios.get("http://10.6.21.41:8080/name/find/all").then((item) => {
                    console.log("Name :", item.data)

                    let setTeacher = item.data;
                    let filterTeacher = setTeacher.filter((item) => {
                        return (item.role === "student")
                    })
                    setData(filterTeacher)
                    return setUser(filterTeacher);
                });
                return closeModal();

            }
        } else {
            alert("มีรหัสนักศึกษาหรือ Email นี้อยู่แล้ว")
        }
    }

    const formik = useFormik({
        initialValues: {
            student_id: '',
            first_name: '',
            student_year: '',
            email: '',
            role: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required('Required'),
            email: Yup.string().email('Invalid email address')
                .required('Required'),
            role: Yup.string()
                .required('Required'),


        }),
        onSubmit: values => {
            return submitForm(values.student_id, values.first_name, values.student_year, values.email, values.role);
        },
    });


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
            setUserExcel(d);
        });
    }


    async function updatetheStudent(id, studentId, name, studentYear, email, role) {

        let getStudentID = { student_id: studentId }
        let getName = { first_name: name }
        let getStudentYear = { student_year: studentYear }
        let getEmail = { email: email }
        let getRole = { role: role }

        console.log("id :", id, " getName :", getName, " getEmail :", getEmail, " getRole :", getRole)
        await axios.put("http://10.6.21.41:8080/name/updateUser/" + id, getStudentID);
        await axios.put("http://10.6.21.41:8080/name/updateUser/" + id, getName);
        await axios.put("http://10.6.21.41:8080/name/updateUser/" + id, getStudentYear);
        await axios.put("http://10.6.21.41:8080/name/updateUser/" + id, getEmail);
        await axios.put("http://10.6.21.41:8080/name/updateUser/" + id, getRole);

        return getDetails();
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
                        <Nav.Link style={{ color: '#0080ff', fontSize: '23px' }} as={Link} to="/AdminStudent">นักศึกษา</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminStudentAdmin">แอดมิน</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminTeacher">อาจารย์</Nav.Link>
                        <Nav.Link style={{ color: '#424242', fontSize: '23px' }} as={Link} to="/AdminUnit">เก้าอี้ทันตกรรม</Nav.Link>
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
                            <h1 style={{ color: '#198CFF', fontWeight: 'bold', float: 'right' }}>รายชื่อผู้ใช้งาน</h1>
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
                                        let student_id = newData.student_id;
                                        let first_name = newData.first_name;
                                        let student_year = newData.student_year;
                                        let email = newData.email;
                                        let role = newData.role;
                                        submitForm(student_id, first_name, student_year, email, role)
                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        console.log("newData :", newData)
                                        updatetheStudent(oldData.id, newData.student_id, newData.first_name, newData.student_year, newData.email, newData.role)
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
                <StyledCreate
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="modal">
                    <CloseButton onClick={() => closeModal()} style={{ marginRight: '10px', marginTop: '5px' }} />
                    <center>
                        <h1 style={{ color: '#198CFF', fontWeight: 'bold', marginTop: '10px' }}>รายละเอียดผู้ใช้</h1>
                    </center>
                    <div style={{ marginLeft: '30%', marginBottom: '20px' }}>

                        <form onSubmit={formik.handleSubmit}>

                            <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="od">ชื่อผู้ใช้งาน :&nbsp;</label>
                            <Input
                                style={{ fontSize: '18px' }}
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className="error">{formik.errors.first_name}</div>
                            ) : null} <br />


                            <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="od">Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <Input
                                style={{ fontSize: '18px' }}
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null} <br />

                            <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor="od">ตำแหน่ง :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <Input
                                style={{ fontSize: '18px' }}
                                id="role"
                                name="role"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            />
                            {formik.touched.role && formik.errors.role ? (
                                <div className="error">{formik.errors.role}</div>
                            ) : null} <br />


                            <hr
                                style={{
                                    color: 'color',
                                    backgroundColor: 'color',
                                    height: '5',
                                    width: '400px',
                                    marginLeft: '-50px'

                                }}
                            />
                            <div style={{ marginLeft: '50px' }}>
                                <label style={{ marginRight: '10px', marginLeft: '-100px' }}>อัพโหลดโดย Excel : {" "}</label>
                                <input style={{ marginBottom: '0px' }} type="file" onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }} />
                            </div>

                            <br /><Button style={{ marginLeft: '80px', fontSize: '22px', marginTop: '-10px' }} className="But" type="submit">ยืนยัน</Button>
                        </form>
                    </div>
                </StyledCreate>
            </div>
            {
                userExcel.length !== 0 ? (<div>
                    {console.log("มาแล้ว :", userExcel)}
                    <ModalUser excel={userExcel} setUserExcel={setUserExcel} setData={setData} /></div>) : (console.log("ยัง"))
            }
        </div>
    )
}
export default AdminStudent;