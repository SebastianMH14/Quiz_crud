const mongoose = require("mongoose");

//model for quizz
const quizzSchema = mongoose.Schema(
    {
        response_code: Number,
        category: String,
        difficulty: String,
        question: String,
        correct_answer: String,
    });

module.exports = mongoose.model('Quizz', quizzSchema);
