import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../App';
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MaterialTable from "material-table";


const StudentLimt = ({ setIsOpen }) => {

    const { user, currentDate, currentMonth } = useContext(AuthContext);
    const [limit, setLimit] = useState([]);

    const [data, setData] = useState([]);


    useEffect(() => {
        getDetails();
        console.log("User :", user)
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
                return (parsed >= currentMonth && digitRealDate >= thisDate)
            })

            console.log("Filter Month :", filterMonth)

            setLimit(filterMonth);
            let itemData = []
            filterMonth.map((item) => {
                return itemData.push({ date: item.date, time: item.time, od: item.od, tmd: item.tmd, oper: item.oper, perio: item.perio, sur: item.sur, prosth: item.prosth, endo: item.endo, pedo: item.endo, xray: item.xray, om: item.om, ortho: item.ortho })
            })
            setData(itemData);
        });
    }


    function openModal() {
        return setIsOpen(true);
    }

    return (
        <div >
            <h1 style={{ color: '#198CFF', fontWeight: 'bold' }}>จำนวนภาระงานที่สามารถจองได้</h1>
            <Row>

                <Col sm={2}>
                    <Button onClick={() => openModal()} style={{ backgroundColor: '#198CFF', fontWeight: 'bold', marginLeft: '-30px', marginBottom: '-38px' }}>จองการทำงาน</Button>
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
                options={{
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
        </div >
    )
}
export default StudentLimt;