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

const ModalUnit = ({ excel, unit, setData, setItems }) => {


    const history = useHistory();

    const [show, setShow] = useState(true);
    const [duplicateLenght, setDuplicate] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };

    useEffect(() => {
        getDetails();
        console.log("getExcel :", excel);
    }, [excel])


    const getDetails = () => {
        axios.get("http://10.6.21.41:8080/unit/find/all").then((item) => {
            console.log("Unit :", item.data)

            let testFindDup = item.data;
            let DupLenght = 0;
            testFindDup.map((items) => {
                let theLenght = excel.filter((item) => {
                    return (item.Name === items.unit_code)
                })
                if (theLenght.length === 0) {
                    return console.log("ไม่มีซ้ำ :")
                } else {
                    DupLenght = DupLenght + 1;
                    return console.log("ซ้ำ")
                }
            })
            setDuplicate(DupLenght)

        });
    }


    async function createUnit() {
        if (duplicateLenght !== 0) {
            alert("กรุณาลบข้อมูลที่ซ้ำออกก่อนทำการอัพโหลดข้อมูล")
        } else {
            const confirmBox = window.confirm("ต้องการยืนยันการเพิ่มรายชื่อยูนิตหรือไม่")
            if (confirmBox == true) {
                console.log(confirmBox)
                console.log("excel :", excel)
                for (let i = 0; i < excel.length; i++) {
                    let a = [{
                        // date: listExcel[i].วันที่,
                        unit_code: excel[i].Name,
                        unit_floor: excel[i].ชั้น,
                        unit_type: null,
                        unavailable_start_date: "active",
                        unavailable_end_date: "non",

                    }]
                    console.log("Check A :", a)
                    await axios.post("http://10.6.21.41:8080/unit/createMultiTable", a).then((res) => {
                        console.log("Res Limit :", res)
                    })
                }
                await axios.get("http://10.6.21.41:8080/unit/find/all").then((item) => {
                    console.log("Unit :", item.data)
                    return setData(item.data);
                });
                return handleClose();
            } else {
                console.log(confirmBox)
            }
        }
    }

    function checkColor(Name) {
        let color = "black"

        console.log("allDate", unit)
        unit?.map((item) => {
            if (item.unit_code === Name) {
                console.log("ซ้ำ item.unit_code :", item.unit_code, " Name :", Name)
                return color = "red";
            } else {
                console.log(" ไม่ item.unit_code :", item.unit_code, " Name :", Name)
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
        setItems(checkDup);
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
                                    title: 'ชื่อ Unit', field: 'Name', cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.Name), minWidth: 210 }
                                    }
                                },

                                {
                                    title: 'ชั้น', field: 'ชั้น', cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.Name) }
                                    }
                                },
                            ]}
                            data={excel}
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
                    <Button variant="primary" onClick={() => createUnit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ModalUnit;
