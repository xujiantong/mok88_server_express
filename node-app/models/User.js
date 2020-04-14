const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// 将 schema 编译成 model
module.exports = User = mongoose.model("users", UserSchema);