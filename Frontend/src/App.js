import './App.css';
import React, { useState } from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import AppContext from './contexts/AppContext';
import moment from 'moment'

let launchMoment = require('moment')
require('moment-timezone')
moment.tz.setDefault('America/Los_Angeles')


function App() {
  const [launchData, setLaunchData] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [userData, setUserData] = useState([])


  return (
    <div className='main'>
      <AppContext.Provider value={{ launchData, setLaunchData, customerData, setCustomerData, userData, setUserData }}>
        <h1> Launch Scheduler 9000 </h1>


        <Home />
      </AppContext.Provider>
    </div>
  );
}

export default App;