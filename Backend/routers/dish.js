const express = require('express');
const router = express.Router();
const DishController = require('../controllers/dish');

router.get('/', DishController.getDishes);

// Particular Dish
router.get('/:id', DishController.getDish);
router.post('/', DishController.postDish);
router.delete('/:id', DishController.deleteDish);
router.put('/:id', DishController.updateDish);

module.exports = router;