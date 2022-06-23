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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from './views/CardComponent';
import UserComponent from './views/UserComponent';
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
            <ToastContainer />
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
                <AllCardsComponent />
              </Route>
              <Route path='/card/:id' children={<CardComponent />} />
              <Route path='/user'>
                <UserComponent />
              </Route>
            </Switch>
          </header>
        </div>
      </Router>
   
  );
}

export default App;
