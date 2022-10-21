// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

// Callback to debug server running
function listening() {
    console.log('server is running');
    console.log(`port is ${port}`);
};

// Data array
// const data = [];

// Get route
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route
app.post('/weatherData', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temperature;
    projectData['userResponse'] = req.body.userResponse;
    res.send(projectData);
});