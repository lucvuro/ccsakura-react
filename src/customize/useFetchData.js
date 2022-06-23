import { useState,useEffect } from "react"
import axios from "axios"
const useFetchData = (URL) => {
    const [res,setRes] = useState({})
    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        let fetchData = async () => {
            try {
                let res = await axios.get(URL, {
                    cancelToken: ourRequest.token
                })
            }
            catch (e) {
                if (axios.isCancel(e)) {
                    console.log(e.message)
                } else {
                    console.log('else')
                }
            }
        }
        return () => {
            ourRequest.cancel("Canceled by user")
        }
    }, [])
    return {res}
}
export default useFetchData;