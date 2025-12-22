import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";

// MongoDB connection for the adapter
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
});
const clientPromise = client.connect();

// NextAuth configuration options
export const authOptions = {
  // Database adapter
  adapter: MongoDBAdapter(clientPromise),
  
  // Authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,    // 30 days
  },
  
  // Callbacks for customizing JWT and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        console.log('📝 SESSION CALLBACK - User ID added to session:', token.id);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 REDIRECT CALLBACK:', { url, baseUrl });
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  
  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // Events for logging
  events: {
    async signIn({ user, account, profile }) {
      console.log('✅ User authenticated successfully:', {
        userId: user.id,
        email: user.email,
        name: user.name,
        provider: account.provider,
        timestamp: new Date().toISOString()
      });
    }
  },
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
};
