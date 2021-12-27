import React, { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useHistory } from "react-router-dom";
import StyleModal from "./LimitCss";
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import './modalCss.css'

import Modal from 'react-bootstrap/Modal'
import MaterialTable from "material-table";

const ModalAdmin = ({ excel, setUserExcel, setData }) => {
    const [modalIsOpen, setIsOpen] = React.useState(true);

    const history = useHistory();

    const [allDate, setAllDate] = useState([]);

    const [duplicateLenght, setDuplicate] = useState(0)
    const [studentRole, setRole] = useState([])

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };

    useEffect(() => {
        filterStudentRole();
        console.log("getExcel :", excel);
    }, [excel])

    function filterStudentRole() {
        let realRole = excel.filter((item) => {
            return ((item.ตำแหน่ง === "studentadmin") || (item.ตำแหน่ง === "admin") || (item.ตำแหน่ง === "AdminTool"))
        })
        setRole(realRole)

        return getDetails(realRole)
    }

    const getDetails = (realRole) => {
        axios.get("http://10.6.21.41:8080/name/find/all").then((item) => {
            let testFindDup = item.data;
            setAllDate(item.data)
            let DupLenght = 0;
            testFindDup.map((items) => {
                let theLenght = realRole.filter((item) => {
                    return (item.Email === items.email)
                })
                if (theLenght.length === 0) {
                    return console.log("ไม่มีซ้ำ :")
                } else {
                    DupLenght = DupLenght + 1;
                    return console.log("ซ้ำ")
                }
            })

            console.log("ซ้ำทั้งหมด :", DupLenght)
            setDuplicate(DupLenght)
        });
    }

    async function createUser() {
        if (duplicateLenght !== 0) {
            return alert("กรุณาลบข้อมูลที่ซ้ำออกก่อนทำการอัพโหลดข้อมูล")
        } else {
            const confirmBox = window.confirm("ต้องการยืนยันการเพิ่มรายชื่อผู้ใช้งานหรือไม่")
            if (confirmBox == true) {
                console.log(confirmBox)
                console.log("excel :", excel)
                for (let i = 0; i < excel.length; i++) {
                    let a = [{
                        student_id: excel[i].ID,
                        first_name: excel[i].ชื่อสกุล,
                        student_year: null,
                        email: excel[i].Email,
                        role: excel[i].ตำแหน่ง,

                    }]
                    console.log("Check A :", a)
                    await axios.post("http://10.6.21.41:8080/name/createMultiTable", a).then((res) => {
                        console.log("Res Limit :", res)
                    })
                }
                await axios.get("http://10.6.21.41:8080/name/find/all").then((item) => {
                    console.log("Name :", item.data)
                    let setTeacher = item.data;
                    let filterTeacher = setTeacher.filter((item) => {
                        return ((item.role === "studentadmin") || (item.role === "admin") || (item.role === "AdminTool"))
                    })
                    return setData(filterTeacher);
                });
                return handleClose();
            } else {
                console.log(confirmBox)
            }
        }
    }

    function checkColor(email) {
        let color = "black"

        console.log("allDate", allDate)
        allDate?.map((item) => {
            if (item.email === email) {
                console.log("ซ้ำ item.email :", item.email, " email :", email)
                return color = "red";
            } else {
                console.log(" ไม่ item.email :", item.email, " email :", email)
            }
        })
        return color;
    }

    function deleteDuplicate(data) {
        console.log("data delete :", data)
        const checkDup = excel.filter((item) => {
            return (item.tableData.checked !== true)
        })
        console.log("new Data :", checkDup)
        setUserExcel(checkDup);
    }


    return (
        <div>

            <Modal size='xl' style={{ fontFamily: 'Mitr' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>รายละเอียดการจอง</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container>
                        <MaterialTable
                            title={duplicateLenght === 0 ? "Mae Fah Luang University Dental Clinic" : "ข้อมูลที่อัพโหลดซ้ำกับข้อมูลที่มีอยู่ ,กรุณาลบข้อมูลที่ซ้ำออก"}

                            columns={[

                                {
                                    title: 'ชื่อ-สกุล', field: 'ชื่อสกุล', cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.Email), minWidth: 210 }
                                    }

                                },

                                {
                                    title: 'Email', field: 'Email', cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.Email) }
                                    }
                                },
                                {
                                    title: 'ตำแหน่ง', field: 'ตำแหน่ง', cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.Email) }
                                    }
                                },
                            ]}
                            data={studentRole}
                            options={{
                                selection: true,
                                pageSize: excel.length,
                                pageSizeOptions: [excel.length],
                                headerStyle: {
                                    fontFamily: "Mitr",
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                }, tableLayout: 'auto'
                            }}
                            actions={[
                                {
                                    tooltip: 'ลบ',
                                    icon: 'delete',
                                    onClick: (evt, data) => deleteDuplicate(data)
                                }
                            ]}
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
                                    nRowsSelected: 'ถูกเลือก {0} รายการ',
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => createUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalAdmin;
