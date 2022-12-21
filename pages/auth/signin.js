import { useState } from "react";
import { signIn } from "next-auth/react";


const SignIn = (props) => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        // validate your userinfo
        e.preventDefault();

        const res = await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });

        console.log(res);
    };
    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-red-100 p-4 w-full max-w-xs">
                <h1 className="text-5xl mb-4">Login</h1>


                <div className="flex flex-col mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={userInfo.email}
                        onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value }) }
                        type="email"
                        placeholder="john@email.com"
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={userInfo.password}
                        onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value }) }
                        type="password"
                        placeholder="********"
                    />
                </div>

                <button type="submit" className="bg-purple-300 hover:bg-purple-200 px-5 py-2 rounded-md">
                    Login
                </button>

            </form>
        </div>
    );
};

export default SignIn;