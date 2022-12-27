import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { FORMS } from '../../utils/constants';


const Login = ({ setActiveForm }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { email: 'JD@gmail.com', password: 'abc123' } });

    const router = useRouter();

    const onSubmit = async fields => {
        const res = await signIn('credentials', {
            email: fields.email,
            password: fields.password,
            redirect: false,
        });

        if (res.error) {
            const errs = JSON.parse(res.error);
            Object.keys(errs).forEach(item => {
                setError(item, { type: 'server', message: errs[item] });
            });

            return false;
        }

        return router.push(res.url || '/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8 max-w-md m-auto">
            <h2 className="text-3xl text-center pb-8">Login</h2>

            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-first-name">
                    Email
                </label>
                <input
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': !!errors.email,
                        'focus:border-gray-300': !errors.email,
                    })}
                    id="login-first-name"
                    type="text"
                    {...register('email', {
                        required: 'Email field is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Enter a valid email',
                        },
                    })}
                />

                {errors.email?.message && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
            </div>

            <div className="w-full mb-6">
                <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                    Password
                </label>
                <input
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': !!errors.password,
                        'focus:border-gray-300': !errors.password,
                    })}
                    id="login-password"
                    type="password"
                    {...register('password', { required: 'Password field is required' })}
                />

                {errors.password?.message && (
                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
            </div>

            <div className="flex justify-end mb-6">
                {/* <div className="flex items-center">
                    <input className="" id="grid-checkbox" type="checkbox" placeholder="******************" />
                    <label className="ml-2  text-gray-700 text-sm font-bold" htmlFor="grid-checkbox">
                        Remember Me
                    </label>
                </div> */}

                {/* <button type="button" className="text-purple-600 text-sm font-bold">Forgot Password?</button> */}
            </div>

            <button
                className="h-11 mb-4 bg-purple-600 text-gray-100 w-full py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                type="submit"
            >
                Sign In
            </button>

            {/* <button
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
            </button> */}

            <p className="text-center text-gray-700 text-sm">
                Dont have an account?&nbsp;
                <button className="text-purple-600 font-bold" type="button" onClick={() => setActiveForm(FORMS.CREATE)}>Sign Up</button>
            </p>

        </form>
    );
};

export default Login;

Login.propTypes = {
    setActiveForm: PropTypes.func,
};
