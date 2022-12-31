import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classNames from 'classnames';
import axios from 'axios';
import { Dropdown, Avatar, Text, Grid, User, Button, Modal, Menu } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { DeleteDocumentIcon } from './DeleteDocumentIcon.js';
import { AddNoteIcon } from './AddNoteIcon.js';
import { SettingsIcon } from './SettingsIcon';
import { DashboardIcon } from './DashboardIcon.js';
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
                                {/* === Log In === */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                            </Link>
                        ) : (
                            // <Dropdown>
                            //     <Dropdown.Menu aria-label="Static Actions">
                            //         <Dropdown.Button
                            //             type="button"
                            //             onClick={() => signOut({ callbackUrl: '/' })}
                            //             className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
                            //         >
                            //             Logout
                            //         </Dropdown.Button>
                            //         <Dropdown.Item key="new">New file</Dropdown.Item>
                            //         <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                            //         <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                            //         <Dropdown.Item key="delete" color="error">
                            //             Delete file
                            //         </Dropdown.Item>
                            //     </Dropdown.Menu>
                            // </Dropdown>
                            // <Dropdown>
                            //     <Dropdown.Button placement="bottom-left" flat>GO</Dropdown.Button>
                            //     <Dropdown.Menu aria-label="Static Actions">
                            //         <Dropdown.Item key="Logout" type="button" onClick={() => signOut({ callbackUrl: '/' })}>Logout</Dropdown.Item>
                            //     </Dropdown.Menu>
                            // </Dropdown>
                            <Grid.Container justify="flex-end">
                                <Grid>
                                    <Dropdown placement="bottom-left">
                                        <Dropdown.Trigger>
                                            <User
                                                bordered
                                                as="button"
                                                size="md"
                                                color="primary"
                                                name="John Doe"
                                                // description="@Johndoe"
                                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                text="John"
                                            />
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu color="primary" aria-label="User Actions">
                                            <Dropdown.Item
                                                key="profile"
                                                css={{ height: '$18' }}
                                            >
                                                <Text
                                                    css={{ d: 'flex' }}
                                                >
                                                    Signed in as
                                                </Text>
                                                <Text
                                                    b
                                                    color="inherit"
                                                    css={{ d: 'flex' }}
                                                >
                                                    JD@gmail.com
                                                </Text>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                key="analytics"
                                                icon={<DashboardIcon size={22} fill="var(--nextui-colors-neutral)" />}
                                                withDivider
                                            >
                                                <ActiveLink href="/dashboard">Dashboard</ActiveLink>

                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                key="newQuiz"
                                                icon={<AddNoteIcon size={22} fill="var(--nextui-colors-neutral)" />}
                                            >
                                                Create New Quiz
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                key="settings"
                                                icon={<SettingsIcon size={22} fill="var(--nextui-colors-success)" />}
                                                withDivider
                                            >
                                                Settings
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                key="logout"
                                                color="error"
                                                icon={<DeleteDocumentIcon size={22} fill="currentColor" />}
                                                withDivider
                                            >
                                                <button
                                                    type="submit"
                                                    onClick={() => signOut({ callbackUrl: '/' })}
                                                    className="flex-start text-black"

                                                >
                                                    Logout
                                                </button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>
                            </Grid.Container>
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
