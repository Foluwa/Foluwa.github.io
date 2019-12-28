
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
let workersReg = require('../models/workers');
let Gallery = require('../models/gallery');
let Post = require('../models/blogpost');


let sess = {
  secret: 'keyboard cat',
  cookie: {}
} 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session(sess));
app.use(flash());

//USER AUTHENTICATION 
exports.registerUser = (req,res,next) => {
			workersReg.findOne({"email":req.body.email})
			.then((email)=>{
				if(email){
					console.log(email);
					// res.redirect('/registration');
					res.json({message:"Email Address already exist."});
				}else{

					  var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var today = new Date();



					let worker = new workersReg({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						gender: req.body.gender,
						course: req.body.course,
						dob: req.body.dob,
						phoneNumber: req.body.phoneNumber,
						email: req.body.email,
						guardianName: req.body.guardianName,
						guardianNumber: req.body.guardianNumber,
						fellowshipYear: req.body.fellowshipYear,
						graduationYear: req.body.graduationYear,
						deptFellowship: req.body.deptFellowship,
						psf: req.body.psf,
						regDate: today.toLocaleDateString("en-US", options)
					});
					worker.save(function(err, result){
						if (err) {
							console.log("An error Occured");
							console.log(err)
						}else{
							console.log("Successfully Registered for RCFUniosun Workers Registration");
							req.flash('success', 'You have Successfully pre-registered for RCFUniosun Workers Registration.');
							// res.redirect('/registration');
							res.json({message:"You have successfully registered for the workers form."});

						}
					})
				}
			})
			.catch((err)=>{
				console.log(err);
			});
	
			//res.render('main/registration');
}

//PICTURE SUBMISSION
 exports.submitGallery = (req,res,next) => {
 	let gallery = new Gallery({
						gallery_url: req.body.gallery_url,
						picDesc: req.body.picDesc
					});
					gallery.save(function(err, result){
						if (err) {
							console.log("An error Occured");
							console.log(err)
							res.json({message:"An error occured."});
						}else{
							console.log("Successfully Registered for RCFUniosun Workers Registration");
							req.flash('success', 'You have Successfully registered for Workers Registration.');
							res.json({message:"Picture submitted successfully."});

						}
					});
 }


//ADDING BLOGPOST
exports.addBlogPost = (req,res,next) => {
	console.log("About to submit blog post ");
    console.log("About to save to the database");
          var successMsg = req.flash('success')[0];
          var post = new Post({ 
                title : req.body.title,
                body : req.body.body,
                tags: req.body.tags,
                url: req.body.url,
                author: req.body.author
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
                .catch((uploaderror)=>{
                  console.log(uploaderror);
                });
      
              res.render('main/dashboard',{
              		csrfToken: req.csrfToken(),
                    successMsg: successMsg, 
                    noMessages: !successMsg

        });
}

