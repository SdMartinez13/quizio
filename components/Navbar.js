import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classNames from 'classnames';
import axios from 'axios';
import { Modal } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Menu, Transition } from '@headlessui/react';
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

                            <ActiveLink href="/protected">Settings</ActiveLink>
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

                            <div className="flex top-16 w-22">
                                <Menu as="div" className="relative inline-block text-left">
                                    {/* <div className="flex"> */}
                                    <Menu.Button className="flex text-purple-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        JD@gmail.com
                                    </Menu.Button>
                                    {/* </div> */}
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            type="submit"
                                                            onClick={handler}
                                                        >
                                                            {active ? (
                                                                <CreateActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <CreateInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Create Quiz
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item
                                                    as="a"
                                                    href="/dashboard"
                                                    className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                                                >
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            type="submit"
                                                        >
                                                            {active ? (
                                                                <DashboardActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <DashboardInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Dashboard
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item
                                                    as="a"
                                                    href="/settings"
                                                >
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            type="submit"
                                                        >
                                                            {active ? (
                                                                <SettingsActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <SettingsInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Settings
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            type="submit"
                                                            onClick={() => signOut({ callbackUrl: '/' })}

                                                        >
                                                            {active ? (
                                                                <LogoutActiveIcon
                                                                    className="mr-2 h-5 w-5 text-violet-400"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <LogoutInactiveIcon
                                                                    className="mr-2 h-5 w-5 text-violet-400"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Logout
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                        )
                    )}
                </div>
            </div>

            {/* {!!session.data && (
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
            )} */}


            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={isCreateQuizModalVisible}
                onClose={closeHandler}
                css={{ borderRadius: 4 }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8">

                    <h2 className="text-2xl font-bold pb-2">Create a quiz</h2>
                    <div className="text-sm px-4 pb-4">Create a quiz to send to your friends for some friendly competition!</div>

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
};

function CreateInactiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>

    );
}

function CreateActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>

    );
}

function DashboardInactiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
            />
        </svg>

    );
}

function DashboardActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
            />
        </svg>

    );
}


function SettingsInactiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>


    );
}

function SettingsActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>


    );
}

function LogoutInactiveIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>


    );
}

function LogoutActiveIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>


    );
}

export default Navbar;
