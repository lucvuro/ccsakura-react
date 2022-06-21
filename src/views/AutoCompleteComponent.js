import axios from "axios";
import { useEffect, useState } from "react";

const AutoCompleteComponent = (props) => {
    const { value,setValue } = props
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
    const handleKeyDown = (event,item) => {
        if (event.keyCode == 38){
            setValue(item)
        }
    }
    return (
        <div className="autocomplete-container">
            <ul className="list-group list-group-flush pt-2">
                {suggestionsActive && suggestions.map((item,index) => {
                    return(
                        <li className="list-group-item" key={index} onClick={(event) => handleClickSuggest(item)}>{item}</li>
                    )
                })}   
            </ul>

        </div>
    )
}

export default AutoCompleteComponent