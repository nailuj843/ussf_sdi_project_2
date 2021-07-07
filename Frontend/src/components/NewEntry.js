import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../contexts/AppContext';
import Picker from './DateTimePicker';
import { FormControl, Input, TextField, Select, MenuItem } from '@material-ui/core';

export default function NewEntry({ launchData, edit }) {
    // const { launchData, setLaunchData } = useContext(AppContext)
    const { customerData, setCustomerData } = useContext(AppContext)
    const { userData, setUserData } = useContext(AppContext)

    const [value, onChange] = useState(new Date());

    const handleCommitChanges = (e) => {
        e.preventDefault();
        console.log('you clicked commit changes')
        let ID = launchData.id;
        let customer = document.getElementById('customer').value
        let vehicle = document.getElementById('vehicle').value
        let payload = document.getElementById('payload').value
        let date = document.getElementById('datetime').value


        let dataToPatch = {
            'id': ID,
            'customer': customer,
            'vehicle': vehicle,
            'request_date': date,
            'payload': '',
            'launch_date': '',
            'launch_time': '',
            'user_id': '',
            'request_date': '',
            'commander_approval': false,
            'scrub_reason': '',
            'approval_date': ''
        }
        console.log(dataToPatch)
        //  patchDataToServer(dataToPatch)


    }

    const patchDataToServer = (dataToPatch) => {
        fetch('http://localhost:3001/updateEntry', {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify(dataToPatch)

        })
        //.then(res => res.json())
    }

    return (
        <form >
            <Select variant="outlined" label='Customer' id='customer' native margin="normal" >
                {customerData.map(customer => (<option value={customer.name}>{customer.name}</option>))}
            </Select>
            <TextField variant="outlined" label="Vehicle" id="vehicle" native margin="normal" ></TextField>
            <TextField variant="outlined" label="Payload" id="payload" native margin="normal" ></TextField>
            <TextField variant="outlined" label="Scrub Reason" id="scrubReason" native margin="normal" ></TextField>
            <Picker />

            <Button variant="contained"
                color="primary"
                size="small"
                type='submit'
                onClick={handleCommitChanges}
                styles={{}}
            > Commit Changes</Button>
            {/* <input type='submit' /> */}
        </form>

        // <FormControl>
        //     <TextField variant="outlined" >what does thisdo</TextField>
        //     <Button type='submit'>Submit</Button>
        // </FormControl>
    )


}

