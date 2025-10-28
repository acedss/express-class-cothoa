var mongoose = require("mongoose");
var CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Name must be at least 3 characters long'],
            maxLength: [21, 'Name cannot exceed 21 characters']
        },
        price: {
            type: Number,
            min: [0, 'Price must be a positive number'],
            max: 10000
        },
        image: {
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }
    }
)

var ProductModel = mongoose.model("Products", CategorySchema, "Products");

module.exports = ProductModel;