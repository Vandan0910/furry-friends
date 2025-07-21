import foodModel from "../models/foodModel.js";
import fs from "fs";

// 📌 Get all food items with optional category filter
const listFood = async (req, res) => {
    try {
        const { category } = req.query;  // Check if a category filter is passed
        const filter = category ? { category: { $in: ['Dogfood', 'Catfood'] } } : {};  // Only Dogfood and Catfood
        const foods = await foodModel.find(filter);
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ success: false, message: "Error fetching food items." });
    }
};

// 📌 Add a new food item
const addFood = async (req, res) => {
    try {
        let image_filename = req.file.filename;

        // ✅ Convert breeds string back to an array
        const breeds = JSON.parse(req.body.breeds).map(breed => breed.toLowerCase()); // Convert breeds to lowercase

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            breeds: breeds  // ✅ Store breeds as lowercase
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ success: false, message: "Error adding food item." });
    }
};

// 📌 Delete food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ success: false, message: "Error deleting food item." });
    }
};

// 📌 Get food by detected breed (Case-Insensitive Matching)
const getFoodByBreed = async (req, res) => {
    try {
        let { breed } = req.params;
        breed = breed.toLowerCase(); // ✅ Convert detected breed to lowercase

        const foods = await foodModel.find({
            breeds: { $regex: new RegExp(`^${breed}$`, "i") } // ✅ Case-insensitive regex match
        });

        if (foods.length === 0) {
            return res.status(404).json({ success: false, message: "No products found for this breed." });
        }

        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food items by breed:", error);
        res.status(500).json({ success: false, message: "Error fetching food items by breed." });
    }
};

export { listFood, addFood, removeFood, getFoodByBreed };
