require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const path = require('path');

// import Routes
const dataRoutes = require('./routes/data');
const statRoutes = require('./routes/stat');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Headers', '*');
    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', `PUT, POST, PATCH, DELETE, 
    //     GET`);
    //     return res.status(200).json({});
    // }
    // next();
// })

// Routes to handle requests
app.use('/api/data', dataRoutes);
app.use('/api/stat', statRoutes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;