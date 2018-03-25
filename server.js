'use strict';

// init project
const express = require('express');
const app = express();
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || `${process.env.NOW_URL}/auth0-callback`
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());


// hbs is the handlebars view engine for express.
// https://github.com/pillarjs/hbs
// When we call response.render(), it'll render and respond with an html page
// generated from handlebars templates.
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
app.set('view engine', 'hbs');
hbsutils.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


const index = require("./routes/index");
app.use("/", index);

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
