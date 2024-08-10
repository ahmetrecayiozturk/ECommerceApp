const FoodModel = require('../hatalar/model/food_model');

class FoodService {
    static async saveFood(name, ingredients, preparing) {
        try {
            const createFood = new FoodModel({ name:name,ingredients:ingredients,preparing: preparing});
            return await createFood.save()
        } catch (error) {
            throw error;
        }
    }

    static async findFoodsByIngredients(ingredients) {
        try {
            const foods = await FoodModel.find({ ingredients: { $in: ingredients } });
            return foods;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FoodService;

