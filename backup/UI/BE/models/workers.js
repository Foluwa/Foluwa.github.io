//Mongoose Schema FOR WORKERS REGISTRATION
// Import Mongoose
let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let regSchema = new Schema ({
	firstName : {type : String, required: true},
	lastName : {type : String, required: true},
	gender : {type : String, required: true},
	course: {type : String, required: true},
	dob: {type : String, required: true},
	phoneNumber: {type : Number, required: true},
	email: {type : String, required: true},
	guardianName: {type : String, required: true},
	guardianNumber: {type : String, required: true},
	fellowshipYear: {type : String, required: true},
	graduationYear: {type : String, required: true},
	deptFellowship: {type : String, required: true},
	psf: {type : String, required: true},
	auth: {type : Boolean, required: true, default:false},
	regDate: { type: String, required: true}
});

module.exports = mongoose.model('Workers', regSchema);
			
