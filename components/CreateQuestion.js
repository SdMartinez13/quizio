import PropTypes from 'prop-types';
// import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { useForm, useFieldArray } from 'react-hook-form';

const alpha = 'ABCDEFGHIJK';

const CreateQuestion = (props) => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: props.question });
    const { fields, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'choices', // unique name for your Field Array
    });

    const onSubmit = async fields => {
        console.log(fields, 'fields');

        // TODO: submit to the backend
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col bg-gray-200 px-4 py-8 m-6">
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

                        <div className="w-full">
                            <input
                                type="text"
                                id="create-question"
                                className="p-4 w-full text-gray-900 bg-gray-50 rounded-sm border border-gray-300"
                                // value={props.question.question}
                                {...register('question', {
                                    required: 'Question field is required',
                                })}
                            />
                            {errors.question?.message && (
                                <p className="text-red-500 text-xs">{errors.question.message}</p>
                            )}
                        </div>
                    </div>
                </div>


                <div className="bg-blue-200">
                    {fields.map((choice, ind) => {
                        const select = () => {
                            setValue('choices', props.question.choices.map(item => ({ ...item, correct: false })));
                            update(ind, { ...choice, correct: !choice.correct });
                        };

                        return (
                            <div key={choice.id} className="flex justify-left mb-6">
                                <div className="flex w-1/4">
                                    <button type="button" className="flex">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mr-4 mt-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                    </button>
                                    <label htmlFor="create-answer-a" className="mb-2 text-md mr-4 mt-2 font-medium text-gray-900">{alpha[ind]}</label>
                                </div>

                                <div className="bg-white flex w-full p-1 rounded border border-gray-300">

                                    <input
                                        type="text"
                                        id="create-answer-a"
                                        className="p-2 w-full text-gray-900 bg-white rounded-sm"
                                        {...register(`choices.${ind}.choice`, {
                                            required: {
                                                value: ind <= 1,
                                                message: 'Question field is required',
                                            },
                                        })}
                                    />


                                    <button
                                        type="button"
                                        className={classNames('p-2 rounded', {
                                            'text-white bg-green-600': choice.correct,
                                            'text-green-600 bg-green-200': !choice.correct,
                                        })}
                                        onClick={select}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>


                {/* <div className=" flex justify-left mb-6">
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
                </div> */}

            </div>

            <button type="submit" className="bg-red-100 p-4">SAVE QUESTION</button>
        </form>
    );
};

export default CreateQuestion;

CreateQuestion.propTypes = {
    question: PropTypes.object.isRequired,
};
