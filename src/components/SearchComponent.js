import '../components/SearchComponent.css';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import LoadingComponent from '../views/LoadingComponent';
import ErrorComponent from './ErrorComponent';
const SearchComponent = (props) => {
    const { fetchData, setShow } = props
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    useEffect(() => {
        let fetchData = async () => {
            let res = await axios.get('https://ccsakura-card.herokuapp.com/sakura/api/card/array')
            let data = res && res.data ? res.data : []
            setData(data)
            localStorage.setItem('array', JSON.stringify(data))
        }
        fetchData()
    }, [])

    useEffect(() => {
        const query = value.toLowerCase()
        if (data.includes(value)) {
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
        setShow(false)
        setLoading(true)
        try {
            if (localStorage.getItem("data") === null) {
                let res = await axios.get(`https://ccsakura-card.herokuapp.com/sakura/api/card/${value}`)
                let data = res.data
                if (res.data.nameCard === -1) {
                    setLoading(false)
                    setError(true)
                    setValue("")
                } else {
                    setLoading(false)
                    fetchData(data)
                    setError(false)
                    setValue('')
                }
            } else {
                let datafromlocalstorage = JSON.parse(localStorage.getItem("data"))
                let dataneedfind_index = datafromlocalstorage.findIndex(item => item.nameCard.toLowerCase() === value.toLowerCase())
                if (dataneedfind_index === -1) {
                    setLoading(false)
                    setError(true)
                    setValue("")
                } else {
                    let dataneedfind = datafromlocalstorage[dataneedfind_index]
                    setLoading(false)
                    setError(false)
                    fetchData(dataneedfind)
                    setValue('')
                }
            }
        }
        catch (e) {
            setLoading(false)
            setError(true)
            setValue('')
        }



    }
    const setvalueOnClick = (item) => {
        setValue(item)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 38) {
            if (suggestionIndex === 0) {
                return;
            }
            setSuggestionIndex(suggestionIndex - 1)
            setValue(suggestions[suggestionIndex - 1])

        }
        else if (event.keyCode === 40) {
            if (suggestions.length === 0) {
                return;
            }
            if (suggestionIndex + 1 === suggestions.length) {
                setValue(suggestions[suggestionIndex])
                return;
            }
            setSuggestionIndex(suggestionIndex + 1)
            setValue(suggestions[suggestionIndex + 1])
        }
        else if (event.keyCode === 13) {
            searchOnClick(value)
            setValue('')
            setSuggestionIndex(0)
        }
    }
    return (<>
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
                    {suggestions.length > 0 &&
                        <div className="autocomplete-container" style={suggestionsActive ? {} : { display: 'none' }}>
                            <ul className="list-group list-group-flush pt-2">
                                {suggestions && suggestions.length > 0 && suggestions.map((item, index) => {
                                    return (
                                        <li className={index === suggestionIndex ? 'list-group-item active' : 'list-group-item'} key={index} onClick={(event) => handleClickSuggest(item)}>{item}</li>
                                    )
                                })}
                            </ul>

                        </div>}
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
        {loading && <LoadingComponent />}
        {isError && !suggestionsActive && <ErrorComponent/>}
    </>
    )
}
export default SearchComponent;