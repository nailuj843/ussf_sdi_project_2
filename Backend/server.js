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
        .orderBy('id')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'these are not the launches you are looking for' }))
})

app.post('/launchschedule', async (req, res) => {
    console.log(req.body)
    console.log('user tried to enter a new launch')
    // knex('launchschedule')
    //     .insert({
    //         customer_id: req.body.customer_id,
    //         vehicle: req.body.vehicle,
    //         payload: req.body.payload,
    //         launch_date: req.body.launch_date,
    //         user_id: req.body.user_id,
    //     })
    //     .then(data => res.status(200).json(data))
    //     .catch(err => res.status(404).json({ message: 'Failed to add new launch' }))
    await knex.insert({
        customer_id: req.body.customer_id,
        vehicle: req.body.vehicle,
        payload: req.body.payload,
        launch_date: req.body.launch_date,
        user_id: req.body.user_id,
    }).into('launchschedule')

    res.status(200).send('successfully added new entry to database')

})

app.delete('/launchschedule', function (req, res) {
    console.log('user tried to delete ID :', req.body.id)
    knex('launchschedule')
        .del()
        .where({ id: req.body.id })
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The launch you attempted to delete could not be found. Please try again'
            })
        )
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

app.post('/customers', async (req, res) => {
    await knex.insert({ name: req.body.name })
        .into(('customers'))
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'Failed to add Customer' }))
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

app.post('/users', async (req, res) => {
    await knex.insert({ name: req.body.name, password: req.body.password, email: req.body.email, commander: req.body.commander })
        .into(('users'))
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'Failed to register User' }))
})

app.patch('/updateEntry', async (req, res) => {
    console.log(req.body)
    console.log('user made a new entry')
    //console.log('u')

    //await knex.insert(req.body).into('todolist')

    let dataToSend = {
        customer_id: req.body.customer_id,
        vehicle: req.body.vehicle,
        payload: req.body.payload,
        launch_date: req.body.launch_date,
        commander_approval: req.body.commander_approval,
        scrub_reason: req.body.scrub_reason
    }

    await knex('launchschedule')
        .where('id', req.body.id)
        .update(dataToSend)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'Failed to update launch entry' }))

    // res.send('you tried to make a patch')
})



app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});