var mongoose = require("mongoose");
var CategorySchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String
        },
        description: String
    }
)

var CategoryModel = mongoose.model("Categories", CategorySchema, "Categories");

module.exports = CategoryModel;