import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword, validatePassword } from '@/utils/password'
import users from '@/data/users/index.json' assert { type: 'json' }
import type { NextAuthConfig } from 'next-auth'

export const config = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        //user = await getUserFromDb(credentials.email, pwHash)
        if (credentials) {
          const userArray = users.filter((user) => user.username == credentials.username)
          //console.log(userArray)
          if (userArray.length > 0) {
            const checkPassword = await validatePassword(
              credentials.password,
              userArray[0].password
            )
            if (checkPassword) {
              return userArray[0]
            }
          }
        }

        //if (!user) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        //throw new Error("User not found.")
        //return null
        //}

        // return user object with the their profile data
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/signin', // 指向你的自定义登录页面路径
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middleware-example') return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === 'update') token.name = session.user.name
      if (account?.provider === 'keycloak') {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken
      //console.log('auth Test',session)
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

/*declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}*/
