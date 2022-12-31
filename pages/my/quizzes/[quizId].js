// import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import prisma from '../../../lib/prisma';


// import { Card, Spacer, Button, Text, Input, Row, Checkbox, Container } from '@nextui-org/react';

const MyQuizId = ({ q }) => {
    console.log(q, "QQQQQQQ");
    // const router = useRouter();

    return (
        <div className="text-center flex-col justify-center m-6 mt-10">
            <h1 className="text-5xl font-bold">{q.title}</h1>
            <form className="flex-col bg-gray-200 px-4 py-8 m-6">
                <div className="max-w-xl m-auto">
                    <div className="flex-col mb-6">
                        <div className="flex mb-4">
                            <button type="button" className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -mr-6 mt-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -mr-6 mt-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <label htmlFor="create-question" className="mb-2 mt-3 text-lg mr-4 font-medium text-gray-900">Question</label>
                        </div>
                        <div className="flex">
                            <div className="flex w-1/4" />

                            <input type="text" id="create-question" className="p-4 w-full text-gray-900 bg-gray-50 rounded-sm border border-gray-300" />
                        </div>
                    </div>

                    <div className=" flex justify-left mb-6">
                        <div className="flex w-1/4">
                            <button type="button" className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mr-4 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <label htmlFor="create-answer-a" className="mb-2 text-md mr-4 mt-2 font-medium text-gray-900">A</label>
                        </div>
                        <input type="text" id="create-answer-a" className="p-2 w-full text-gray-900 bg-white rounded-sm border border-gray-300" />
                    </div>

                    <div className=" flex justify-left mb-6">
                        <div className="flex w-1/4">

                            <button type="button" className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mr-4 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <label htmlFor="create-answer-b" className="mb-2 text-md mr-4 mt-2 font-medium text-gray-900">B</label>
                        </div>
                        <input type="text" id="create-answer-b" className="p-2 w-full text-gray-900 bg-white rounded-sm border border-gray-300" />
                    </div>

                    <div className=" flex justify-left mb-6">
                        <div className="flex w-1/4">

                            <button type="button" className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mr-4 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <label htmlFor="create-answer-c" className="mb-2 text-md mr-4 mt-2 font-medium text-gray-900">C</label>
                        </div>
                        <input type="text" id="create-answer-c" className="p-2 w-full text-gray-900 bg-white rounded-sm border border-gray-300" />
                    </div>

                    <div className=" flex justify-left mb-6">
                        <div className="flex w-1/4">

                            <button type="button" className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mr-4 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <label htmlFor="create-answer-d" className="mb-2 text-md mr-4 mt-2 font-medium text-gray-900">D</label>
                        </div>

                        <input type="text" id="create-answer-d" className="p-2 w-full text-gray-900 bg-white rounded-sm border border-gray-300" />
                    </div>

                </div>
            </form>
            {/* <h2>My Quiz ID: {router.query?.quizId}</h2> */}
            {/* <h2>{q.title}</h2>

            <form className="my-4 bg-red-100 h-40">
                <h2 className="text-3xl text-center pb-8">Question</h2>
                <div className="flex space-x-6">
                    <div className="w-full mb-4">

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="create-first-name">
                            Text
                        </label>
                        <input
                            className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white',
                                id = "question",
                                type = "text"
                                />
                                <button type="button" className="flex ">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -mr-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                </button>

                    </div>
                </div>
            </form> */}
            {/* <div className="my-4 bg-red-100 h-40">
                <h1>Text 2</h1>
            </div> */}
            <button type="submit" className="mb-4 bg-blue-600 text-white  min-w-full h-10 border border-blue">Add Question +</button>
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
