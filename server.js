const express = require('express');
const path = require('path');
const fs = require('fs');

let uuid;

const db = require('./db/db.json');
console.log(db);

const PORT = 3001;

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for static public files
app.use(express.static('public'));

// HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API routes

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: genID(),
        };
    db.push(newNote);
    noteString = JSON.stringify(db);

    fs.writeFile('./db/db.json', noteString, (err) =>
        err
            ? console.error(err)
            : console.log(
                'Note saved successfully!'
            ))

    const response = {
        status: 'success',
        body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json('Error in posting note');
    }
});

app.delete('/api/notes/:id', (req, res) => {

// req.params.id is a handy way for us to pull the id
// Note the conversion into an integer here. This was necessary.
    let id = Number(req.params.id);
    let index = db.findIndex(note => note.id === id);
    dbB4 = JSON.stringify(db);
    db.splice(index, 1);
    updateDB = JSON.stringify(db);

    fs.writeFile('./db/db.json', updateDB, (err) =>
        err
            ? console.error(err)
            : console.info(
                `Note ID: ${id} deleted.`
            ))
// I discovered you must have the response handling or the deletion will not work properly.
    res.status(201).json({ message: 'Note deleted. Congrats.' });
});


const genID = function() { 
    do {
        uuid = Math.floor(Math.random() * 9999);
    } while (db.some(note => db.uuid === uuid));
    return uuid;
};

// The wildcard handler must be called after the API handlers
// Or else our server script will not work properly.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });