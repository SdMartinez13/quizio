const CATEGORIES = {
    MOVIES: 'Movies',
    SPORTS: 'Sports',
    JAVASCRIPT: 'Javascript'
}



const quizzes = [
    // NEW QUIZ EXAMPLE
    {
        title: 'My first quiz',
        description: 'Some fake data form a description', // OPTIONAL
        is_active: true, // OPTIONAL
        categories: [CATEGORIES.MOVIES, CATEGORIES.JAVASCRIPT],
        questions: [
            {
                question: 'What color is grass?',
                choices: [
                    { correct: false, choice: 'red' },
                    { correct: true, choice: 'green' },
                    { correct: false, choice: 'green' },
                    { correct: false, choice: 'purple' }
                ],
                is_active: true,
                score: 5 // OPTIONAL
            },
            {
                question: 'What color are school busses?',
                choices: [
                    { correct: false, choice: 'red' },
                    { correct: false, choice: 'green' },
                    { correct: true, choice: 'yellow' },
                    { correct: false, choice: 'purple' }
                ],
                is_active: true,
                score: 8 // OPTIONAL
            }
        ]
    },
    // END NEW QUIZ EXAMPLE

    {
        title: 'Anoteher quizzzzz = CHANGE MEEEE',
        description: 'Some fake data form a description', // OPTIONAL
        is_active: true, // OPTIONAL
        questions: [
            {
                question: 'What color is grass?',
                choices: [
                    { correct: false, choice: 'red' },
                    { correct: true, choice: 'green' },
                    { correct: false, choice: 'green' },
                    { correct: false, choice: 'purple' }
                ],
                is_active: true,
                score: 5 // OPTIONAL
            },
            {
                question: 'What color are school busses?',
                choices: [
                    { correct: false, choice: 'red' },
                    { correct: false, choice: 'green' },
                    { correct: true, choice: 'yellow' },
                    { correct: false, choice: 'purple' }
                ],
                is_active: true,
                score: 8 // OPTIONAL
            }
        ]
    },


    // copy object above and paste here
]


module.exports = {
    quizzes,
    categories: CATEGORIES,
};
