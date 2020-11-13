const express = require('express')

const app = express();

const expressLayouts = require('express-ejs-layouts')

// EJS
app.use(expressLayouts)
app.set('view engine','ejs');


// Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))

// Middleware
app.use(express.urlencoded({ extended: true }));


// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Searver started on ${PORT}`))