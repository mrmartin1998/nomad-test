import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { MongoClient } from "mongodb"

// Use the same MongoDB URI as your main app
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
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
  
  // Switch to JWT sessions for better production reliability
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,    // 30 days
  },
  
  // Add JWT callback for user ID
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        console.log('📝 SESSION CALLBACK - User ID added to session:', token.id)
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Log the incoming URL to help debug redirect issues
      console.log('🔄 REDIRECT CALLBACK:', { url, baseUrl })
      
      // Extract the callbackUrl from the URL if present
      const urlObj = new URL(url.startsWith('http') ? url : `${baseUrl}${url}`)
      const callbackUrl = urlObj.searchParams.get('callbackUrl')
      
      // If we have a callbackUrl, use it
      if (callbackUrl) {
        console.log('🔄 Found callbackUrl:', callbackUrl)
        // Make sure it's from the same origin or is a relative path
        if (callbackUrl.startsWith('/')) {
          const redirectUrl = `${baseUrl}${callbackUrl}`
          console.log('🔄 Redirecting to:', redirectUrl)
          return redirectUrl
        }
        
        try {
          const callbackUrlObj = new URL(callbackUrl)
          if (callbackUrlObj.origin === baseUrl) {
            console.log('🔄 Redirecting to same-origin URL:', callbackUrl)
            return callbackUrl
          }
        } catch (error) {
          console.error('🔄 Error parsing callbackUrl:', error)
        }
      }
      
      // Default cases from original function
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`
        console.log('🔄 Redirecting to relative path:', redirectUrl)
        return redirectUrl
      }
      
      if (new URL(url).origin === baseUrl) {
        console.log('🔄 Redirecting to same-origin URL:', url)
        return url
      }
      
      console.log('🔄 Defaulting to baseUrl:', baseUrl)
      return baseUrl
    }
  },
  
  // Events for logging authentication success
  events: {
    async signIn({ user, account, profile }) {
      console.log('✅ User authenticated successfully:', {
        userId: user.id,
        email: user.email,
        name: user.name,
        provider: account.provider,
        timestamp: new Date().toISOString()
      })
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
