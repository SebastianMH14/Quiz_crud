const mongoose = require("mongoose");

//model for results
const resultSchema = mongoose.Schema({
    user: String,
    responses: [
        Object
    ],
});

module.exports = mongoose.model('Results', resultSchema);
