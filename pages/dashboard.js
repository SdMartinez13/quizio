import { signOut } from 'next-auth/react';

const Dashboard = () => {
    const b = '';
    return (
        // <div className="flex relative bg-grey-50 overflow-hidden max-h-screen">
        <div className="flex relative h-screen bg-grey-50">
            <aside className="w-64" aria-label="Sidebar">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex-grow h-full flex flex-col">
                        <div className="py-6 text-center border-r-2 bg-red-100">
                            <h1 className="text-xl font-bold leading-none"><span className="text-purple-500">Quizio</span> Dashboard</h1>
                        </div>
                        <div className="flex flex-col justify-between border-r-2 bg-red-100 h-full p-4">
                            <ul className="space-y-3">
                                <li><a href="/createQuiz" className="flex items-center bg-purple-100 rounded-xl font-bold text-sm text-black py-3 px-4">Create Quiz</a></li>
                                <li><a href="/categories" className="flex items-center bg-purple-100 rounded-xl font-bold text-sm text-black py-3 px-4">Categories</a></li>
                            </ul>
                            <button
                                type="button"
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="px-3 py-2  border-2 rounded-md text-sm font-medium text-black hover:bg-blue-200"
                            >
                                Logout
                            </button>
                        </div>

                    </div>

                </div>
            </aside>

            <main className="ml-20 overflow">
                <div className="py-2">
                    <div className="max-w-4xl mx-auto" />


                </div>


                <div className="grid grid-cols-2 gap-x-20">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Stats</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <div className="p-4 bg-green-100 rounded-xl">
                                    <div className="font-bold text-xl text-gray-800 leading-none">Created Quizzes
                                        <ul className="space-y-3 p-4">
                                            <li><a href="{}" className="flex items-center bg-white rounded-xl font-bold text-sm text-black py-3 px-4">Javascript 1</a></li>
                                            <li><a href="{}" className="flex items-center bg-white rounded-xl font-bold text-sm text-black py-3 px-4">CSS 1</a></li>
                                        </ul>
                                    </div>
                                    <div className="mt-5">
                                        <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                                            See all
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                                <div className="font-bold text-2xl leading-none">4</div>
                                <div className="mt-2">Quizzes Taken</div>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                                <div className="font-bold text-2xl leading-none">5</div>
                                <div className="mt-2">Quizzes taken</div>
                            </div>
                            <div className="col-span-2">
                                <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                                    <div className="font-bold text-xl leading-none">Quizzes completed by peers</div>
                                    <div className="mt-2">5 of 8 completed</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>

    );
};

export default Dashboard;
