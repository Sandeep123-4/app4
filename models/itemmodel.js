const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://xtry122:dV6zQGz1N5N9rV5k@sandeep123-4.is5vj.mongodb.net/?retryWrites=true&w=majority&appName=sandeep123-4', {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const itemSchema = mongoose.Schema({
    email: String,
    img:String,
    itemname: String,
    ingredients: String,
    description: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    address: String 
});

const itemData = mongoose.model('itemmodel', itemSchema);

module.exports = itemData;