import '../views/SearchComponent.css';
import { useState , useEffect, useRef} from 'react';
import axios from 'axios';
import AutoCompleteComponent from './AutoCompleteComponent';
const SearchComponent = (props) => {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [data, setData] = useState([])
    useEffect(() => {
        let fetchData = async () => {
            let res = await axios.get('https://ccsakura-card.herokuapp.com/sakura/api/card/array')
            let data = res && res.data ? res.data : []
            setData(data)
        }
        fetchData()
    }, [])
    useEffect(() => {
        const query = value.toLowerCase()
        if (data.includes(value)){
            return;
        }
        if (query.length >= 1) {
            const filterSuggestions = data.filter(
                (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
            )
            setSuggestions(filterSuggestions)
            setSuggestionsActive(true)

        } else {
            setSuggestionsActive(false)
        }
    }, [value])

    const handleClickSuggest = (item) => {
        setSuggestions([])
        setValue(item)
        setSuggestionsActive(false)
    }
    let searchOnClick = async (value) => {
        let res = await axios.get(`https://ccsakura-card.herokuapp.com/sakura/api/card/${value}`)
        let data = res.data
        fetchData(data)
        setValue('')
    }
    const setvalueOnClick = (item) => {
        setValue(item)
    }
    const { fetchData } = props
    const handleKeyDown = (event) => {
        if (event.keyCode === 38){
            if (suggestionIndex === 0) {
                return;
            }
            setSuggestionIndex(suggestionIndex-1)
            setValue(suggestions[suggestionIndex-1])
            
        }
        else if (event.keyCode === 40) {
            if (suggestions.length === 0){
                return;
            }
            if (suggestionIndex + 1 === suggestions.length){
                setValue(suggestions[suggestionIndex])
                return;
            }
            setSuggestionIndex(suggestionIndex+1)
            setValue(suggestions[suggestionIndex+1])
        }
        else if (event.keyCode === 13){
            searchOnClick(value)
            setValue('')
            setSuggestionIndex(0)
        }
    }
    return (
        <div className="searchContainer">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Search cards"
                            aria-label="search-cards" aria-describedby="basic-addon1" value={value}
                            onChange={(event) => setValue(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event)} />
                        <button className="btn btn-primary" onClick={() => searchOnClick(value)}>Search</button>
                    </div>
                    <div className="autocomplete-container" style={suggestionsActive ? {} : {display: 'none'}}>
                        <ul className="list-group list-group-flush pt-2">
                            {suggestions.map((item, index) => {
                                return (
                                    <li className={index === suggestionIndex ? 'list-group-item active' : 'list-group-item'} key={index} onClick={(event) => handleClickSuggest(item)}>{item}</li>
                                )
                            })}
                        </ul>

                    </div>
                </div>
                <div className="col-2">


                </div>
            </div>
        </div>
    )
}
export default SearchComponent;