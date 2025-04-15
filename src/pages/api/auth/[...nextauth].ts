import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Aquí iría la lógica de autenticación
        return { id: '1', name: 'Usuario de prueba', email: 'test@example.com' };
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        // Aquí se podrían añadir más datos como roles, tenant, etc.
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.userId;
        // Aquí se podrían añadir más datos como roles, tenant, etc.
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    // Otras páginas personalizadas...
  },
  secret: process.env.NEXTAUTH_SECRET,
});
