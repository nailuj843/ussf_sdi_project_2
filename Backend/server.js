const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', (req, res) => {
    console.log('the server was successfully hit')
    res.send('you hit the server')
})

app.get('/launchschedule', (req, res) => {
    console.log('user requested the "launchschedule" table from the db')
    knex
        .select('*')
        .from('launchschedule')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'these are not the launches you are looking for' }))
})

app.get('/customers', (req, res) => {
    console.log('user requested the "customers" table from the db')
    knex
        .select('*')
        .from('customers')
        .orderBy('id')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'these are not the customers you are looking for' }))
})

app.get('/users', (req, res) => {
    console.log('user requested the "users" table from the db')
    knex
        .select('*')
        .from('users')
        .orderBy('id')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'these are not the users you are looking for' }))
})

app.patch('/updateEntry', (req, res) => {
    console.log('user tried to updateEntry')
    // knex('launchschedule')
    //     .where({id: req.body.id})
    //     .update(customer_id, req.body.id)
    //     .update(vehicle, req.body.vehicle) 
    //     .update(launch_date, req.body.launch_date)
    //     .update(launch_time, req.body.launch_time)
    //     .update(payload, req.body.payload) 
    //     .update(scrub_reason, req.body.scrubreason)
    //         .then(data => res.status(200).json(data))
    //         .catch(err => res.status(404).json({ message: 'Update failed' })

    res.send('you tried to make a post')
})

app.post('/removeItem', (req, res) => {


    res.send('you tried to remove an item')
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});