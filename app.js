const express = require('express')

const app = express();

const expressLayouts = require('express-ejs-layouts')

const mongoose =require('mongoose')
// Express body parser
app.use(express.urlencoded({ extended: true }));
// EJS
app.use(expressLayouts)
app.set('view engine','ejs');

// DB Config
const db = require('./config/keys').MongoURI
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))

// Middleware


// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Searver started on ${PORT}`))