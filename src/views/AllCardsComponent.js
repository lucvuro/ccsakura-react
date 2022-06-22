import '../views/AllCardsComponent.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
const AllCardsComponent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        let fetchData = async () => {
            try {
                let res = await axios.get('https://ccsakura-card.herokuapp.com/sakura/api/card/all', {
                    cancelToken: ourRequest.token
                })
                let dataRecived = res && res.data && res.data.card ? res.data.card : []
                setData(dataRecived)
                localStorage.setItem('data', JSON.stringify(dataRecived));
                setLoading(false)
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
    useEffect(() => {
        let dataRecived = JSON.parse(localStorage.getItem('data'));
        if (dataRecived) {
         setData(dataRecived);
         setLoading(false)
        }
      }, []);
    return (<>
        <div className="list-cards">
            {data && data.length>0 &&
                data.map((item, index) => {
                    return (
                        <div className="card fade-in-image" key={item.id} >
                            <NavLink to={{pathname:`card/${item.nameCard}`}}>
                                <img className="card-img-top" src={item.link_clow} alt={item.nameCard} />
                            </NavLink>
                        </div>
                    )
                })}
            {loading && 
                <LoadingComponent />
            }

        </div>
    </>
    )
}
export default AllCardsComponent