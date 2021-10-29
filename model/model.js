const mongoose = require('mongoose')

// creating the schema

var scheema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        // required: true,
      },
      contact: {
        type: Number,
        required: true
      }
});

const data = mongoose.model("data", scheema);

module.exports = data;