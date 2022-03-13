const Dish = require('../models/dish');
const Comment = require('../models/comment');

exports.getDishes = async(req, res)=> {
	let dishes = await Dish.find();
	res.send(dishes);
};

exports.getDish =  async(req, res) => {
	let dish = await Dish.findOne({_id: req.params.id});
	res.send(dish);
};

exports.postDish = async(req, res)=> {
	const {name, imageUrl, category, label, price, description, starRating} = req.body;
	let dish = new Dish({name, imageUrl, category, label, price, description, starRating});
	dish = await dish.save();
	res.send(dish);
};

exports.deleteDish = async(req, res)=> {
	let dish = await Dish.findByIdAndDelete({_id: req.params.id});
	res.send(dish);
};

exports.updateDish = async(req, res) => {
	const {name, imageUrl, category, label, price, description, starRating} = req.body;
	let updates = {name, imageUrl, category, label, price, description, starRating};
	let dish = await Dish.findByIdAndUpdate({_id: req.params.id},{ $set: updates },{ new: true });
	res.send(dish);
};