const router = require('express').Router();

const apiQuizz = require("./api/quizz");
const apiResults = require("./api/results");

//enrutador
router.use('/quizz', apiQuizz);
router.use('/results', apiResults);
router.use('/', (req, res) => {
    res.render('index');
});

module.exports = router;
