const CATEGORIES = {
    MOVIES: 'Movies',
    TV: 'TV',
    BOOKS: 'Books',
    SPORTS: 'Sports',
    JAVASCRIPT: 'Javascript',
    HTML: 'HTML',
    CSS: 'CSS',
    REACT: 'React',
};


const quizzes = [
    // NEW QUIZ EXAMPLE
    {
        title: 'Javascript 1',
        description: 'Vanilla Javascript', // OPTIONAL
        is_active: true, // OPTIONAL
        categories: [CATEGORIES.JAVASCRIPT],
        questions: [
            {
                question: 'Javascript is an _______ language?',
                // orderChoices: true, // used to randomize choices or not
                choices: [
                    { correct: false, choice: 'Object-Based' },
                    { correct: true, choice: 'Object-Oriented' },
                    { correct: false, choice: 'Procedural' },
                    { correct: false, choice: 'None of the above' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Inside which HTML element do we put the JavaScript?',
                // orderChoices: true, // used to randomize choices or not
                choices: [
                    { correct: false, choice: '<scripting>' },
                    { correct: true, choice: '<script>' },
                    { correct: false, choice: '<javascript>' },
                    { correct: false, choice: 'js' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Which operator returns true if the two compared values are not equal?',
                // orderChoices: true, // used to randomize choices or not
                choices: [
                    { correct: false, choice: '==!' },
                    { correct: true, choice: '!==' },
                    { correct: false, choice: '~' },
                    { correct: false, choice: '!=' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Which statement creates a new object using the Person constructor?',
                choices: [
                    { correct: false, choice: 'var student = Person()' },
                    { correct: false, choice: 'var student = construct Person;' },
                    { correct: true, choice: 'var student = new Person()' },
                    { correct: false, choice: 'var student = construct Person();' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Which of the following keywords is used to define a variable in Javascript?',
                // orderChoices: true, // used to randomize choices or not
                choices: [
                    { correct: false, choice: 'function' },
                    { correct: true, choice: 'const' },
                    { correct: false, choice: 'if' },
                    { correct: false, choice: 'else' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
        ],
    },
    // END NEW QUIZ EXAMPLE

    {
        title: 'Javascript 2',
        description: 'Vanilla Javascript', // OPTIONAL
        is_active: true, // OPTIONAL
        categories: [CATEGORIES.JAVASCRIPT],
        questions: [
            {
                question: 'How can a datatype be declared to be a constant type?',
                choices: [
                    { correct: false, choice: 'var' },
                    { correct: true, choice: 'const' },
                    { correct: false, choice: 'let' },
                    { correct: false, choice: 'constant' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'When an operators value is NULL, the typeof returned by the unary operator is:',
                choices: [
                    { correct: false, choice: 'Boolean' },
                    { correct: false, choice: 'Undefined' },
                    { correct: true, choice: 'Object' },
                    { correct: false, choice: 'Integer' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'What does the Javascript “debugger” statement do?',
                choices: [
                    { correct: false, choice: 'It will debug all the errors in the program at runtime' },
                    { correct: false, choice: 'It will debug errors in the current statement if any' },
                    { correct: true, choice: 'It acts as a breakpoint in a program' },
                    { correct: false, choice: 'It will do nothing' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Which function is used to serialize an object into a JSON string in Javascript?',
                choices: [
                    { correct: false, choice: 'parse()' },
                    { correct: false, choice: 'convert()' },
                    { correct: true, choice: 'stringify()' },
                    { correct: false, choice: 'It will do nothing' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
            {
                question: 'Which of the following is not a Javascript framework?',
                choices: [
                    { correct: true, choice: 'cassandra' },
                    { correct: false, choice: 'vue' },
                    { correct: false, choice: 'react' },
                    { correct: false, choice: 'node' },
                ],
                is_active: true,
                score: 1, // OPTIONAL
            },
        ],
    },


    // copy object above and paste here
];


module.exports = {
    quizzes,
    categories: CATEGORIES,
};
