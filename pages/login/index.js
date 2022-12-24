import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';


// https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI
// https://css.gg/


const SignIn = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({ email: 'Beatrice.Jones@yahoo.com', password: '1234' });

    // const [userInfo, setUserInfo] = useState({ email: 'john@gmail.com', password: '1234' });
    const handleSubmit = async (e) => {
        // validate your userinfo
        e.preventDefault();

        console.log(router, 'ROUTERRRR');

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });

        console.log(res, 'res');
        if (!res.error) {
            // return router.push(router.query?.redirect || '/');
            return router.push(res.url || '/');
        }

        return false;

        // handle error cases
    };


    return (
        <div className="bg-white h-screen lg:flex items-center">

            <div className="w-full hidden lg:flex justify-center items-center bg-gray-100 h-full">
                <div className="p-6 flex justify-center">
                    <div className="h-40 w-40 rounded-full bg-purple-800" />
                </div>
            </div>

            <div className="w-full">
                <div className="p-6 flex justify-center lg:hidden">
                    <div className="h-10 w-10 rounded-full bg-purple-800" />
                </div>

                <div className="px-4 py-8 max-w-md m-auto">
                    <div className="bg-yellow-100 border border-yellow-200 p-4 rounded">
                        The requested action requires you to be logged in
                    </div>
                </div>

                <h2 className="text-3xl text-center">Login</h2>

                <Form userInfo={userInfo} setUserInfo={setUserInfo} handleSubmit={handleSubmit} />
            </div>
        </div>
    );


    // return (
    //     <div className="flex items-center justify-center">
    //         <form onSubmit={handleSubmit} className="bg-red-100 p-4 w-full max-w-xs">
    //             <h1 className="text-5xl mb-4">Login</h1>


    //             <div className="flex flex-col mb-2">
    //                 <label htmlFor="email">Email</label>
    //                 <input
    //                     name="email"
    //                     value={userInfo.email}
    //                     onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
    //                     type="email"
    //                     placeholder="john@email.com"
    //                 />
    //             </div>
    //             <div className="flex flex-col mb-2">
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                     name="password"
    //                     value={userInfo.password}
    //                     onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
    //                     type="password"
    //                     placeholder="********"
    //                 />
    //             </div>

    //             <button type="submit" className="bg-purple-300 hover:bg-purple-200 px-5 py-2 rounded-md">
    //                 Login
    //             </button>

    //         </form>
    //     </div>
    // );
};

export default SignIn;


const Form = ({ userInfo, setUserInfo, handleSubmit }) => {
    const hasErrors = false;
    const hasErrors2 = true;

    return (
        <form
            // className="bg-blue-100 p-4"
            className="px-4 py-8 max-w-md m-auto"
            // onSubmit={e => console.log(e)}
            onSubmit={handleSubmit}
        >
            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-first-name">
                    Email
                </label>
                <input
                    className={classNames('appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': hasErrors,
                        'focus:ring focus:ring-gray-200': !hasErrors,
                    })}
                    id="grid-first-name"
                    type="email"
                    placeholder="email@example.com"
                    value={userInfo.email}
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}

                />

                {hasErrors && (
                    <p className="text-red-500 text-xs">Please fill out this field.</p>
                )}

            </div>

            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-first-name">
                    Email Error
                </label>
                <input
                    className={classNames('appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': hasErrors2,
                        'focus:ring focus:ring-gray-200': !hasErrors2,
                    })}
                    id="grid-first-name"
                    type="email"
                    placeholder="email@example.com"
                />

                {hasErrors2 && (
                    <p className="text-red-500 text-xs">Please fill out this field.</p>
                )}

            </div>

            <div className="w-full mb-6">
                <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="grid-password">
                    Password
                </label>
                <input
                    value={userInfo.password}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                />
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>

            <div className="flex justify-between mb-6">
                <div className="flex items-center">
                    <input className="" id="grid-checkbox" type="checkbox" placeholder="******************" />
                    <label className="ml-2  text-gray-700 text-sm font-bold" htmlFor="grid-checkbox">
                        Remember Me
                    </label>
                </div>

                <button type="button" className="  text-gray-700 text-sm font-bold">Forgot Password</button>
            </div>

            <button
                className="mb-4 bg-purple-600 text-gray-100 w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="submit"
            >
                Sign In
            </button>

            <button
                className="mb-4 border-gray-200 border-2 bg-white flex items-center justify-center w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="button"
            >
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor" /></svg>
                Sign in with Google
            </button>

            <button
                className="mb-4 border-gray-200 border-2 bg-white flex items-center justify-center w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="button"
            >
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor" /></svg>
                Sign in with Facebook
            </button>

            <div className="flex justify-between items-center">

                <button type="button" className="text-gray-700 text-sm">Cancel</button>

                <p className="text-center text-gray-700 text-sm">
                    Dont have an account?&nbsp;

                    <button className="text-purple-600 font-bold" type="button">Sign Up</button>
                </p>
            </div>


        </form>
    );
};