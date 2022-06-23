import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";
import InfoCardComponent from "../components/InfoCardComponent";
import LoadingComponent from "./LoadingComponent";
const CardComponent = () => {
    let { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [dataEdited, setDataEdited] = useState({})
    const saveDataToLocal = (dataeditedfromform) => {
        let dataRecived = JSON.parse(localStorage.getItem('data'));
        if (dataRecived) {
            let dataRecivedIndex = dataRecived.findIndex(item => item.id.toString() === id)
            if (dataRecivedIndex !== -1) {
                dataRecived[dataRecivedIndex] = dataeditedfromform
                localStorage.setItem('data', JSON.stringify(dataRecived))
                setDataEdited(dataeditedfromform)
            }
        }
    }
    // useEffect(() => {
    //     let fetchData = async () => {
    //         let res = await axios.get(`https://ccsakura-card.herokuapp.com/sakura/api/card/${name}`)
    //         let data = res && res.data ? res.data : []
    //         setData(data)
    //         setLoading(false)
    //     }
    //     fetchData()

    // }, [])
    useEffect(() => {
        let dataRecived = JSON.parse(localStorage.getItem('data'));
        if (dataRecived) {
            dataRecived = dataRecived.filter(item => item.id.toString() === id)
            if (dataRecived.length > 0) {
                setData(dataRecived[0])
                setLoading(false)
            }
        }
    }, [dataEdited])
    return (
        <div className="card-info-container">
            {!loading && <InfoCardComponent showEdit={true} data={data} show={true} setData={setData} saveDataToLocal={saveDataToLocal}/>}
            {loading && <LoadingComponent />}
        </div>
    )
}
export default CardComponent;