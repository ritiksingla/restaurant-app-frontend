const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
	rating: Number,
	comment: String,
	author: String,
	date: String
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;