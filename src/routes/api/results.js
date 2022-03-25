const router = require('express').Router();
const resultSchema = require('../../models/results')
const quizzSchema = require('../../models/quizz');



// Receive the results
router.post('/receive', async (req, res) => {
    const correct_answers = []
    let count = 0;
    const result = {
        'user': null,
        'responses': []
    }
    for (const element in req.body) {
        if (element === 'user') {
            result.user = req.body[element]
            delete req.body.user
        }
    }
    let answers = []
    answers.push(req.body)
    result.responses = answers
    const saveResult = await resultSchema(result);
    saveResult.save()
        .then(async (data) => {
            for (const answer in data.responses[0]) {
                const query = quizzSchema.find({ '_id': answer })
                const dataResultQuery = await query.exec();
                if (data.responses[0][answer] == dataResultQuery[0].correct_answer) {
                    correct_answers.push(dataResultQuery[0].question)
                }
            }
        })
        .catch((error) => {throw error})
        .finally(() => {
        });
        return res.send(JSON.stringify({'id':correct_answers.length}))
})

//Show score
router.get('/score/:id', (req, res) => {
    const { id } = req.params;
    res.render('results', { id })
})

module.exports = router;