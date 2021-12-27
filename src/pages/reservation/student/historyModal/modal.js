import React, { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import StyleModal from "./historyCss";
import { Button } from 'react-bootstrap';
import axios from "axios";
import './modalCss.css'

const HistoryModal = ({ unique, unit, name, year, date, clinic, type, patient, dn, hn, status }) => {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [Tool, setTools] = useState([]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    useEffect(() => {
        getTools();
    }, [modalIsOpen])

    const getTools = () => {
        axios.get('http://10.6.21.41:8080/Tool/find/all').then((item) => {
            console.log("data :", item.data)
            return filterToolsDetails(item.data);
        });
    }

    const filterToolsDetails = (item) => {
        const res = item.filter((item) => {
            return (item.uniqueID === unique)
        })
        console.log("Details Tools:", res)
        setTools(res);
    }

    return (
        <div>
            <StyleModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="modal"
            >

                <div>
                    <Card border="dark" style={{ width: '400px', fontFamily: "Mitr, sans-serif,Noto Sans Thai Looped,sans-serif" }}>

                        <Card.Header><h2 style={{ color: '#0080ff', textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>ข้อมูลการจอง</h2>
                            <CloseButton style={{ marginLeft: '85%', marginTop: '-50px' }} onClick={closeModal} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{ color: '#0080ff', textAlign: 'center', fontSize: '25px', marginTop: '-10px' }}>รายละเอียด</Card.Title>
                            <Card.Text>
                                <Container>
                                    <Row>
                                        <Col><p>Date : {date}</p></Col>
                                        <Col><p>Clinic : {clinic}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col><p>Name : {name}</p> </Col>
                                        <Col><p>Year : {year}</p> </Col>
                                    </Row>
                                    <Row>
                                        <Col><p>Work Type : {type}</p></Col>
                                        <Col><p>Unit : {unit}</p></Col>

                                    </Row>
                                    <Row>
                                        <Col><p>dn : {dn}</p></Col>
                                        <Col><p>hn : {hn}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col><p>Patient : {patient}</p></Col>
                                    </Row>
                                </Container>
                                <Card.Title style={{ color: '#0080ff', textAlign: 'center', fontSize: '25px' }}>รายการอุปกรณ์</Card.Title>
                                <p>สถานะการจองอุปกรณ์ : <Button style={{ backgroundColor: '#2bc42b', color: 'black' }}>{status}</Button></p>
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
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </StyleModal>
        </div>
    );
};

export default HistoryModal;
