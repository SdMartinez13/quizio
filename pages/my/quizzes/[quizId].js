// import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import prisma from '../../../lib/prisma';
import CreateQuestion from '../../../components/CreateQuestion';

// https://dribbble.com/shots/14598957-Examica-Test

// import { Card, Spacer, Button, Text, Input, Row, Checkbox, Container } from '@nextui-org/react';

const QUESTION = {
    id: '1341asdga',
    question: 'Where is Carmen SANDIEGO!??!!',
    choices: [{ choice: 'who knossws?', correct: true }, { choice: 'At my place', correct: false }, { choice: 'who knows?', correct: false }, { choice: 'At my aaaaa', correct: false }],
    is_active: true,
}

const QUESTION_DEFAULT = {
    id: Math.random(),
    question: '',
    choices: [{ choice: '', correct: false }, { choice: '', correct: false }],
    is_active: true,
}

const MyQuizId = ({ q }) => {
    console.log(q, "QQQQQQQ");
    // const router = useRouter();

    const [questions, setQuestions] = useState([QUESTION]);

    return (
        <div className="text-center flex-col justify-center m-6 mt-10">
            <h1 className="text-5xl font-bold">{q.title}</h1>
            {questions.map(question => {
                console.log(question, 'Question!!!!');

                return <CreateQuestion key={question.id} question={question} />;
            })}


            <button onClick={() => setQuestions([...questions, QUESTION_DEFAULT])} type="submit" className="mb-4 bg-blue-600 text-white  min-w-full h-10 border border-blue">Add Question +</button>
            <button type="submit" className="bg-blue-600 text-white  w-96 h-10 border border-blue">Submit Quiz</button>
        </div>
    );
};

export default MyQuizId;

export const getServerSideProps = async (context) => {
    // const categories = await prisma.categories.findMany();
    const { quizId } = context.params;
    // get the router params
    // lowercase the url
    // find the categbory name in lowercase (prisma)

    const getQuiz = await prisma.quizzes.findUnique({
        where: {
            quiz_id: quizId,
        },
        include: {
            questions: {},
        },
    });

    return {
        props: { q: JSON.parse(JSON.stringify(getQuiz)) },
    };
};

MyQuizId.propTypes = {
    q: PropTypes.object,
};
