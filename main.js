
const express = require('express')
const app = express()
const port = 3000

var database = require('./programmers');

app.use(express.json())

app.get('/', (req, res) => {

    res.send(database);
});

app.get('/:id', (req, res) => {
    const id = req.params.id;

    let person = database[id];

    if (person != null){
        res.send(person);
    } else {
        res.send("Data does not exist");
    }

    //res.send(database[id]);

    //res.send(`Fill me in to return values with ID: ${id}`);
    
});

app.put('/:id', (req, res) => {
    const id = req.params.id;

    res.send(`Fill me in to update values with ID: ${id}`);
});

app.post('/', (req, res) => {
    const body = req.body; // Hold your JSON in here!

    res.send(`You sent: ${body}`);
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}!`)
});
