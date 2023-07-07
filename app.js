const path = require('path');

const express = require('express');

const formRoutes = require('./routes/form');

const app = express();

const port = 3000;
const ipAddress = '';

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public')); // Serve static files (e.g. CSS files)

app.use(formRoutes);

app.use(function (error, req, res, next) {
    // Default error handling function
    // Will become active whenever any route / middleware crashes
    console.log(error);
    res.status(500).render('500');
});

app.listen(port);
// app.listen(port, ipAddress, () => {
//     console.log('Server running at http://' + ipAddress + ':' + port + '/');
// });
