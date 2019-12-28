let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = Schema({
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    imgurl: { type: String },
    description: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    readtime: { type: String, required: true },
    tags: [{ type: String }]
});

module.exports = mongoose.model("Post", postSchema);