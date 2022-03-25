const axios = require('axios')

// Request question api to get random quizz
function reqQuizz() {
    return axios
        .get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
        .then(response => {
            const data = response.data.results
            return data
        })
        .catch(error => {
            console.error(error)
        });
};

module.exports = { reqQuizz };
