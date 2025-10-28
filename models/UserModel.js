var mongoose = require("mongoose");
var UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        }
    });

var UserModel = mongoose.model("Users", UserSchema, "Users");

module.exports = UserModel;