import { TextField, Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext';

export default function Login() {

    const { currentUser, setCurrentUser } = useContext(AppContext)
    const { userData, setUserData } = useContext(AppContext)

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUserData(data))
        // eslint-disable-next-line
    }, [])

    function handleLogin(e) {
        e.preventDefault();

        let email = document.getElementById('email').value
        if (!email.includes('@')) {
            alert('Invalid email address!')
            return
        }
        let password = document.getElementById('password').value


        let target = userData.find(user => user.email === email && user.password === password)

        if (target) {
            setCurrentUser(target)
        } else {
            alert('Incorrect password or email!')
            return
        }

        window.location.href = 'http://localhost:3000/home'

    }

    return (
        <>
            <form>
                <TextField required variant="outlined" label="Email" id="email" native margin="normal" type='email'></TextField>
                <br />
                <TextField required variant="outlined" label="Password" id="password" native margin="normal" type='password' ></TextField>
                <br />
                <Button style={{ marginTop: 15 }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    type='submit'
                    onClick={handleLogin}
                >Login</Button>
            </form>
        </>
    )
}