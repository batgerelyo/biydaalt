// brain of all application
// include all dependencies here middleware express

const express = require('express');
// layouts template usage, 
const expressLayouts = require('express-ejs-layouts'); 


const app = express();
// environment port number / local host 
const port = process.env.PORT || 3000;

require('dotenv').config();

// middelewares
// true means qs library for more advanced parsing functionalities
app.use(express.urlencoded({ extended: true }));
// This middleware function is commonly used to serve static files such as HTML, CSS, JavaScript, images, and other assets in an Express application.
app.use(express.static('public')); 
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to Port ${port}`));
