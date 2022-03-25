const router = require('express').Router();
const Quizz = require('../../models/quizz');
const quizzSchema = require('../../models/quizz');
const { reqQuizz } = require('../../request');

//Get Quizz
router.get("/start", async (req, res) => {
    quizzSchema.count().exec(async function (err, resultCount) {
        const rand = Math.floor(Math.random() * resultCount);
        await quizzSchema.find().skip(rand).limit(10)
            .then((data) => {
                if (data.length > 0) {
                    res.render('quiz', { data })
                }
                else {
                    res.send('There is no Quizz available, please add questions.')
                }
            })
            .catch((error) => console.error(error));
    })
});

//Create Quizz
router.get('/add', (req, res) => {
    res.render('new_quiz');
});

router.post("/new", async (req, res) => {
    const { question } = req.body
    if (question) {
        const quizz = quizzSchema(req.body);
        await quizz.save()
            .then((data) => res.redirect("/api/"))
            .catch((error) => console.error(error));
    }
    else {
        res.render('new_quiz');
    }
});


// Create a Random quizz
router.get("/addrandom", async (req, res) => {
    const datas = reqQuizz();
    datas.then(async (data) => {
        if (data) {
            for (i in data) {
                const quizzRandom = quizzSchema(data[i]);
                await quizzRandom.save()
                    .catch((error) => console.error(error));
            }
            res.redirect('/api/')

        }
    })
});

// Update Quizz
router.get("/update", async (req, res) => {
    await quizzSchema
        .find()
        .then((data) => res.render('edit_quizz', { data }))
        .catch((error) => console.error(error));
});

router.get("/update/:id", async (req, res) => {
    const question = await Quizz.findById(req.params.id).lean();
    res.render('edit', { question })

});

router.post("/update/:id", async (req, res) => {
    await Quizz.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/api/')
});

//Delete a Question
router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await quizzSchema
        .deleteOne({ _id: id })
        .then((data) => res.redirect('/api/quizz/update'))
        .catch((error) => console.error(error));
});


module.exports = router;
