import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classNames from 'classnames';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Modal, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import ActiveLink from './ActiveLink';

const Navbar = () => {
    const [isCreateQuizModalVisible, setIsCreateQuizModalVisible] = useState(false);
    const session = useSession();
    // console.log(session, 'ssessions')
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    // console.log(router, 'router')

    // dont show router on login page
    if (router.pathname === '/login') return null;
    // if (router.pathname === '/dashboard') return null;
    const handler = () => setIsCreateQuizModalVisible(true);

    const closeHandler = () => {
        setIsCreateQuizModalVisible(false);
        reset();
        console.log('closed');
    };

    const onSubmit = async fields => {
        console.log(fields, 'fields');
        const res = await axios.post('/api/quizzes', fields);

        console.log(res, 'RES IN FRONTEND');


        // TODO:
        // if res.data.quiz_id
        // router.push to the next page

        if (res.data?.quiz_id) {
            closeHandler();
            return router.push(`/my/quizzes/${res.data.quiz_id}`);
        }
        return false;
    };


    return (
        <div className="bg-white border-gray-200 shadow-lg">
            {/* <div className="flex flex-wrap space-x-10 items-center justify-between my-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-200 shadow-lg"> */}
            <div className="w-full p-4">

                <div className="max-w-screen-xl m-auto flex gap-4 justify-between">


                    <div className="flex gap-x-4">

                        <ActiveLink href="/">Home</ActiveLink>
                        <ActiveLink href="/categories">Categories</ActiveLink>

                        {!session.data && (
                            <ActiveLink href="/dashboard">My Dashboard</ActiveLink>
                        )}

                        <ActiveLink href="/about">About</ActiveLink>

                        {!!session.data && (

                            <ActiveLink href="/protected">Protected</ActiveLink>
                        )}

                    </div>
                    {session.status !== 'loading' && (

                        !session.data ? (
                            <Link
                                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
                                href="/login"
                            >
                                === Log In ===
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
                            >
                                Logout
                            </button>
                        )
                    )}
                </div>
            </div>

            {!!session.data && (
                <div className="w-full border-t border-gray-200 p-2">
                    <div className="max-w-screen-xl m-auto flex gap-4 justify-between">

                        <div className="flex space-x-4">
                            <Link
                                href="/dashboard"
                                className={classNames({ 'font-bold': router.asPath === '/dashboard' })}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/my/quizzes"
                                className={classNames({ 'font-bold': router.asPath.includes('/my/quizzes') })}
                            >
                                My Quizzes
                            </Link>
                            <Link
                                href="/scoreboard"
                                className={classNames({ 'font-bold': router.asPath === '/scoreboard' })}
                            >
                                Scoreboard
                            </Link>
                        </div>

                        <button type="button" onClick={handler}>Create Quiz</button>
                    </div>

                </div>
            )}


            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={isCreateQuizModalVisible}
                onClose={closeHandler}
                css={{ borderRadius: 4 }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8">

                    <h2 className="text-2xl font-bold pb-2">Create a quiz</h2>
                    <div className="text-sm px-4 pb-4">Create a quiz to send to your friends for some friendly competion!</div>

                    <div className="w-full mb-6 text-left">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quiz-name">
                            Quiz Name
                        </label>
                        <input
                            className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                                'border-red-500': !!errors.title,
                                'focus:border-gray-300': !errors.title,
                            })}
                            id="quiz-name"
                            type="text"
                            {...register('title', { required: 'Name field is required' })}
                        />

                        {errors.title?.message && (
                            <p className="text-red-500 text-xs">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-red-100">
                            Submit
                        </button>
                    </div>

                </form>
            </Modal>
        </div>

    );


    // OLD NAV BAR

    // return (
    //     <div className="flex flex-wrap space-x-10 items-center justify-between my-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-200 shadow-lg">

    //         <div className="flex gap-x-4">

    //             <ActiveLink href="/">Home</ActiveLink>
    //             <ActiveLink href="/dashboard">My Dashboard</ActiveLink>

    //             <ActiveLink href="/about">About</ActiveLink>

    //             {!!session.data && (

    //                 <ActiveLink href="/protected">Protected</ActiveLink>
    //             )}

    //         </div>

    //         {!session.data ? (
    //             <Link
    //                 className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
    //                 href="/login"
    //             >
    //                 === Log In ===
    //             </Link>
    //         ) : (
    //             <button
    //                 type="button"
    //                 onClick={() => signOut({ callbackUrl: '/' })}
    //                 className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
    //             >
    //                 Logout
    //             </button>
    //         )}

    //     </div>
    // );
};

export default Navbar;
