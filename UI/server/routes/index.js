const express = require('express');
const app = express();
const router = express.Router();
let session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
let Post = require('../models/Posts');
const Controller = require('../controller/controller.js');

var sess = {
    secret: 'keyboard cat',
    cookie: {}
}

app.use(cookieParser());
// app.use(session(sess));
app.use(flash());

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main/index', {
        posts: productChunks,
        csrfToken: req.csrfToken()
    });
});

/* POST authentication page to add a new blog post. */
router.post('/submit-blog-post', Controller.addBlogPost, function (req, res, next) { });

/* GET BLOG PAGE. */
router.get('/blog', function (req, res, next) {
    var productChunks = [];

    Post.find({}).sort({
        _id: -1
    }).then((result) => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                productChunks.push([result[i]]);
            }
        }
        res.render('main/blog', {
            posts: productChunks,
            csrfToken: req.csrfToken()
        });
    });

});


/* GET BLOG PAGE. */
router.get('/blog-post/:id', function (req, res, next) {

    var productChunks = [];
    var id = req.params.id;
    //console.log("Post is " +_id);
    Post.find({
        '_id': id
    }).then((result) => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                productChunks.push([result[i]]);
            }
        }
        console.log(productChunks);

        res.render('main/blog-post', {
            posts: productChunks,
            csrfToken: req.csrfToken()
        });
    });
});

/* GET manage page. */
router.get('/dashboard', isLoggedIn, function (req, res, next) {
    var successMsg = req.flash('success')[0];

});

//DELETE BLOG POST
router.get("/delete/:id", isLoggedIn, function (req, res) {
    //FIND AND DELETE GROUP
    console.log("Your id is " + req.params.id)
    Post
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            res.redirect("/dashboard" /*{csrfToken: req.csrfToken()}*/);
            return res.status(204).end();
        })
        .catch(err => next(err));
});

//DISPLAY SIGNUP
router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/signup',
    failureFlash: true
}), function (req, res, next) {
    console.log("Your email is " + req.body.email);
    console.log("Your email is " + req.body.password);
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/dashboard')
    }
});

//GET REQUEST TO SIGN IN
router.get('/signin', function (req, res, next) {
    res.render('main/signin', {
        csrfToken: req.csrfToken()
    });
});

//POST TO SIGNIN
router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/dashboard');
    }
});

//LOGOUT ROUTE
router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});


// GET 404 PAGE
router.get('*', function(req, res, next) {
    res.render('main/error');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}