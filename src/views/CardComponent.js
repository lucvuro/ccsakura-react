import { useParams} from "react-router-dom";
import {useState,useEffect } from 'react'
import axios from "axios";
import InfoCardComponent from "../components/InfoCardComponent";
import LoadingComponent from "./LoadingComponent";

const CardComponent = () => {
    let {name} = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let fetchData = async () => {
            let res = await axios.get(`https://ccsakura-card.herokuapp.com/sakura/api/card/${name}`)
            let data = res && res.data ? res.data : []
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [])
    return(
        <div className="card-info-container">
            {!loading && <InfoCardComponent data={data} show={true}/>}
            {loading && <LoadingComponent/>}
        </div>
    )
}
export default CardComponent;