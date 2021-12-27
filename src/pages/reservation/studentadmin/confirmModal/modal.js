import React, { useEffect, useContext, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import Card from 'react-bootstrap/Card'
import StyleModal from "./LimitCss";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import './modalCss.css'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import MaterialTable from "material-table";
import { AuthContext } from '../../../../App';

const ConfirmLimit = ({ excel, setLimit, setExcel, CloseReser, details }) => {
    const { currentDate, currentMonth } = useContext(AuthContext);

    const [allDate, setAllDate] = useState([]);

    const [duplicateLenght, setDuplicate] = useState(0)

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };


    let history = useHistory();

    useEffect(() => {
        getDetails();
        console.log("getExcel :", excel);
    }, [excel])

    async function getDetails() {
        await axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
            setAllDate(item.data)
            let testFindDup = item.data;

            let DupLenght = 0;
            testFindDup.map((items) => {
                let theLenght = excel.filter((item) => {
                    return ((item.วันที่ === items.date) && (item.เวลา === items.time))
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

    async function createLimit() {
        if (duplicateLenght !== 0) {
            return alert("กรุณาลบข้อมูลที่ซ้ำออกก่อนทำการอัพโหลดข้อมูล")
        } else {
            const confirmBox = window.confirm("ต้องการยืนยันการจำกัดงานหรือไม่")
            if (confirmBox == true) {
                console.log(confirmBox)
                console.log("excel :", excel)
                for (let i = 0; i < excel.length; i++) {
                    let a = [{
                        date: excel[i].วันที่,
                        time: excel[i].เวลา,
                        od: excel[i].OD,
                        tmd: excel[i].TMD,
                        oper: excel[i].OPER,
                        perio: excel[i].PERIO,
                        sur: excel[i].SUR,
                        prosth: excel[i].RPOSTH,
                        endo: excel[i].ENDO,
                        pedo: excel[i].PEDO,
                        xray: excel[i].XRAY,
                        om: excel[i].OM,
                        ortho: excel[i].ORTHO,
                        odyOd: 0,
                        odyTmd: 0,
                        odyOper: 0,
                        odyPerio: 0,
                        odySur: 0,
                        odyProsth: 0,
                        odyEndo: 0,
                        odyPedo: 0,
                        odyXray: 0,
                        odyOm: 0,
                        odyOrtho: 0
                    }]
                    console.log("Check A :", a)
                    await axios.post("http://10.6.21.41:8080/limitcase/createMultiTable", a).then((res) => {
                        console.log("Res Limit :", res)
                    })

                }
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
                    // && digitRealDate=>
                    return setLimit(filterMonth);
                });
                CloseReser(false);
                handleClose();
                return history.push('/StudentAdminDashboard')
            } else {
                console.log(confirmBox)
            }
        }
    }

    function checkColor(date, time) {
        let color = "black"

        allDate?.map((item) => {
            if ((item.date === date) && (item.time === time)) {
                // console.log(" ตรง item.date :", item.date, " item.time :", item.time, " date :", date, " time :", time)
                return color = "red";
            } else {
                // console.log(" ไม่ item.date :", item.date, " item.time :", item.time, " date :", date, " time :", time)
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
        setExcel(checkDup);
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
                            title={duplicateLenght === 0 ? "Mae Fah Luang University Dental Clinic" : "ข้อมูลที่อัพโหลดซ้ำกับข้อมูลที่มีอยู่ " + duplicateLenght + " แถว ,กรุณาลบข้อมูลที่ซ้ำออก"}

                            columns={[
                                {
                                    title: 'วันที่', field: 'วันที่',
                                    cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา), minWidth: 140 }
                                    }
                                },
                                {
                                    title: 'เวลา', field: 'เวลา'
                                    , lookup: { ช่วงเช้า: 'ช่วงเช้า', ช่วงบ่าย: 'ช่วงบ่าย' }
                                    , cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา), minWidth: 40 }
                                    }
                                },
                                {
                                    title: 'OD', field: 'OD', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'TMD', field: 'TMD', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'OPER', field: 'OPER', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'PERIO', field: 'PERIO', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'SUR', field: 'SUR', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'PROSTH', field: 'RPOSTH', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'ENDO', field: 'ENDO', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'PEDO', field: 'PEDO', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'X-RAY', field: 'XRAY', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา), minWidth: 114 }
                                    }
                                },
                                {
                                    title: 'OM', field: 'OM', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
                                    }
                                },
                                {
                                    title: 'ORTHO', field: 'ORTHO', type: "numeric", cellStyle: (cellValue, rowData) => {
                                        return { color: checkColor(rowData?.วันที่, rowData?.เวลา) }
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
                    <Button variant="primary" onClick={() => createLimit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
};

export default ConfirmLimit;
