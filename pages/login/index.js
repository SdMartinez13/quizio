import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import axios from 'axios';


// https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI
// https://css.gg/


const FORMS = {
    LOGIN: 'login',
    CREATE: 'create',
    FORGOT: 'forgot',
};


const SignIn = () => {
    const [activeForm, setActiveForm] = useState(FORMS.LOGIN);

    return (
        <div className="bg-white h-screen lg:flex items-cnter">

            <div className="w-full hidden lg:flex justify-center items-center bg-gray-100 h-full">
                <div className="p-6 flex justify-center">
                    <div className="h-40 w-40 rounded-full bg-purple-800" />
                </div>
            </div>

            <div className="w-full">
                <div className="p-6 flex justify-center lg:hidden">
                    <div className="h-10 w-10 rounded-full bg-purple-800" />
                </div>

                {/* <div className="px-4 pt-8 max-w-md m-auto">
                    <div className="bg-yellow-100 border border-yellow-300 p-4 rounded text-sm text-center">
                        The requested action requires you to be logged in
                    </div>
                </div> */}

                <div className="relative lg:pt-16">

                    <div className={classNames('py-6 absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.LOGIN })}>
                        <h2 className="text-3xl text-center">Login</h2>

                        <Form setActiveForm={setActiveForm} />
                    </div>

                    <div className={classNames('py-6 absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.CREATE })}>
                        <h2 className="text-3xl text-center">Create Account</h2>

                        <FormCreateAccount setActiveForm={setActiveForm} />
                    </div>
                </div>

                {/* <div className="relative lg:pt-16">

                    <div className={classNames('bg-red-100 py-6 absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.LOGIN })}>
                        <h2 className="text-3xl text-center">Login</h2>

                        <Form setActiveForm={setActiveForm} />
                    </div>

                    <div className={classNames('bg-blue-100 py-6 absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.CREATE })}>
                        <h2 className="text-3xl text-center">Create Account</h2>

                        <FormCreateAccount setActiveForm={setActiveForm} />
                    </div>
                </div> */}


            </div>
        </div>
    );
};

export default SignIn;


const Form = ({ setActiveForm }) => {
    const [userInfo, setUserInfo] = useState({ email: 'JD@gmail.com', password: 'abc123' });
    const router = useRouter();

    const hasErrors = false;
    const hasErrors2 = true;

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
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-8 max-w-md m-auto">
            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-first-name">
                    Email
                </label>
                <input
                    // className="                           appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white "
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': hasErrors,
                        'focus:border-gray-300': !hasErrors,
                    })}
                    id="grid-first-name"
                    type="email"
                    value={userInfo.email}
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                />

                {hasErrors && (
                    <p className="text-red-500 text-xs">Please fill out this field.</p>
                )}

            </div>

            {/* <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-email">
                    Email Error
                </label>
                <input
                    className={classNames('appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': hasErrors2,
                        'focus:ring focus:ring-gray-200': !hasErrors2,
                    })}
                    id="grid-email"
                    type="email"
                />

                {hasErrors2 && (
                    <p className="text-red-500 text-xs">Please fill out this field.</p>
                )}

            </div> */}

            <div className="w-full mb-6">
                <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="grid-password">
                    Password
                </label>
                <input
                    value={userInfo.password}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
                    id="grid-password"
                    type="password"
                // placeholder="******************"
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
                className="h-11 mb-4 bg-purple-600 text-gray-100 w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="submit"
            >
                Sign In
            </button>

            <button
                className="h-11 mb-4 border-gray-200 border-2 bg-white flex items-center justify-center w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="button"
            >
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor" /></svg>
                Sign in with Google
            </button>

            <button
                className="h-11 mb-4 border-gray-200 border-2 bg-white flex items-center justify-center w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="button"
            >
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor" /></svg>
                Sign in with Facebook
            </button>

            {/* <div className="flex justify-between items-center"> */}

            {/* <button type="button" className="text-gray-700 text-sm" onClick={router.back}>Cancel</button> */}

            <p className="text-center text-gray-700 text-sm">
                Dont have an account?&nbsp;

                <button className="text-purple-600 font-bold" type="button" onClick={() => setActiveForm(FORMS.CREATE)}>Sign Up</button>
            </p>
            {/* </div> */}


        </form>
    );
};


const FormCreateAccount = ({ setActiveForm }) => {
    const [userInfo, setUserInfo] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const router = useRouter();

    const hasErrors = false;

    const handleSubmit = async (e) => {
        // validate your userinfo
        e.preventDefault();
        console.log('subbmitting');

        const res = await axios.post('/api/user/create', userInfo);

        console.log(res, 'resssss');

        if (res.data.errors) {
            alert(JSON.stringify(res.data.errors));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-8 max-w-md m-auto">
            <div className="flex space-x-6">
                <div className="w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                    </label>
                    <input
                        className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                            'border-red-500': hasErrors,
                            'focus:border-gray-300': !hasErrors,
                        })}
                        id="grid-first-name"
                        type="text"
                        value={userInfo.first_name}
                        onChange={({ target }) => setUserInfo({ ...userInfo, first_name: target.value })}
                    />

                    {hasErrors && (
                        <p className="text-red-500 text-xs">Please fill out this field.</p>
                    )}
                </div>

                <div className="w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input
                        className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                            'border-red-500': hasErrors,
                            'focus:border-gray-300': !hasErrors,
                        })}
                        id="grid-last-name"
                        type="text"
                        value={userInfo.last_name}
                        onChange={({ target }) => setUserInfo({ ...userInfo, last_name: target.value })}
                    />

                    {hasErrors && (
                        <p className="text-red-500 text-xs">Please fill out this field.</p>
                    )}
                </div>
            </div>


            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-email">
                    Email
                </label>
                <input
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': hasErrors,
                        'focus:border-gray-300': !hasErrors,
                    })}
                    id="grid-email"
                    type="email"
                    value={userInfo.email}
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                />

                {hasErrors && (
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
                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
                    id="grid-password"
                    type="password"
                />
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>

            <button
                className="h-11 mb-4 bg-purple-600 text-gray-100 w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="submit"
            >
                Create Account
            </button>

            <p className="text-center text-gray-700 text-sm">
                Already have an account?&nbsp;

                <button className="text-purple-600 font-bold" type="button" onClick={() => setActiveForm(FORMS.LOGIN)}>Log In</button>
            </p>

        </form>
    );
};
