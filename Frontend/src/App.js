import './App.css';
import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';

function App() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='main'>
      Hello World!
      {/* <Calendar
        onChange={onChange}
        value={value}
      /> */}
    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker onChange={onChange} value={value}> </DateTimePicker>
    </MuiPickersUtilsProvider>

      {/* <DateTimePicker onChange={onChange} value={value}> </DateTimePicker> */}
    </div>
  );
}

export default App;
