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

app.post('/updateList',  (req, res) => {

    

    res.send('you tried to make a post')
})

app.post('/removeItem',  (req, res)=>{

    
    res.send('you tried to remove an item')
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});