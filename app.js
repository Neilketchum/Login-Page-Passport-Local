const express = require('express')

const app = express();

const expressLayouts = require('express-ejs-layouts')

const mongoose =require('mongoose')

const flash = require('connect-flash')

const session = require('express-session')

const passport = require('passport')

// Config Passport
require('./config/passport')(passport)

// Express body parser
app.use(express.urlencoded({ extended: true }));
// EJS
app.use(expressLayouts)
app.set('view engine','ejs');

// Session MiddleWare
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport MiddleWare
app.use(passport.initialize())
app.use(passport.session())



// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


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




// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Searver started on ${PORT}`))