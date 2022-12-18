

export const data = [
    // NEW QUIZ EXAMPLE
    {
        title: 'My first quiz',
        description: 'Some fake data form a description', // OPTIONAL
        is_active: true, // OPTIONAL
        questions: [
            {
                question: 'What color is grass?',
                answers: [
                    { correct: false, answer: 'red' },
                    { correct: true, answer: 'green' },
                    { correct: false, answer: 'green' },
                    { correct: false, answer: 'purple' }
                ],
                is_active: true,
                score: 5 // OPTIONAL
            },
            {
                question: 'What color are school busses?',
                answers: [
                    { correct: false, answer: 'red' },
                    { correct: false, answer: 'green' },
                    { correct: true, answer: 'yellow' },
                    { correct: false, answer: 'purple' }
                ],
                is_active: true,
                score: 8 // OPTIONAL
            }
        ]
    },
    // END NEW QUIZ EXAMPLE


    // copy object above and paste here
]