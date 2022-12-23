import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import axios from 'axios';
import prisma from '../../../lib/prisma';


const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;


                console.log({ email, password }, 'hi');


                const { data: myUser } = await axios.post(`${process.env.NEXTAUTH_URL}/api/user/check-credentials`, { email, password });

                console.log(myUser, 'MY USER')

                if (!myUser) {
                    throw new Error('invalid credentials');
                }

                return myUser;

                // if (email !== 'john@gmail.com' || password !== '1234') {
                //     throw new Error('invalid credentials (#2)');
                // }

                // if everything is fine
                // return {
                //     id: '1234',
                //     name: 'John Doe',
                //     email: 'john@gmail.com',
                //     role: 'admin',
                // };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt(params) {
            console.log(params, 'JWT params');
            // update token
            if (params.user?.role) {
                params.token.role = params.user.role;
            }
            // PICK PROPERTIES TO ADD TO TOKEN HERE

            if (params.user) {
                // params.token.first_name = params.user.first_name;
                // params.token.user = params.user
                params.token = { ...params.token, ...params.user }
            }

            return params.token;
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            console.log({ session, token, user }, '{ session, token, user }')
            // session.accessToken = token.accessToken
            session.token = token;
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log({ url, baseUrl });
            // Allows relative callback URLs
            // if (url.startsWith("/")) return `${baseUrl}${url}`
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl) return url
            // return baseUrl;

            if (!url.startsWith('http')) return url;


            // If we have a callback use only its relative path
            const callbackUrl = new URL(url).searchParams.get('callbackUrl');
            if (!callbackUrl) return url;

            // console.log(baseUrl + callbackUrl, 'CALLBACK URL');
            // console.log(new URL(baseUrl + callbackUrl), 'new URL(baseUrl + callbackUrl)');

            // return new URL(baseUrl + callbackUrl).href;


            // return 'http://google.com';
            return baseUrl + callbackUrl;
            // return new URL(callbackUrl).pathname;
        },
    },
};

export default NextAuth(authOptions);
