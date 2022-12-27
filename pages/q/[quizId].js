import PropTypes from 'prop-types';
import prisma from "../../lib/prisma";

const QuizId = ({ q }) => {
    console.log(q, 'this is our q prop');
    return (
        <div>

            <p>{q.title}</p>
            <p>{q.description}</p>

            {/* {q.map(item => {
                console.log(item); */}
                {/* //return html here
                // return <div key="{item.q}">{item.question}</div>; */}
            {/* })} */}

        </div>
    );
};

export default QuizId;

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

QuizId.propTypes = {
    q: PropTypes.object,
};
