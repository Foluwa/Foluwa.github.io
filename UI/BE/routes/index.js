const express = require("express");
const app = express();
const router = express.Router();
let session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const mongoose = require("mongoose");
var csrf = require("csurf");
var csrfProtection = csrf();
router.use(csrfProtection);
let Post = require("../models/blogpost");
let Workers = require("../models/workers");
let Gallery = require("../models/gallery");
const Controller = require("../controller/controller.js");

var sess = {
    secret: "keyboard cat",
    cookie: {}
};

app.use(cookieParser());
// app.use(session(sess));
app.use(flash());

/* GET home page. */
router.get("/", function(req, res, next) {
    let successMsg = req.flash("success")[0];
});

/* GET about page. */
router.get("/projects", function(req, res, next) {
    res.render("main/projects");
});

/* GET about page. */
router.get("/blog", function(req, res, next) {
    res.render("main/blog");
});

/* GET about page. */
router.get("/blog-post", function(req, res, next) {
    res.render("main/blog-post");
});

/* GET WORKERS registration page. */
router.get("/registration", function(req, res, next) {
    let successMsg = req.flash("success")[0];
    res.render("main/registration", {
        csrfToken: req.csrfToken()
    });
});

/* GET manage page. */
router.get("/dashboard", isLoggedIn, function(req, res, next) {
    //,isLoggedIn
});

//DELETE BLOG POST
router.get("/delete/:id", isLoggedIn, function(req, res) {
    //FIND AND DELETE GROUP
    console.log("Your id is " + req.params.id);
    Post.findByIdAndRemove(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            res.redirect("/dashboard" /*{csrfToken: req.csrfToken()}*/ );
            return res.status(204).end();
        })
        .catch(err => next(err));
});

//DISPLAY SIGNUP
router.post(
    "/signup",
    passport.authenticate("local.signup", {
        failureRedirect: "/signup",
        failureFlash: true
    }),
    function(req, res, next) {
        console.log("Your email is " + req.body.email);
        console.log("Your email is " + req.body.password);
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/dashboard");
        }
    }
);

//GET REQUEST TO SIGN IN
router.get("/signin", function(req, res, next) {
    res.render("main/signin", {
        csrfToken: req.csrfToken()
    });
});

//POST TO SIGNIN
router.post(
    "/signin",
    passport.authenticate("local.signin", {
        failureRedirect: "/signin",
        failureFlash: true
    }),
    function(req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/dashboard");
        }
    }
);

//LOGOUT ROUTE
router.get("/logout", isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect("/");
});

//ERROR PAGE
router.get("*", function(req, res, next) {
    res.render("main/error");
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect("/");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}