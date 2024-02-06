// import axios from 'axios';
// import type { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// type Auth = {
//   email: string;
//   password: string;
// };

// async function refreshAccessToken(token) {
//   try {
//     const url =
//       'https://oauth2.googleapis.com/token?' +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: 'refresh_token',
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       method: 'POST',
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }

// const providers = [
//   CredentialsProvider<Auth>({
//     name: 'credentials',
//     async authorize(credentials) {
//       // console.log('============');
//       const user = await axios.post(process.env.PUBLIC_API_URL + 'auth/login', {
//         email: credentials.email,
//         password: credentials.password,
//       });
//       // console.log('============', user.data);

//       if (user) {
//         return Promise.resolve(user);
//       }

//       return Promise.resolve(null);
//     },
//   }),
// ];

// const callbacks = {
//   jwt: async ({ token, user }) => {
//     if (user && user.success) {
//       return Promise.resolve({
//         ...token,
//         accessToken: user.accessToken,
//         refreshToken: user.refreshToken,
//         id: user.id,
//         userDiv: userDiv,
//       });
//     }

//     if (user && user.statusCode == 403) {
//       return refreshAccessToken(token);
//     }

//     return user;
//   },

//   session: async ({ session, token }) => {
//     session.accessToken = token.accessToken;

//     return Promise.resolve(session);
//   },
// };

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: '/login',
//   },
//   providers,
//   callbacks,
//   secret: process.env.NEXT_AUTH_SECRET || 'your_secret',
// };
