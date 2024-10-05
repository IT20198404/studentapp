const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const studentsRoute = require('./routes/students');

// Create Express app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes for students
app.use('/', studentsRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
