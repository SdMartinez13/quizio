import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                const { email, password } = credentials;


                console.log({ email, password })

                if (email !== "john@gmail.com" || password !== "1234") {
                    throw new Error("invalid credentials");
                }

                // if everything is fine
                return {
                    id: "1234",
                    name: "John Doe",
                    email: "john@gmail.com",
                    role: "admin",
                };
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    callbacks: {
        jwt(params) {
            console.log(params,' params')
            // update token
            if (params.user?.role) {
                params.token.role = params.user.role;
            }
            // return final_token
            return params.token;
        },
        async redirect({ url, baseUrl }) {
            console.log({ url, baseUrl })
            // Allows relative callback URLs
            // if (url.startsWith("/")) return `${baseUrl}${url}`
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
}

export default NextAuth(authOptions);

