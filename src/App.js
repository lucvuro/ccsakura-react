import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import InfoComponent from './views/InfoComponent';
import SearchComponent from './views/SearchComponent';
import { useState } from 'react';
import LoadingComponent from './views/LoadingComponent';
function App() {
  const[dataRecived,setdataRecived] = useState({})
  const[show,setShow] = useState(false)
  const fetchData = (data) => {
      setdataRecived(data)
      setShow(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {console.log('re-render')}
        <Nav/>
        <SearchComponent 
        fetchData = {fetchData}
        setShow = {setShow}
        />
        <InfoComponent 
        data = {dataRecived}
        show = {show}
        />
        
      </header>
    </div>
  );
}

export default App;
