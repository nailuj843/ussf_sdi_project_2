import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    DateTimePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';

export default function Picker() {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = async (date) => {
        await setSelectedDate(date.toUTCString());
        await console.log(selectedDate)
    };

    return (

        < MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Grid container justifyContent="left">
                <DateTimePicker
                    id="datetime"
                    label="Launch Date and Time"
                    inputVariant="outlined"
                    ampm={false}
                    variant="dialog"
                    margin="normal"
                    value={selectedDate}
                    onChange={handleDateChange}
                    openTo="date"
                    format="yyyy/MM/dd HH:mm:ss"
                    minDate={new Date()}
                    showTodayButton={true}
                />
            </Grid>
        </MuiPickersUtilsProvider >
    );
}