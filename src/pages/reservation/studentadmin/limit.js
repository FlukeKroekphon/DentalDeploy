import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../../App';
import axios from "axios";
import { Button } from 'react-bootstrap';
import FormInput from './updateForm';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsSearch } from "react-icons/bs";

import MaterialTable from "material-table";

const Limit = ({ setIsOpen }) => {
    const { user, limit, setLimit, currentDate, currentMonth } = useContext(AuthContext);
    const [searchDate, setSearchDate] = useState([]);
    const [editingIndex, setEditingIndex] = useState([]);

    const [columns, setColumns] = useState([
        {
            title: 'วันที่', field: 'date', cellStyle: {
                minWidth: 140,
            },
        },
        {
            title: 'เวลา', field: 'time', cellStyle: {
                minWidth: 125,
            },
        },
        { title: 'OD', field: 'od', type: 'number' },
        { title: 'TMD', field: 'tmd', type: 'number' },
        { title: 'OPER', field: 'oper', type: 'number' },
        { title: 'PERIO', field: 'perio', type: 'number' },
        { title: 'SUR', field: 'sur', type: 'number' },
        { title: 'PROSTH', field: 'prosth', type: 'number' },
        { title: 'ENDO', field: 'endo', type: 'number' },
        { title: 'PEDO', field: 'pedo', type: 'number' },
        { title: 'X-RAY', field: 'xray', type: 'number' },
        { title: 'OM', field: 'om', type: 'number' },
        { title: 'ORTHO', field: 'ortho', type: 'number' },

    ]);

    const [data, setData] = useState([]);


    useEffect(() => {
        getDetails();
        console.log("User :", user)
    }, [user])

    const getDetails = () => {
        // http://selab.mfu.ac.th:8318/limitcase/find/all
        axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
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

            // let filteredData = []
            // filterMonth.map((item) => {
            //     return filteredData.push({ id: item.id, student_id: item.student_id, first_name: item.first_name, student_year: item.student_year, email: item.email, role: item.role })
            // })

            setData(filterMonth);

            return setLimit(filterMonth);
        });
    }

    async function deleteLimitCase(id) {
        console.log("Delete ID :", id)
        const confirmBox = window.confirm("ต้องการลบภาระงานนี้หรือไม่")
        if (confirmBox == true) {
            console.log(confirmBox)
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
                return setLimit(filterMonth);
            });
        } else {
            console.log(confirmBox)
        }
    }

    function changeStatus(ID) {
        setEditingIndex([ID])
    }



    function openModal() {
        return setIsOpen(true);
    }

    async function onChangeSearch(e) {
        axios.get("http://10.6.21.41:8080/limitcase/find/all").then((item) => {
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
        console.log("Change Date :", e.target.value)
        setSearchDate(e.target.value)
    }

    function Searching() {
        console.log("Searching :", searchDate)
        const checking = limit.filter((item) => {
            return item.date === searchDate
        })
        console.log("Filter Date", checking)
        setLimit(checking)
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


    return (
        <div >
            <MaterialTable
                title="Mae Fah Luang University Dental Clinic"
                columns={columns}
                data={data}
                options={{
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
                                // submitForm(student_id, first_name, student_year, email, role)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log("newData :", newData)
                                // updatetheStudent(oldData.id, newData.student_id, newData.first_name, newData.student_year, newData.email, newData.role)
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
            <Button onClick={() => openModal()} style={{ backgroundColor: '#198CFF', fontWeight: 'bold', marginLeft: '1200px', marginTop: '-60px', width: '145px' }}>กำหนดภาระงาน</Button>



            {/* <Table striped bordered hover variant="" style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}>
                <thead className='theadAdmin'>
                    <tr style={{ fontSize: '18px' }}>
                        <th>วันที่</th>
                        <th>เวลา</th>
                        <th>OD</th>
                        <th>TMD</th>
                        <th>OPER</th>
                        <th>PERIO</th>
                        <th>SUR</th>
                        <th>PROSTH</th>
                        <th>ENDO</th>
                        <th>PEDO</th>
                        <th>X-RAY</th>
                        <th>OM</th>
                        <th>ORTHO</th>
                        <th>แก้ไขรายละเอียด</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                {limit.map((item) => {
                    return editingIndex.includes(item.limit_id) ? (
                        <FormInput item={item}
                            editingIndex={editingIndex}
                            setEditingIndex={setEditingIndex}
                            getDetails={getDetails()}
                        />) : (<tbody key={item.limit_id}>
                            {console.log("-----rerender----")}
                            <tr>
                                <td className='tdStudent'>{item.date}</td>
                                <td className='tdStudent'>{item.time}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.od), fontWeight: checkFont(item.od) }}>{item.od}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.tmd), fontWeight: checkFont(item.tmd) }}>{item.tmd}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.oper), fontWeight: checkFont(item.oper) }}>{item.oper}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.perio), fontWeight: checkFont(item.perio) }}>{item.perio}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.sur), fontWeight: checkFont(item.sur) }}>{item.sur}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.prosth), fontWeight: checkFont(item.prosth) }}>{item.prosth}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.endo), fontWeight: checkFont(item.endo) }}>{item.endo}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.pedo), fontWeight: checkFont(item.pedo) }}>{item.pedo}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.xray), fontWeight: checkFont(item.xray) }}>{item.xray}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.om), fontWeight: checkFont(item.om) }}>{item.om}</td>
                                <td className='tdStudent' style={{ color: checkColor(item.ortho), fontWeight: checkFont(item.ortho) }}>{item.ortho}</td>
                                <td className='tdStudent'><Button onClick={() => changeStatus(item.limit_id)}>แก้ไข</Button></td>
                                <td className='tdStudent'><Button onClick={() => deleteLimitCase(item.limit_id)} style={{ backgroundColor: 'red' }}>ลบ</Button></td>
                            </tr>
                        </tbody>)
                })}
            </Table> */}

        </div >
    )
}
export default Limit;