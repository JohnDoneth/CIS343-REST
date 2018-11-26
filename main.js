// Express imports
const express = require('express')
const app = express()

// The port our webserver will listen on
const port = 3000

// Populates our in memory database from programmers.json
var database = require('./programmers');

// Use the express.json() body parser
app.use(express.json())

/** Returns all users in our in-memory database */
app.get('/', (req, res) => {
    res.send(database);
});

/** Get the person from our DB with index /:id */
app.get('/:id', (req, res) => {
    const id = req.params.id;

    let person = database[id];

    if (person != null){
        res.send(person);
    } else {
        res.sendStatus(404);
    }
});

/** Update the person in our DB with index /:id */
app.put('/:id', (req, res) => {
    const id = req.params.id;

    const body = req.body;

    try {
        body.age = parseInt(body.age);
    } catch (e) {
        res.status(400).send("body.age must be a valid integer number").end();
    }
    if (body.firstName == null || typeof(body.firstName) != "string") {
        res.status(400).send("body.firstName must be a valid string").end();
    }
    else if (body.lastName == null || typeof(body.lastName) != "string") {
        res.status(400).send("body.lastName must be a valid string").end();
    }
    else if (body.age == null || typeof(body.age) != "number" || !Number.isInteger(body.age)) {
        res.status(400).send("body.age must be a valid integer number").end();
    }
    else if (body.role == null || typeof(body.role) != "string") {
        res.status(400).send("body.role must be a valid string").end();
    }
    else {
        let person = database[id];

        person.firstName = body.firstName;
        person.lastName = body.lastName;
        person.age = body.age;
        person.role = body.role;

        res.sendStatus(200).end();
    }

});

/** Create a new person from a JSON body and put it in our DB */
app.post('/', (req, res) => {

    const body = req.body;

    try {
        body.age = parseInt(body.age);
    } catch (e) {
        res.status(400).send("body.age must be a valid integer number").end();
    }

    if (body.firstName == null || typeof(body.firstName) != "string") {
        res.status(400).send("body.firstName must be a valid string").end();
    }
    else if (body.lastName == null || typeof(body.lastName) != "string") {
        res.status(400).send("body.lastName must be a valid string").end();
    }
    else if (body.age == null || typeof(body.age) != "number" || !Number.isInteger(body.age)) {
        res.status(400).send("body.age must be a valid integer number").end();
    }
    else if (body.role == null || typeof(body.role) != "string") {
        res.status(400).send("body.role must be a valid string").end();
    }
    else {
        database.push(body);
        res.sendStatus(200).end();
    }
});

/** Start listening for web requests */
app.listen(port, () => {
    console.log(`Application listening on port ${port}!`)
});
