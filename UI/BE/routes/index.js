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
let Post = require('../models/blogpost');
let Workers = require('../models/workers');
let Gallery = require('../models/gallery');
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
    let successMsg = req.flash('success')[0];
    var productChunks = [];

    Post.find({}).sort({
        _id: -1
    }).limit(3).then((result) => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                productChunks.push([result[i]]);
            }
        }
        res.render('main/index', {
            posts: productChunks,
            csrfToken: req.csrfToken()
        });
    });

    /* GET about page. */
    router.get('/about', function (req, res, next) {
        res.render('main/about');
    });

    /* GET contact  page. */
    router.get('/contact', function (req, res, next) {
        res.render('main/contact');
    });

    /* GET event page. */
    router.get('/events', function (req, res, next) {
        res.render('main/event');
    });

    /* GET news  page. */
    router.get('/news', function (req, res, next) {
        res.render('main/news');
    });

    /* GET GALLERY page. */
    router.get('/gallery', function (req, res, next) {
        let successMsg = req.flash('success')[0];
        var productChunks = [];

        Gallery.find({}).sort({
            _id: -1
        }).then((result) => { //.limit(3).then
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    productChunks.push([result[i]]);
                }
            }
            res.render('main/gallery', {
                gallery: productChunks,
                csrfToken: req.csrfToken()
            });
        });
    });


    /* POST GALLERY page. */
    router.post('/gallery', Controller.submitGallery, function (req, res, next) {});

    /* GET WORKERS registration page. */
    router.get('/registration', function (req, res, next) {
        let successMsg = req.flash('success')[0];
        res.render('main/registration', {
            csrfToken: req.csrfToken()
        });
    });

    /* POST WORKERS registration page. */
    router.post('/registration', Controller.registerUser, function (req, res, next) {

    });

    /* POST authentication page to add a new blog post. */
    router.post('/submit-blog-post', Controller.addBlogPost, function (req, res, next) {});

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
    router.get('/dashboard', isLoggedIn, function (req, res, next) { //,isLoggedIn
        console.log("GET ROUTE /dashboard")
        var successMsg = req.flash('success')[0];

        //     //FETCH WORKERS INFO
        //     Workers.find(function(err, docs){
        //     var workersChunks =  [];
        //     var chunkSize = 900000;
        //     for(var i=0; i < docs.length; i += chunkSize){
        //       workersChunks.push(docs.slice(i, i+chunkSize)); 
        //     }
        //     console.table(workersChunks)



        //     //FETCH BLOG POSTS
        //     Post.find(function(err, docs){
        //     var productChunks =  [];
        //     var chunkSize = 900000;
        //     for(var i=0; i < docs.length; i += chunkSize){
        //       productChunks.push(docs.slice(i, i+chunkSize)); 
        //     }
        //     console.table(productChunks);
        //     });
        //  });

        //         //PENDING REQUESTS
        //     Workers.find({'auth':false}),function(){
        //     var pendingWorkers =  [];
        //     var chunkSize = 900000;
        //     for(var i=0; i < docs.length; i += chunkSize){
        //       pendingWorkers.push(docs.slice(i, i+chunkSize)); 
        //     }
        //     console.table(pendingWorkers)
        //     //
        //      };


        Workers.find({'auth': true}).sort({
                _id: -1
            })
            .then(workers => {
                //console.log('Posts is' + workers)
                Workers.find({
                        'auth': false
                    })
                    .then(pendingWorkers => {
                        //console.log('Pending is' + pendingWorkers)
                        Post.find({})
                            .then(posts => {
                                console.log('Posts is' + posts)
                                res.render('main/dashboard', {
                                    user: req.user,
                                    workers: workers,
                                    pendingWorkers: pendingWorkers,
                                    posts: posts,
                                    successMsg: successMsg,
                                    noMessages: !successMsg,
                                    csrfToken: req.csrfToken()
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(`Error : ${err}`)
                    })
            })
            .catch(err => {
                console.log(`There is an error ${err}`);
            })

    });
});

//PROCESS WORKER ACCEPTANCE
//ACCEPT WORKERS REQUEST
router.get("/accept/:id", function (req, res) {
    console.log(req.params.id)
    var myquery = {_id : req.params.id}
    var newvalues = {$set: {auth : 'true'}}
    Workers.updateOne(myquery, newvalues, function(err, res){
        console.log('Product Updated');
        if(err) throw err;
     })
    req.flash('success', 'Workers Details has been Edited');
    res.redirect('/dashboard');

});









//REJECT WORKERS REQUEST
router.get("/reject/:id", isLoggedIn, function (req, res) {
    //DELETE
    console.log("Your id is " + req.params.id)
    //findOneAndDelete(req.params.id)
    Workers.findOneAndDelete(
      req.params.id
    )
    .then(() => {
        console.log("Deleted successfully")
      res.redirect('/dashboard')
    })
    .catch(err => {
      res.status.json({
        err: err
      });
    });
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
            res.redirect("/dashboard" /*{csrfToken: req.csrfToken()}*/ );
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


//ERROR PAGE
// router.get('*', function(req, res, next) {
//     res.render('main/error');
// });

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