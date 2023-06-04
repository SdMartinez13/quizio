// import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Tab, Disclosure } from '@headlessui/react';
// import Router from 'next/router';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const Protected = () => {
    const session = useSession();
    console.log(session, ' ssession');

    // useEffect(() => {
    //     if (session.status === 'unauthenticated') Router.replace('/auth?redirect=protected');
    // }, [session.status]);


    return (
        <div className="w-full px-2 py-10 sm:px-4">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl p-1">
                    <Tab
                        key={1}
                        className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-600
                                ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2
                                selected ? bg-purple-100 shadow : text-purple-600 hover:bg-white/[0.12] hover:text-purple-600"
                    >
                        Profile
                    </Tab>
                    <Tab
                        key={2}
                        className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-600
                        ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2
                        selected ? bg-purple-100 shadow : text-purple-600 hover:bg-white/[0.12] hover:text-purple-600"
                    >
                        Edit Avatar
                    </Tab>
                    <Tab
                        key={3}
                        className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-600
                        ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2
                        selected ? bg-purple-100 shadow : text-purple-600 hover:bg-white/[0.12] hover:text-purple-600"
                    >
                        About Quizio
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel key={1}>
                        <h1 className="flex text-red-500 p-4">Change Password</h1>
                        <form className="flex flex-col required border mx-4 py-4" onSubmit={() => console.log('submitting')}>

                            <label className="ml-4" htmlFor="oldPassword">Old Password:</label>
                            <input className="border m-4 max-w-md" type="password" id="oldPassword" name="oldPassword" title="Old password" />

                            <label className="ml-4" htmlFor="newPassword">New Password:</label>
                            <input className="border m-4 max-w-md" type="password" id="newPassword" name="newPassword" title="New password" />

                            <label className="ml-4" htmlFor="token">Confirm New Password:</label>
                            <input className="border m-4 max-w-md" type="text" id="token" name="token" title="confirmPassword" />

                            <p className="flex justify-center text-center m-4 form-actions border max-w-xs rounded bg-blue-200">
                                <input type="submit" value="Change Password" title="Change password" />
                            </p>

                        </form>
                    </Tab.Panel>
                    <Tab.Panel key={2}>
                        <h1>COMING SOON!</h1>
                    </Tab.Panel>
                    <Tab.Panel key={3}>
                        <h1>hi thrice</h1>


                        <div className="w-full px-4 pt-16">
                            <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-2">
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                <span>What is your refund policy?</span>
                                                <ChevronUpIcon
                                                    className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                If you're unhappy with your purchase for any reason, email us
                                                within 90 days and we'll refund you in full, no questions asked.
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Disclosure as="div" className="mt-2">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                <span>Do you offer technical support?</span>
                                                <ChevronUpIcon
                                                    className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                Yes. <Link className=" text-blue-400 bold underline hover:bg-blue-100" href="/about">Email Us!</Link>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>


                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default Protected;
