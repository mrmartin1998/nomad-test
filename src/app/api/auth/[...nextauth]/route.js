import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { MongoClient } from "mongodb"

// Create MongoDB client connection for NextAuth
const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

// NextAuth configuration
const handler = NextAuth({
  // Database adapter - connects NextAuth to our MongoDB
  adapter: MongoDBAdapter(clientPromise),
  
  // Authentication providers - we're only using Google for MVP
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  
  // Configure session strategy - DATABASE sessions (more secure)
  session: {
    strategy: "database",        // Store sessions in MongoDB
    maxAge: 30 * 24 * 60 * 60,   // 30 days
    updateAge: 24 * 60 * 60,     // Update session every 24 hours
  },
  
  // Events for logging authentication success
  events: {
    async signIn({ user, account, profile }) {
      console.log('🎉 SUCCESSFUL SIGN-IN DETECTED!')
      console.log('✅ User authenticated successfully:', {
        userId: user.id,
        email: user.email,
        name: user.name,
        provider: account.provider,
        timestamp: new Date().toISOString()
      })
    },
    async createUser({ user }) {
      console.log('👤 NEW USER CREATED:', {
        userId: user.id,
        email: user.email,
        name: user.name,
        timestamp: new Date().toISOString()
      })
    },
    async session({ session, token }) {
      console.log('🔐 SESSION ACCESSED:', {
        userId: session.user?.id,
        email: session.user?.email,
        timestamp: new Date().toISOString()
      })
    }
  },
  
  // Customize session and user data
  callbacks: {
    async session({ session, user }) {
      // Add user ID to session so we can use it in our forms
      if (user) {
        session.user.id = user.id
        console.log('📝 SESSION CALLBACK - User ID added to session:', user.id)
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 REDIRECT CALLBACK:', { url, baseUrl })
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
})

// Export for both GET and POST requests (NextAuth handles both)
export { handler as GET, handler as POST }
