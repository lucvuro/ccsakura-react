import '../views/AllCardsComponent.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
import AddModalComponent from '../components/AddModalComponent'
import { useMediaQuery } from 'react-responsive'
import ErrorComponent from '../components/ErrorComponent'
const AllCardsComponent = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' })
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const addCardToData = (childData) => {
        let currentData = data
        currentData = [childData, ...currentData]
        setData(currentData)
    }
    const removeCardFromData = (card) => {
        let currentData = data
        currentData = currentData.filter((item) => item.id !== card.id)
        setData(currentData)
    }
    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        let fetchData = async () => {
            try {
                let res = await axios.get('https://ccsakura-card.herokuapp.com/sakura/api/card/all', {
                    cancelToken: ourRequest.token
                })
                let dataRecived = res && res.data && res.data.card ? res.data.card : []
                setData(dataRecived)
                setLoading(false)
                localStorage.setItem('data', JSON.stringify(dataRecived));
            }
            catch (e) {
                if (axios.isCancel(e)) {
                    console.log(e.message)
                } else {
                    setError(true)
                    setLoading(false)
                    localStorage.removeItem("data");
                }
            }
        }
        if (localStorage.getItem('data') === null) {
            fetchData()
        } else {
            let dataRecived = JSON.parse(localStorage.getItem('data'));
            if (dataRecived) {
                setData(dataRecived);
                setLoading(false)
                setError(false)
            }
        }

return () => {
    ourRequest.cancel("Canceled by user")
}
    }, [])
useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))

}, [data])
return (<>
    {isDesktopOrLaptop &&
        <div>
            {!loading && !isError && <AddModalComponent addCardToData={addCardToData} />}
            <div className="list-cards">
                {data && data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div className="card fade-in-image" key={index} >
                                <NavLink to={{ pathname: `card/${item.id}` }}>
                                    <img className="card-img-top" src={item.link_clow} alt={item.nameCard} />
                                </NavLink>
                                <button class="btn btn-danger" onClick={() => removeCardFromData(item)}>Delete</button>
                            </div>
                        )
                    })}
                {loading &&
                    <LoadingComponent />
                }
                {isError === true && <ErrorComponent />}
            </div>
        </div>}
    {isMobile &&
        <div>
            {!loading && <AddModalComponent addCardToData={addCardToData} />}
            <div className="list-cards">
                {data && data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div className="card fade-in-image" key={index} >
                                <button class="btn-mobile btn-danger" onClick={() => removeCardFromData(item)}>Delete</button>
                                <NavLink to={{ pathname: `card/${item.id}` }}>
                                    <img className="card-img-top" src={item.link_clow} alt={item.nameCard} />
                                </NavLink>

                            </div>
                        )
                    })}
                {loading &&
                    <LoadingComponent />
                }
                {isError === true && <ErrorComponent />}
            </div>
        </div>}
</>
)
}
export default AllCardsComponent