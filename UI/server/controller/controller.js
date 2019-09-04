
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
let Post = require('../models/Posts');
let sess = {
	secret: 'keyboard cat',
	cookie: {}
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session(sess));
app.use(flash());

//ADDING BLOGPOST
exports.addBlogPost = (req, res, next) => {
	console.log("About to submit blog post ");
	console.log("About to save to the database");
	var successMsg = req.flash('success')[0];

	var options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	var today = new Date();


	var post = new Post({
		title: req.body.title,
		body: req.body.body,
		tags: req.body.tags,
		url: req.body.url,
		author: req.body.author,
		regDate: today.toLocaleDateString("en-US", options)
	});
	console.log(post);

	post.save()
		.then(data => {
			console.log('Saving post to database');
			console.log(data);
			console.log('Post saved successfully');
		}).catch(err => {
			res.status(500).send({
				message: err.message
			})
		})
		.catch((uploaderror) => {
			console.log(uploaderror);
		});

	res.render('main/dashboard', {
		csrfToken: req.csrfToken(),
		successMsg: successMsg,
		noMessages: !successMsg

	});
}

