const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const BookSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Book = mongoose.model("books", BookSchema);