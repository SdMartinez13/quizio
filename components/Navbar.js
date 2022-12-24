import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ActiveLink from './ActiveLink';
import { useRouter } from 'next/router'

const Navbar = () => {
    const session = useSession();
    const router = useRouter();

    // dont show router on login page
    if (router.pathname === '/login') return null;
    if (router.pathname === '/dashboard') return null;


    return (
        <div className="flex flex-wrap space-x-10 items-center justify-between my-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-200 shadow-lg">

            <div className="flex gap-x-4">

                <ActiveLink href="/">Home</ActiveLink>
                <ActiveLink href="/dashboard">My Dashboard</ActiveLink>

                <ActiveLink href="/about">About</ActiveLink>

                {!!session.data && (

                    <ActiveLink href="/protected">Protected</ActiveLink>
                )}

            </div>

            {!session.data ? (
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
            )}

        </div>
    );
};

export default Navbar;
