import StyleModal from './index.view'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CloseButton from 'react-bootstrap/CloseButton'
import axios from 'axios'
import '../../Yup.css'
import { Label } from 'semantic-ui-react'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useHistory } from 'react-router-dom'
import Toolcss from './Toolcss.css'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../../../App'

const ToolModal = ({ dataSetBeforeCofirm, details, limit }) => {
    // const [modalIsOpen, setIsOpen] = React.useState(true)
    const { user } = useContext(AuthContext);
    const [confirmtool, setconfirmtool] = useState([])
    const [getUnique, setUnique] = useState([]);
    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const history = useHistory()

    const [api, setApi0] = useState([])


    useEffect(() => {
        console.log('getApifrompage1 ? ===>', api)
    }, [api])

    function uniqueID() {
        console.log("Called")
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }

    function submitForm(
        testkit_toolcc1,
        glassofwater_toolcc1,
        Tripplesyring_toolcc1,
        FabricMiddlepunch_toolcc1,
        veil_toolcc1,
        UNC15Probe_toolcc1,
        medicinecup_toolcc1,
        Dappendish_toolcc1,
        Mouthprop_toolcc1,
        Glasslab_toolcc1,
        Airotor_toolcc1,
        Contra_toolcc1,
        cottonbud_toolcc1,
        Rubbercup_toolcc1,
        AnestheticSyringe_toolcc1,
        BladeHolder_toolcc1,
        Blade_toolcc1,
        Compositstopperset_toolcc1,
        Amalgamfillingset_toolcc1,
        Compositsandingsetslowrewind_toolcc1,
        Compositsandingsetfastrewinding_toolcc1,
        plasticcomposit_toolcc1,
        Spoonexcavatorlarge_toolcc1,
        MatrixV3_toolcc1,
        MatrixV3Forcep_toolcc1,
        Rounddimondbursetslow_toolcc1,
        Cylinderdimondbursetslow_toolcc1,
        Rounddimondbursetfast_toolcc1,
        Cylinderdimondbursetfast_toolcc1,
        Dycalcarrier_toolcc1,
        Spatulaplastic_toolcc1,
        Cementspatula_toolcc1,
        Mendrelscrubset_toolcc1,
        Poponsmall_toolcc1,
        Rubberdamset_toolcc1,
        clamp_toolcc1,
        Steelheadslowdown_toolcc1,
        Astropolpolishingset_toolcc1,
        IvoryTofflemirematrix_toolcc1,
        hightpowersuction_toolcc1
    ) {
        let a = uniqueID()
        setUnique(a);
        const ApiSet1 = {

            uniqueID: a,
            testkit_toolcc1: testkit_toolcc1,
            glassofwater_toolcc1: glassofwater_toolcc1,
            Tripplesyring_toolcc1: Tripplesyring_toolcc1,
            FabricMiddlepunch_toolcc1: FabricMiddlepunch_toolcc1,
            veil_toolcc1: veil_toolcc1,
            UNC15Probe_toolcc1: UNC15Probe_toolcc1,
            medicinecup_toolcc1: medicinecup_toolcc1,
            Dappendish_toolcc1: Dappendish_toolcc1,
            Mouthprop_toolcc1: Mouthprop_toolcc1,
            Glasslab_toolcc1: Glasslab_toolcc1,
            Airotor_toolcc1: Airotor_toolcc1,
            Contra_toolcc1: Contra_toolcc1,
            cottonbud_toolcc1: cottonbud_toolcc1,
            Rubbercup_toolcc1: Rubbercup_toolcc1,
            AnestheticSyringe_toolcc1: AnestheticSyringe_toolcc1,
            BladeHolder_toolcc1: BladeHolder_toolcc1,
            Blade_toolcc1: Blade_toolcc1,
            Compositstopperset_toolcc1: Compositstopperset_toolcc1,
            Amalgamfillingset_toolcc1: Amalgamfillingset_toolcc1,
            Compositsandingsetslowrewind_toolcc1: Compositsandingsetslowrewind_toolcc1,
            Compositsandingsetfastrewinding_toolcc1: Compositsandingsetfastrewinding_toolcc1,
            plasticcomposit_toolcc1: plasticcomposit_toolcc1,
            Spoonexcavatorlarge_toolcc1: Spoonexcavatorlarge_toolcc1,
            MatrixV3_toolcc1: MatrixV3_toolcc1,
            MatrixV3Forcep_toolcc1: MatrixV3Forcep_toolcc1,
            Rounddimondbursetslow_toolcc1: Rounddimondbursetslow_toolcc1,
            Cylinderdimondbursetslow_toolcc1: Cylinderdimondbursetslow_toolcc1,
            Rounddimondbursetfast_toolcc1: Rounddimondbursetfast_toolcc1,
            Cylinderdimondbursetfast_toolcc1: Cylinderdimondbursetfast_toolcc1,
            Dycalcarrier_toolcc1: Dycalcarrier_toolcc1,
            Spatulaplastic_toolcc1: Spatulaplastic_toolcc1,
            Cementspatula_toolcc1: Cementspatula_toolcc1,
            Mendrelscrubset_toolcc1: Mendrelscrubset_toolcc1,
            Poponsmall_toolcc1: Poponsmall_toolcc1,
            Rubberdamset_toolcc1: Rubberdamset_toolcc1,
            clamp_toolcc1: clamp_toolcc1,
            Steelheadslowdown_toolcc1: Steelheadslowdown_toolcc1,
            Astropolpolishingset_toolcc1: Astropolpolishingset_toolcc1,
            IvoryTofflemirematrix_toolcc1: IvoryTofflemirematrix_toolcc1,
            hightpowersuction_toolcc1: hightpowersuction_toolcc1
        }
        setconfirmtool([ApiSet1])
        handleShowOpen()


    }

    function submitConfirmTools() {
        const confirmBox = window.confirm('ต้องการยืนยันการจองหรือไม่')
        if (confirmBox == true) {

            let date = dataSetBeforeCofirm.date;
            let time = dataSetBeforeCofirm.time;
            let clinic = dataSetBeforeCofirm.clinic;
            let type = dataSetBeforeCofirm.type;
            let patient = dataSetBeforeCofirm.patient;
            let dn = dataSetBeforeCofirm.dn;
            let hn = dataSetBeforeCofirm.hn;

            const findCaseReserved = details.filter((item) => {
                return ((item.date === date) && (item.time === time))
            })

            const findDate = limit.filter((item) => {
                return ((item.date === date) && (item.time === time))
            })
            if (findCaseReserved.length !== 0) {
                alert("ไม่สามารถจองภาระงานในช่วงเวลาเดียวกันได้, กรุณาเปลี่ยนวันที่หรือช่วงเวลา")
                return history.push('/StudentDashboard')
            } else {
                if (findDate.length === 1) {
                    let a = getUnique;

                    console.log("Check Form :", user.first_name, user.student_year, date, time, clinic, type, patient, dn, hn);
                    const ApiSet = ({ name: user.first_name, uniqueID: a, studentyear: user.student_year, date: date, time: time, clinic: clinic, worktype: type, patient: patient, dn: dn, hn: hn, toolStatus: "รอการเบิก" })

                    if (clinic === "OD") {
                        if (findDate[0].od === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { od: findDate[0].od - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("OD = ", findDate[0].od)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyOd: findDate[0].odyOd + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "TMD") {
                        if (findDate[0].tmd === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { tmd: findDate[0].tmd - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateTMD = ", findDate[0].tmd)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyTmd: findDate[0].odyTmd + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "OPER") {
                        if (findDate[0].oper === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { oper: findDate[0].oper - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateOper = ", findDate[0].oper)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyOper: findDate[0].odyOper + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "PERIO") {
                        if (findDate[0].perio === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { perio: findDate[0].perio - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDatePerio = ", findDate[0].perio)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyPerio: findDate[0].odyPerio + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "SUR") {
                        if (findDate[0].sur === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { sur: findDate[0].sur - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateSur = ", findDate[0].sur)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odySur: findDate[0].odySur + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "PROSTH") {
                        if (findDate[0].prosth === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { prosth: findDate[0].prosth - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateProsth = ", findDate[0].prosth)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyProsth: findDate[0].odyProsth + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "ENDO") {
                        if (findDate[0].endo === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { endo: findDate[0].endo - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateEndo = ", findDate[0].endo)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyEndo: findDate[0].odyEndo + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "PEDO") {
                        if (findDate[0].pedo === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { pedo: findDate[0].pedo - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDatePedo = ", findDate[0].pedo)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyPedo: findDate[0].odyPedo + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "X-RAY") {
                        if (findDate[0].xray === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { xray: findDate[0].xray - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateXray = ", findDate[0].xray)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyXray: findDate[0].odyXray + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "OM") {
                        if (findDate[0].om === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { om: findDate[0].om - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateOm = ", findDate[0].om)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyOm: findDate[0].odyOm + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    } else if (clinic === "ORTHO") {
                        if (findDate[0].ortho === '0') {
                            alert("ภาระงานเต็มกรุณาจองใหม่กรุณาจองใหม่")
                            return history.push('/StudentDashboard')
                        } else {
                            console.log("FindDate :", findDate)
                            let limit_id = findDate[0].limit_id
                            let UpdateCase = { ortho: findDate[0].ortho - 1 }
                            console.log("limit ID :", limit_id)
                            console.log("findDateOrtho = ", findDate[0].ortho)
                            console.log(" Case - 1 :", UpdateCase)
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, UpdateCase);
                            let coutingLimit = { odyOrtho: findDate[0].odyOrtho + 1 }
                            axios.put("http://10.6.21.41:8080/limitcase/updateClinicCase/" + limit_id, coutingLimit);
                        }
                    }

                    console.log(confirmBox)
                    let ApiSet1 = confirmtool[0];
                    axios.post('http://10.6.21.41:8080/Tool/create', ApiSet1).then(res => {
                        console.log('Res API 1 SET :', res)
                        history.push('/StudentDashboard')
                    })
                    console.log('Apiset1 = ', ApiSet1)

                    return axios.post("http://10.6.21.41:8080/details/create", ApiSet).then((res) => {
                        console.log("Res Create Details :", res)
                        // setOpen(true);
                        // handleClose();
                    })

                } else {
                    alert('ไม่มีรายละเอียดงานวันที่เลือกกรุณาจองใหม่')
                    return history.push('/StudentDashboard')
                }
            }

        } else {
            alert('โปรตรวจสอบข้อมูลอีกครั้ง')
            console.log(confirmBox)
        }
    }

    const formik = useFormik({
        initialValues: {
            testkit_toolcc1: ' ',
            glassofwater_toolcc1: ' ',
            Tripplesyring_toolcc1: ' ',
            FabricMiddlepunch_toolcc1: ' ',
            veil_toolcc1: ' ',
            UNC15Probe_toolcc1: ' ',
            medicinecup_toolcc1: ' ',
            Dappendish_toolcc1: ' ',
            Mouthprop_toolcc1: ' ',
            Glasslab_toolcc1: ' ',
            Airotor_toolcc1: ' ',
            Contra_toolcc1: ' ',
            cottonbud_toolcc1: ' ',
            Rubbercup_toolcc1: ' ',
            AnestheticSyringe_toolcc1: ' ',
            BladeHolder_toolcc1: ' ',
            Blade_toolcc1: ' ',
            Compositstopperset_toolcc1: ' ',
            Amalgamfillingset_toolcc1: ' ',
            Compositsandingsetslowrewind_toolcc1: ' ',
            Compositsandingsetfastrewinding_toolcc1: ' ',
            plasticcomposit_toolcc1: ' ',
            Spoonexcavatorlarge_toolcc1: ' ',
            MatrixV3_toolcc1: ' ',
            MatrixV3Forcep_toolcc1: ' ',
            Rounddimondbursetslow_toolcc1: ' ',
            Cylinderdimondbursetslow_toolcc1: ' ',
            Rounddimondbursetfast_toolcc1: ' ',
            Cylinderdimondbursetfast_toolcc1: ' ',
            Dycalcarrier_toolcc1: ' ',
            Spatulaplastic_toolcc1: ' ',
            Cementspatula_toolcc1: ' ',
            Mendrelscrubset_toolcc1: ' ',
            Poponsmall_toolcc1: ' ',
            Rubberdamset_toolcc1: ' ',
            clamp_toolcc1: ' ',
            Steelheadslowdown_toolcc1: ' ',
            Astropolpolishingset_toolcc1: ' ',
            IvoryTofflemirematrix_toolcc1: ' ',
            hightpowersuction_toolcc1: ' '
        },
        validationSchema: Yup.object({
            testkit_toolcc1: Yup.string().required('Required'),
            glassofwater_toolcc1: Yup.string().required('Required'),
            Tripplesyring_toolcc1: Yup.string().required('Required'),
            FabricMiddlepunch_toolcc1: Yup.string().required('Required'),
            veil_toolcc1: Yup.string().required('Required'),
            UNC15Probe_toolcc1: Yup.string().required('Required'),
            medicinecup_toolcc1: Yup.string().required('Required'),
            Dappendish_toolcc1: Yup.string().required('Required'),
            Mouthprop_toolcc1: Yup.string().required('Required'),
            Glasslab_toolcc1: Yup.string().required('Required'),
            Airotor_toolcc1: Yup.string().required('Required'),
            Contra_toolcc1: Yup.string().required('Required'),
            cottonbud_toolcc1: Yup.string().required('Required'),
            Rubbercup_toolcc1: Yup.string().required('Required'),
            AnestheticSyringe_toolcc1: Yup.string().required('Required'),
            BladeHolder_toolcc1: Yup.string().required('Required'),
            Blade_toolcc1: Yup.string().required('Required'),
            Compositstopperset_toolcc1: Yup.string().required('Required'),
            Amalgamfillingset_toolcc1: Yup.string().required('Required'),
            Compositsandingsetslowrewind_toolcc1: Yup.string().required('Required'),
            Compositsandingsetfastrewinding_toolcc1: Yup.string().required(
                'Required'
            ),
            plasticcomposit_toolcc1: Yup.string().required('Required'),
            Spoonexcavatorlarge_toolcc1: Yup.string().required('Required'),
            MatrixV3_toolcc1: Yup.string().required('Required'),
            MatrixV3Forcep_toolcc1: Yup.string().required('Required'),
            Rounddimondbursetslow_toolcc1: Yup.string().required('Required'),
            Cylinderdimondbursetslow_toolcc1: Yup.string().required('Required'),
            Rounddimondbursetfast_toolcc1: Yup.string().required('Required'),
            Cylinderdimondbursetfast_toolcc1: Yup.string().required('Required'),
            Dycalcarrier_toolcc1: Yup.string().required('Required'),
            Spatulaplastic_toolcc1: Yup.string().required('Required'),
            Cementspatula_toolcc1: Yup.string().required('Required'),
            Mendrelscrubset_toolcc1: Yup.string().required('Required'),
            Poponsmall_toolcc1: Yup.string().required('Required'),
            Rubberdamset_toolcc1: Yup.string().required('Required'),
            clamp_toolcc1: Yup.string().required('Required'),
            Steelheadslowdown_toolcc1: Yup.string().required('Required'),
            Astropolpolishingset_toolcc1: Yup.string().required('Required'),
            IvoryTofflemirematrix_toolcc1: Yup.string().required('Required'),
            hightpowersuction_toolcc1: Yup.string().required('Required')
        }),
        onSubmit: values => {
            return submitForm(
                values.testkit_toolcc1,
                values.glassofwater_toolcc1,
                values.Tripplesyring_toolcc1,
                values.FabricMiddlepunch_toolcc1,
                values.veil_toolcc1,
                values.UNC15Probe_toolcc1,
                values.medicinecup_toolcc1,
                values.Dappendish_toolcc1,
                values.Mouthprop_toolcc1,
                values.Glasslab_toolcc1,
                values.Airotor_toolcc1,
                values.Contra_toolcc1,
                values.cottonbud_toolcc1,
                values.Rubbercup_toolcc1,
                values.AnestheticSyringe_toolcc1,
                values.BladeHolder_toolcc1,
                values.Blade_toolcc1,
                values.Compositstopperset_toolcc1,
                values.Amalgamfillingset_toolcc1,
                values.Compositsandingsetslowrewind_toolcc1,
                values.Compositsandingsetfastrewinding_toolcc1,
                values.plasticcomposit_toolcc1,
                values.Spoonexcavatorlarge_toolcc1,
                values.MatrixV3_toolcc1,
                values.MatrixV3Forcep_toolcc1,
                values.Rounddimondbursetslow_toolcc1,
                values.Cylinderdimondbursetslow_toolcc1,
                values.Rounddimondbursetfast_toolcc1,
                values.Cylinderdimondbursetfast_toolcc1,
                values.Dycalcarrier_toolcc1,
                values.Spatulaplastic_toolcc1,
                values.Cementspatula_toolcc1,
                values.Mendrelscrubset_toolcc1,
                values.Poponsmall_toolcc1,
                values.Rubberdamset_toolcc1,
                values.clamp_toolcc1,
                values.Steelheadslowdown_toolcc1,
                values.Astropolpolishingset_toolcc1,
                values.IvoryTofflemirematrix_toolcc1,
                values.hightpowersuction_toolcc1
            )
        }
    })

    const [show2, setShow2] = useState(false)
    const handleShowOpen = () => {
        setShow2(true)
    }
    const handleShowClose = () => {
        setShow2(false)
    }

    var callback = function (key) { }

    return (
        <div>
            <Modal
                size='xl'
                style={{ fontFamily: 'Mitr' }}
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{}}>รายละเอียดการจอง</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <form onSubmit={formik.handleSubmit}>
                            <Container style={{ fontSize: 16 }}>
                                {/* <label
                                    style={{
                                        marginBottom: 15,
                                        color: '#0060cc',
                                        fontFamily: 'Mitr'
                                    }}
                                >
                                    รายการ
                                </label>
                                <label
                                    style={{
                                        marginLeft: 320,
                                        marginBottom: 15,
                                        color: '#0060cc',
                                        fontFamily: 'Mitr'
                                    }}
                                >
                                    รายการ
                                </label> */}

                                <br />
                                <Row>


                                    <Col>
                                        <Row>
                                            <label>รายการ</label>

                                        </Row>
                                        <div
                                            style={{
                                                backgroundColor: '#D0D3D4',
                                                height: 1,
                                                marginBottom: 20,
                                                marginRight:-10
                                            }}
                                        />
                                        
                                        <Row>

                                            <Col>
                                                <label
                                                    htmlFor='testkit_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดตรวจ{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='testkit_toolcc1'
                                                    name='testkit_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.testkit_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='glassofwater_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    แก้วน้ำ{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='glassofwater_toolcc1'
                                                    name='glassofwater_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.glassofwater_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Tripplesyring_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Tripple syring{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Tripplesyring_toolcc1'
                                                    name='Tripplesyring_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Tripplesyring_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='FabricMiddlepunch_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ผ้าเจาะกลาง{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='FabricMiddlepunch_toolcc1'
                                                    name='FabricMiddlepunch_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.FabricMiddlepunch_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='veil_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ผ้าคลุม{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='veil_toolcc1'
                                                    name='veil_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.veil_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='UNC15Probe_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    UNC 15 Probe{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='UNC15Probe_toolcc1'
                                                    name='UNC15Probe_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.UNC15Probe_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='medicinecup_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ถ้วยนํ้ายา{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='medicinecup_toolcc1'
                                                    name='medicinecup_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.medicinecup_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Dappendish_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Dappen dish{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Dappendish_toolcc1'
                                                    name='Dappendish_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Dappendish_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Mouthprop_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Mouth prop{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Mouthprop_toolcc1'
                                                    name='Mouthprop_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Mouthprop_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Glasslab_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Glass lab{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Glasslab_toolcc1'
                                                    name='Glasslab_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Glasslab_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Airotor_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Airotor{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Airotor_toolcc1'
                                                    name='Airotor_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Airotor_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Contra_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Contra{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Contra_toolcc1'
                                                    name='Contra_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Contra_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='cottonbud_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ไม้พันสำลี{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='cottonbud_toolcc1'
                                                    name='cottonbud_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.cottonbud_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Rubbercup_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Rubber cup/tip/Brush{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Rubbercup_toolcc1'
                                                    name='Rubbercup_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Rubbercup_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='AnestheticSyringe_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Syringe ยาชา{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='AnestheticSyringe_toolcc1'
                                                    name='AnestheticSyringe_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.AnestheticSyringe_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='BladeHolder_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Blade Holder{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='BladeHolder_toolcc1'
                                                    name='BladeHolder_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.BladeHolder_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Blade_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Blade No....{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Blade_toolcc1'
                                                    name='Blade_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Blade_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Compositstopperset_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดอุด Composit{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Compositstopperset_toolcc1'
                                                    name='Compositstopperset_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Compositstopperset_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Amalgamfillingset_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดอุด Amalgam{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Amalgamfillingset_toolcc1'
                                                    name='Amalgamfillingset_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Amalgamfillingset_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Compositsandingsetslowrewind_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดขัด Composit กรอช้า{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Compositsandingsetslowrewind_toolcc1'
                                                    name='Compositsandingsetslowrewind_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.Compositsandingsetslowrewind_toolcc1
                                                    }
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* Middleeeeeeeeeeeeeeeeeeeee                        */}
                                    <Col>
                                    <Row>
                                            <label>รายการ</label>

                                        </Row>
                                        <div
                                            style={{
                                                backgroundColor: '#D0D3D4',
                                                height: 1,
                                                marginBottom: 20,
                                                marginLeft: -20
                                            }}
                                        />
                                        <Row>
                                            
                                            <Col>
                                                <label
                                                    htmlFor='Compositsandingsetfastrewinding_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดขัด Composit กรอเร็ว{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Compositsandingsetfastrewinding_toolcc1'
                                                    name='Compositsandingsetfastrewinding_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .Compositsandingsetfastrewinding_toolcc1
                                                    }
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='plasticcomposit_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    plastic composit{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='plasticcomposit_toolcc1'
                                                    name='plasticcomposit_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.plasticcomposit_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Spoonexcavatorlarge_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Spoon excavator ใหญ่{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Spoonexcavatorlarge_toolcc1'
                                                    name='Spoonexcavatorlarge_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Spoonexcavatorlarge_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='MatrixV3_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Matrix V3 Ring ...{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='MatrixV3_toolcc1'
                                                    name='MatrixV3_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.MatrixV3_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='MatrixV3Forcep_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Matrix V3 Forcep{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='MatrixV3Forcep_toolcc1'
                                                    name='MatrixV3Forcep_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.MatrixV3Forcep_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Rounddimondbursetslow_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Round dimond bur (กรอช้า){''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Rounddimondbursetslow_toolcc1'
                                                    name='Rounddimondbursetslow_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Rounddimondbursetslow_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Cylinderdimondbursetslow_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Cylinder dimond bur (กรอช้า){''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Cylinderdimondbursetslow_toolcc1'
                                                    name='Cylinderdimondbursetslow_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Cylinderdimondbursetslow_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Rounddimondbursetfast_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Round dimond bur (กรอเร็ว){''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Rounddimondbursetfast_toolcc1'
                                                    name='Rounddimondbursetfast_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Rounddimondbursetfast_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Cylinderdimondbursetfast_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Cylinder dimond bur (กรอเร็ว){''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Cylinderdimondbursetfast_toolcc1'
                                                    name='Cylinderdimondbursetfast_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Cylinderdimondbursetfast_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Dycalcarrier_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Dycal carrier{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Dycalcarrier_toolcc1'
                                                    name='Dycalcarrier_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Dycalcarrier_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Spatulaplastic_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Spatula plastic{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Spatulaplastic_toolcc1'
                                                    name='Spatulaplastic_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Spatulaplastic_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Cementspatula_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Cement spatula{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Cementspatula_toolcc1'
                                                    name='Cementspatula_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Cementspatula_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Mendrelscrubset_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดขัด Mendrel{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Mendrelscrubset_toolcc1'
                                                    name='Mendrelscrubset_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Mendrelscrubset_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Poponsmall_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Pop on เล็ก/ใหญ่{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Poponsmall_toolcc1'
                                                    name='Poponsmall_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Poponsmall_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Rubberdamset_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุด Rubber dam{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Rubberdamset_toolcc1'
                                                    name='Rubberdamset_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Rubberdamset_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='clamp_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    clamp No.{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='clamp_toolcc1'
                                                    name='clamp_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.clamp_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Steelheadslowdown_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    หัว Steel กรอช้า{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Steelheadslowdown_toolcc1'
                                                    name='Steelheadslowdown_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Steelheadslowdown_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='Astropolpolishingset_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    ชุดขัด Astropol{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='Astropolpolishingset_toolcc1'
                                                    name='Astropolpolishingset_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Astropolpolishingset_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='IvoryTofflemirematrix_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    Ivory / Tofflemire matrix{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='IvoryTofflemirematrix_toolcc1'
                                                    name='IvoryTofflemirematrix_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.IvoryTofflemirematrix_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <label
                                                    htmlFor='hightpowersuction_toolcc1'
                                                    style={{ color: '#0060cc', fontFamily: 'Mitr' }}
                                                >
                                                    hight power suction{''}
                                                </label>
                                            </Col>
                                            <Col style={{ marginTop: -10 }}>
                                                <select
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    id='hightpowersuction_toolcc1'
                                                    name='hightpowersuction_toolcc1'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.hightpowersuction_toolcc1}
                                                >
                                                    <option value='' label='เลือกจำนวน' />
                                                    <option value='1' label='1' />
                                                    <option value='2' label='2' />
                                                    <option value='3' label='3' />
                                                    <option value='4' label='4' />
                                                    <option value='5' label='5' />
                                                    <option value='6' label='6' />
                                                    <option value='7' label='7' />
                                                    <option value='8' label='8' />
                                                    <option value='9' label='9' />
                                                    <option value='10' label='10' />
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>

                            <br />
                            <center>
                                <Button
                                    onClick={handleShowOpen}
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '22px',
                                        backgroundColor: '#198CFF',
                                        marginBottom: 20
                                    }}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </center>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
            <div style={{ background: '#FFFFFF', minHeight: '1080px' }}>
                {/* <Button
          className='But'
          type='submit'
          style={{ background: '#198CFF', color: 'white', width: '150px' }}
          onClick={handleShowOpen}
        >
          ยืนยัน
        </Button> */}
                <Modal
                    size='lg'
                    style={{ fontFamily: 'Mitr' }}
                    show={show2}
                    onHide={handleShowClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>อุปกรณ์ที่จอง</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <div style={{ marginBottom: 50 }} />
                            <div style={{ marginLeft: 20 }}>
                                <div style={{ minHeight: 250 }}>
                                    <Container style={{ fontSize: 17 }}>
                                        <Table
                                            striped
                                            bordered
                                            hover
                                            variant=''
                                            style={{
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                maxWidth: '97%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <thead className='theadAdmin1' style={{}}>
                                                <tr style={{ backgroundColor: 'white' }}>
                                                    <th style={{ width: 500 }} className='text-primary'>
                                                        อุปกรณ์
                                                    </th>
                                                    <th style={{ width: 50 }} className='text-primary'>จำนวน</th>
                                                </tr>
                                            </thead>
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
                                                if (item.Compositsandingsetslowrewind_toolcc1 !== ' ') {
                                                    return (
                                                        <tbody>
                                                            <tr style={{ backgroundColor: 'white' }}>
                                                                <td>ชุดขัด Composit กรอช้า</td>
                                                                <td>
                                                                    {item.Compositsandingsetslowrewind_toolcc1}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                } else {
                                                    return
                                                }
                                            })}

                                            {confirmtool?.map((item) => {
                                                if (
                                                    item.Compositsandingsetfastrewinding_toolcc1 !== ' '
                                                ) {
                                                    return (
                                                        <tbody>
                                                            <tr style={{ backgroundColor: 'white' }}>
                                                                <td>ชุดขัด Composit กรอเร็ว</td>
                                                                <td>
                                                                    {item.Compositsandingsetfastrewinding_toolcc1}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                } else {
                                                    return
                                                }
                                            })}
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                            {confirmtool?.map((item) => {
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
                                        </Table>
                                    </Container>
                                </div>
                                <br />
                                <center>
                                    <Row>
                                        <Col>
                                            <button
                                                className='But'
                                                style={{
                                                    margin: 'auto',
                                                    marginBottom: 10,
                                                    fontFamily: 'Mitr'
                                                }}
                                                onClick={() => submitConfirmTools()}
                                            >
                                                Submit
                                            </button>
                                        </Col>
                                        <Col>
                                            <button
                                                className='But'
                                                style={{
                                                    backgroundColor: 'red',
                                                    marginBottom: 10,
                                                    fontFamily: 'Mitr'
                                                }}
                                                onClick={handleShowClose}
                                            >
                                                Cancle
                                            </button>
                                        </Col>
                                    </Row>
                                </center>
                            </div>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default ToolModal
