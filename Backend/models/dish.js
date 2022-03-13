const mongoose = require('mongoose');
const dishSchema = mongoose.Schema({
	name: String,
	imageUrl: String,
	category: String,
	label: String,
	price: Number,
	description: String,
	starRating: Number,
	comments: [{
		type: mongoose.Types.ObjectId,
		ref: 'comment'
	}]
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;