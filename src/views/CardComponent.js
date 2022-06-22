import { useParams} from "react-router-dom";
import {useState,useEffect } from 'react'
import axios from "axios";
import InfoCardComponent from "../components/InfoCardComponent";

const CardComponent = () => {
    let {name} = useParams()
    const [data, setData] = useState({})
    useEffect(() => {
        let fetchData = async () => {
            let res = await axios.get(`https://ccsakura-card.herokuapp.com/sakura/api/card/${name}`)
            let data = res && res.data ? res.data : []
            setData(data)
        }
        fetchData()
    }, [])
    return(
        <div className="card-info-container">
            <InfoCardComponent data={data} show={true}/>
        </div>
    )
}
export default CardComponent;