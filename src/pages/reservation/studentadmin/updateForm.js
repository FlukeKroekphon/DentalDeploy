import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";

const FormInput = ({
    item,
    editingIndex, setEditingIndex, getDetails
}) => {

    const [UpdateCase, setUpdate] = useState([]);

    const [getOd, setOd] = useState(item.od);
    const [getTmd, setTmd] = useState(item.tmd);
    const [getOper, setOper] = useState(item.oper);
    const [getPerio, setPerio] = useState(item.perio);
    const [getSur, setSur] = useState(item.sur);
    const [getProsth, setProsth] = useState(item.prosth);
    const [getEndo, setEndo] = useState(item.endo);
    const [getPedo, setPedo] = useState(item.pedo);
    const [getXray, setXray] = useState(item.xray);
    const [getOm, setOm] = useState(item.om);
    const [getOrtho, setOrtho] = useState(item.ortho);

    useEffect(() => {
        console.log("Update :", UpdateCase)
    }, [UpdateCase])

    function handelEditInputChangeOD(e) {
        setOd({ od: parseInt(e.target.value) })
    }

    function handelEditInputChangeTMD(e) {
        setTmd({ tmd: parseInt(e.target.value) })
    }

    function handelEditInputChangeOPER(e) {
        setOper({ oper: parseInt(e.target.value) })
    }

    function handelEditInputChangePERIO(e) {
        setPerio({ perio: parseInt(e.target.value) })
    }

    function handelEditInputChangeSUR(e) {
        setSur({ sur: parseInt(e.target.value) })
    }

    function handelEditInputChangePROSTH(e) {
        setProsth({ prosth: parseInt(e.target.value) })
    }

    function handelEditInputChangeENDO(e) {
        setEndo({ endo: parseInt(e.target.value) })
    }

    function handelEditInputChangePEDO(e) {
        setPedo({ pedo: parseInt(e.target.value) })
    }

    function handelEditInputChangeXRAY(e) {
        setXray({ xray: parseInt(e.target.value) })
    }

    function handelEditInputChangeOM(e) {
        setOm({ om: parseInt(e.target.value) })
    }

    function handelEditInputChangeORTHO(e) {
        setOrtho({ ortho: parseInt(e.target.value) })
    }

    async function handelEditFormSubmit(e) {
        e.preventDefault();
        let limit_id = editingIndex[0];

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

        const removeIndex = editingIndex.filter((item) => {
            return item !== editingIndex[0];
        })
        setEditingIndex(removeIndex)

        return getDetails;

    }

    function setFalse(revIndex) {
        const removeIndex = editingIndex.filter((item) => {
            return item !== revIndex
        })
        setEditingIndex(removeIndex)
    }


    return (
        // <form>
        <tbody>
            <tr>
                <td className='tdStudent'>
                    {item.date}
                </td>
                <td className='tdStudent'>
                    {item.time}
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeOD} type={'number'} style={{ width: '35px' }} defaultValue={item.od}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeTMD} type={'number'} style={{ width: '35px' }} defaultValue={item.tmd}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeOPER} type={'number'} style={{ width: '35px' }} defaultValue={item.oper}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangePERIO} type={'number'} style={{ width: '35px' }} defaultValue={item.perio}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeSUR} type={'number'} style={{ width: '35px' }} defaultValue={item.sur}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangePROSTH} type={'number'} style={{ width: '35px' }} defaultValue={item.prosth}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeENDO} type={'number'} style={{ width: '35px' }} defaultValue={item.endo}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangePEDO} type={'number'} style={{ width: '35px' }} defaultValue={item.pedo}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeXRAY} type={'number'} style={{ width: '35px' }} defaultValue={item.xray}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeOM} type={'number'} style={{ width: '35px' }} defaultValue={item.om}></input>
                </td>
                <td className='tdStudent'>
                    <input onChange={handelEditInputChangeORTHO} type={'number'} style={{ width: '35px' }} defaultValue={item.ortho}></input>
                </td>
                <td className='tdStudent'><Button onClick={handelEditFormSubmit} style={{ backgroundColor: 'green' }}>อัพเดท</Button></td>
                <td className='tdStudent'><Button onClick={() => setFalse(item.limit_id)} style={{ backgroundColor: 'red' }}>ยกเลิก</Button></td>
            </tr>
        </tbody>
        // </form>
    )
}

export default FormInput;