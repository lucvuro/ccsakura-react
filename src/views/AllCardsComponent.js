import '../views/AllCardsComponent.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
const AllCardsComponent = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        let fetchData = async () => {
            try {
                let res = await axios.get('https://ccsakura-card.herokuapp.com/sakura/api/card/all', {
                    cancelToken: ourRequest.token
                })
                let dataRecived = res && res.data && res.data.card ? res.data.card : []
                setData(dataRecived)
            }
            catch (e) {
                if (axios.isCancel(e)) {
                    console.log(e.message)
                } else {
                    console.log('else')
                }
            }
        }
        fetchData()
        return () => {
            ourRequest.cancel("Canceled by user")
        }

    }, [])
    return (<>
        <div className="list-cards">
            {data && data.length>0 &&
                data.map((item, index) => {
                    return (
                        <div className="card fade-in-image" key={item.id} >
                            <NavLink to={{pathname:`card/${item.nameCard}`}}>
                                <img class="card-img-top" src={item.link_clow} alt={item.nameCard} />
                            </NavLink>
                        </div>
                    )
                })}

        </div>
    </>
    )
}
export default AllCardsComponent