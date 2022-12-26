import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import ActiveLink from './ActiveLink';

const Navbar = () => {
    const session = useSession();
    // console.log(session, 'ssessions')
    const router = useRouter();

    // console.log(router, 'router')

    // dont show router on login page
    if (router.pathname === '/login') return null;
    // if (router.pathname === '/dashboard') return null;

    return (
        <div className="bg-white border-gray-200 shadow-lg">
            {/* <div className="flex flex-wrap space-x-10 items-center justify-between my-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-200 shadow-lg"> */}
            <div className="w-full p-4">

                <div className="max-w-screen-xl m-auto flex gap-4 justify-between">


                    <div className="flex gap-x-4">

                        <ActiveLink href="/">Home</ActiveLink>

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
                                className={classNames({ 'font-bold': router.asPath === '/my/quizzes' })}
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

                        <p>Create Quiz</p>
                    </div>

                </div>
            )}
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
