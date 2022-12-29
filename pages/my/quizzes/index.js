import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import prisma from '../../../lib/prisma';

const MyQuizzes = ({ myQuizzes }) => {
    console.log(myQuizzes, 'PROPSS');
    return (
        <div className="bg-red-100 p-4">

            <div className="w-1/2 m-auto">


                <p className="mb-8">
                    Build your own quiz to send to friends for some friendly competion. You can also submit the quiz you create to be part of the ranked quizzes.
                </p>

                {myQuizzes.map(quiz => (
                    <div key={quiz.quiz_id} className="border border-gray-300 p-4 flex items-center justify-between my-2">
                        <Link href={`/my/quizzes/${quiz.quiz_id}`} className="underline">
                            {quiz.title}
                        </Link>
                        <div>

                            {quiz.is_active ? (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    <p className="text-sm">
                                        Active
                                    </p>
                                </div>

                            ) : (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    <p className="text-sm">
                                        Inactive
                                    </p>
                                </div>
                            )}
                            <p className="text-sm">
                                43 submissions
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyQuizzes;

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    const myQuizzes = await prisma.quizzes.findMany({
        where: { user_id: session.token.user_id },
    });

    return {
        props: { myQuizzes: JSON.parse(JSON.stringify(myQuizzes)) },
    };
};


MyQuizzes.propTypes = {
    myQuizzes: PropTypes.array,
};
