// Student name: wsiu11
// Student ID: 301272297
// Filename: express.js
let config = require('./env/development'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    DB = require('./db.js'),
    mongoose = require('mongoose'),
    passport = require('passport');
var LocalStrategy = require('passport-local');
var authRouter = require('../app/routes/auth'); // the auth endpoint router.
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error in Connection'));
mongoDB.once('open', () => { console.log('Connected with your Databases') });


module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.Node_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // use auth endpoints
    app.use('/', authRouter);

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // initialize passport
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('session'));


    require('../app/routes/index.server.routes.js')(app);
    // add contact endpoints
    require('../app/routes/contact.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};