import SearchComponent from "../components/SearchComponent"
import InfoComponent from "../components/InfoComponent"

const SearchPage = (props) => {
    const {fetchData,setShow,data,show} = props
    return(<>
        <SearchComponent 
        fetchData = {fetchData}
        setShow = {setShow}
        />
        <InfoComponent 
        data = {data}
        show = {show}
        />
        </>
    )
}
export default SearchPage