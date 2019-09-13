let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = Schema({
	date: {type: Date, default: Date.now},
    gallery_url:{type: String, required: true},
    picDesc: {type: String},
});


module.exports = mongoose.model('Gallery', postSchema);