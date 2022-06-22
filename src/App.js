import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import SearchPage from './views/SearchPage';
import { useState } from 'react';
import AllCardsComponent from './views/AllCardsComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardComponent from './views/CardComponent';

function App() {
  const [dataRecived, setdataRecived] = useState({})
  const [show, setShow] = useState(false)
  const fetchData = (data) => {
    setdataRecived(data)
    setShow(true)
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {console.log('re-render')}
          <Nav />
          <Switch>
            <Route exact path='/'>
              <SearchPage
                fetchData={fetchData}
                setShow={setShow}
                data={dataRecived}
                show={show}
              />
            </Route>
            <Route path='/allcards'>
              <AllCardsComponent/>
            </Route>
            <Route path='/card/:name' children={<CardComponent/>} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
