import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Login from '../../components/login/Login';
import CreateAccount from '../../components/login/CreateAccount';
import { FORMS } from '../../utils/constants';

// https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI
// https://css.gg/


const SignIn = () => {
    const [activeForm, setActiveForm] = useState(FORMS.LOGIN);
    const [showCreationBanner, setShowCreationBanner] = useState(false);
    const router = useRouter();

    return (
        <div className="bg-white h-screen lg:flex items-cnter">

            <div className="w-full hidden h-screen lg:flex justify-center items-center bg-gray-100 h-full">
                <div className="p-6 flex justify-center">
                    <div className="h-40 w-40 rounded-full bg-purple-800" />
                </div>
            </div>

            <div className="w-full h-screen overflow-scroll">
                <div className="p-6 flex justify-center lg:hidden">
                    <div className="h-10 w-10 rounded-full bg-purple-800" />
                </div>

                {router.query.callbackUrl && (
                    <div className="px-4 -mb-6 pt-8 max-w-md m-auto">
                        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded text-sm text-center">
                            The requested action requires you to be logged in
                        </div>
                    </div>
                )}

                {showCreationBanner && (
                    <div className="px-4 -mb-6 pt-8 max-w-md m-auto">
                        <div className="bg-green-100 border border-green-300 p-4 rounded text-sm text-center">
                            Account successfully created <br /> Please sign in
                        </div>
                    </div>
                )}


                <div className="relative lg:pt-16">
                    <div className={classNames('absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.LOGIN })}>
                        <Login setActiveForm={setActiveForm} />
                    </div>

                    <div className={classNames('absolute w-full transition-all duration-300', { 'invisible opacity-0': activeForm !== FORMS.CREATE })}>
                        <CreateAccount setActiveForm={setActiveForm} setShowCreationBanner={setShowCreationBanner} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
