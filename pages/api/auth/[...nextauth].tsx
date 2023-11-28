
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/router';


let API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log('AUTH URL', { API_URL })
                console.log('LOGIN REQ', { req })

                const res = await fetch(`https://${API_URL}/auth/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // username: req.body?.username,
                        // password: req.body?.password,
                        username: credentials?.username,
                        password: credentials?.password
                    }),
                });
                const user = await res.json();

                console.log({ user })
                if (user && user.message && user.message === 'Wrong username or password') {
                    return null;
                }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // console.log({ session, token, user })
            // session.user = token as any
            // return session

            console.log("token", token.token)
            const res = await fetch(`https://${API_URL}/auth/session`, {
                method: "GET",
                headers: {
                    'X-ACCESS-TOKEN': `${token.token}`,
                },
            });

            
            if (res.status === 200) {
                // console.log('here')
                //         // Clear localStorage
                // localStorage.clear();

                // // Clear sessionStorage
                // sessionStorage.clear();

                // // Optionally, if you want to clear cookies
                // document.cookie.split(";").forEach((c) => {
                //     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                // });
                // const router = useRouter();
                // router.push('/auth/signin');
                // return {};
            }
            const updatedUserData = await res.json();

            // console.log("UPDATED DATA", updatedUserData)
            // Update the session object with new data
            return {
                ...session,
                user: {
                    ...session.user,
                    ...updatedUserData
                },
            };
        },
    },
}

export default NextAuth(authOption)
