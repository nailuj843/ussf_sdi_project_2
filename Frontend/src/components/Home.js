import Dashboard from './Dashboard'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

export default function Home() {

    const { currentUser, setCurrentUser } = useContext(AppContext)

    // if (currentUser === null) {
    //     window.location.href = 'http://localhost:3000'
    //     return
    // }

    function handleClick(e) {
        e.preventDefault();
        setCurrentUser(null)
        window.location.href = 'http://localhost:3000'
    }

    return (
        <>
            <Button variant="contained"
                color="primary"
                size="medium"
                onClick={handleClick}
                style={{ marginLeft: 5, marginTop: 5, marginBottom: 20 }}>Sign Out</Button>

            <br></br>

            <Link to='/addUser' style={{ textDecoration: 'none' }}><Button variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>Register User</Button></Link>
            <Link to='/addCustomer' style={{ textDecoration: 'none' }}><Button variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>New Customer</Button></Link>
            <Link to='/addLaunch' style={{ textDecoration: 'none' }}><Button variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>New Launch</Button></Link>

            <Dashboard />
        </>
    )
}