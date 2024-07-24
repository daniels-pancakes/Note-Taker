const express = require('express');
const path = require('path');
const fs = require('fs');

const db = require('./db/db.json');

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
    res.status(500).json('Erro in posting note');
    }
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });