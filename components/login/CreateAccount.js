import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FORMS } from '../../utils/constants';


const CreateAccount = ({ setActiveForm, setShowCreationBanner }) => {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

    const onSubmit = async data => {
        const res = await axios.post('/api/user/create', data);

        if (res.data.errors) {
            Object.keys(res.data.errors).forEach(item => {
                setError(item, { type: 'server', message: res.data.errors[item] });
            });

            return false;
        }

        setShowCreationBanner(true);
        setActiveForm(FORMS.LOGIN);
        return reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8 max-w-md m-auto">
            <h2 className="text-3xl text-center pb-8">Create Account</h2>

            <div className="flex space-x-6">
                <div className="w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="create-first-name">
                        First Name
                    </label>
                    <input
                        className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                            'border-red-500': !!errors.first_name,
                            'focus:border-gray-300': !errors.first_name,
                        })}
                        id="create-first-name"
                        type="text"
                        {...register('first_name', { required: 'First name field is required' })}
                    />

                    {errors.first_name?.message && (
                        <p className="text-red-500 text-xs">{errors.first_name.message}</p>
                    )}
                </div>

                <div className="w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="create-last-name">
                        Last Name <span className="text-xs font-normal">(optional)</span>
                    </label>
                    <input
                        className="appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
                        id="create-last-name"
                        type="text"
                        {...register('last_name')}
                    />
                    {errors.last_name?.message && (
                        <p className="text-red-500 text-xs">{errors.last_name.message}</p>
                    )}
                </div>
            </div>


            <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="create-email">
                    Email
                </label>
                <input
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': !!errors.email,
                        'focus:border-gray-300': !errors.email,
                    })}
                    id="create-email"
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
                <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="create-password">
                    Password
                </label>
                <input
                    className={classNames('appearance-none block w-full disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white', {
                        'border-red-500': !!errors.password,
                        'focus:border-gray-300': !errors.password,
                    })}
                    id="create-password"
                    type="password"
                    {...register('password', { required: 'Password field is required' })}
                />
                {errors.password?.message ? (
                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                ) : (
                    <p className="text-gray-600 text-xs">Make it as long and as crazy as you&lsquo;d like</p>
                )}
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

export default CreateAccount;

CreateAccount.propTypes = {
    setActiveForm: PropTypes.func,
    setShowCreationBanner: PropTypes.func,
};
