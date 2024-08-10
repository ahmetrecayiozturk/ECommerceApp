const FoodService = require('../../services/food_services');

exports.save = async function(req, res, next) {
    try {
        const { name, ingredients, preparing } = req.body;
        const food = await FoodService.saveFood(name, ingredients, preparing);
        res.status(201).json({
            message: "food saved",
            food
        });
    } catch (error) {
        next(error);
    }
};
exports.findFoodsByIngredients = async function (req, res, next) {
    try {
        const { ingredients } = req.body;
        const foods = await FoodService.findFoodsByIngredients(ingredients);
        res.json(foods);
    } catch (error) {
        next(error);
    }
};