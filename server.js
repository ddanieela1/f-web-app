require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const methodOverride = require('method-override');
const db = require("./models")
const path = require("path")

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log('hi', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(layouts);

//line 19-34 will run for each route
app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log('res locals >>>', res.locals) //.local is an object inside of the .res, key value of res object
  //res.local allowes to store data and use data
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/profile/edit', isLoggedIn, (req, res) => {
  res.render('edit');
});

app.put('/profile/:id', isLoggedIn, async (req, res) => {
  try {
    const usersUpdated = await db.user.update({
      email: req.body.email,
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    });

    console.log('********** PUT ROUTE *************');
    console.log('Users updated', usersUpdated);
    console.log('***********************');

    // redirect back to the profile page
    res.redirect('/profile'); // route
  } catch (error) {
    console.log('*********************ERROR***********************');
    console.log(error);
    console.log('**************************************************');
    res.render('edit');
  }
});

//access to all of our auth routes GET/auth/signup POST routes
app.use('/auth',require('./controllers/auth'));
app.use('/journals', isLoggedIn, require('./controllers/journals'));
app.use('/notes', isLoggedIn,require('./controllers/notes'));

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.get('*', (req, res) => {
  res.render('404');
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`You're listening to the smooth sounds of port ${PORT} ????`);
});

module.exports = server;
