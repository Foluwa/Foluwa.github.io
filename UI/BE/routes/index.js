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

//https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with

app.use(cookieParser());
// app.use(session(sess));
app.use(flash());

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("main/index");
});

/* GET about me page. */
router.get("/about-me", function(req, res, next) {
    res.render("main/about");
});

/* GET about page. */
router.get("/projects", function(req, res, next) {
    res.render("main/projects");
});

/* GET about page. */
router.get("/projectsid", function(req, res, next) {
    res.render("main/projectsid");
});

/* GET about page. */
router.get("/blog", function(req, res, next) {
    var productChunks = [];

    Post.find({})
        .sort({
            _id: -1
        })
        .then(result => {
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    productChunks.push([result[i]]);
                }
            }
            console.log(productChunks);
            res.render("main/blog", {
                posts: productChunks,
                csrfToken: req.csrfToken()
            });
        });
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
router.get("/dashboard", function(req, res, next) {
    res.render("main/dashboard", {
        csrfToken: req.csrfToken()
    });
});

router.post("/submit-blog-post", function(req, res, next) {
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    var today = new Date();

    let post = new Post({
        date: today.toLocaleDateString("en-US", options),
        title: req.body.title,
        imgurl: req.body.imgurl,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content,
        readtime: req.body.readtime + " minutes",
        tags: req.body.tags
    });
    post
        .save()
        .then(() => {
            res.status(201).json({
                message: "Post saved successfully!"
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
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