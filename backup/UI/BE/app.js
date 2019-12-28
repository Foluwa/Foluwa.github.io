const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
let flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
let keys = require('./keys.js');
const router = express.Router();

const routes = require('./routes/index');
const app = express();
const PORT = process.env.PORT  || 3100;


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }).then(//useNewUrlParser: true,
  function(res){
   console.log("Connected to Database Successfully.");
  }
).catch(function(err){
  console.log("Connection to Database failed.");
  console.log(err);
});
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));//favicon.ico
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //false
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
 // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = router;