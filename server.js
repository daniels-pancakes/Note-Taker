const express = require('express');

const PORT = 3001;

const app = express();

// Middleware for static public files
app.use(express.static('public'));

// HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// API routes

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });