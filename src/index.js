const express = require('express');
require("dotenv").config();
const apiRouter = require('./routes/api')
const path = require('path');

// Initialization
const app = express()
const port = process.env.port || 9000
require('./db')
// Settings
app.set('views', 'src/views');
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRouter);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));


// App running
app.listen(port, () => {
    console.log(`App listening in port ${port}`)
})
