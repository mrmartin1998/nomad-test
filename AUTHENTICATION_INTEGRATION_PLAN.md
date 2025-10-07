# Authentication Integration Plan - MVP
**Date:** September 28, 2025  
**Project:** Nomad Visa Application Platform  
**Branch:** feature/document-upload-system  

## Overview
Integrate Google Sign-In authentication to allow users to track their visa applications while keeping the form-filling experience anonymous and user-friendly.

### Authentication Technology
**NextAuth.js** = The authentication library that handles sessions, redirects, and user management  
**Google** = The sign-in provider (the "Sign in with Google" button)  

We use NextAuth.js WITH Google as the provider - NextAuth.js supports many providers (Google, Facebook, GitHub, etc.) but we're only using Google for this MVP.

---

## Current State Analysis

### What We Have Now
- **Navbar**: Contains "Iniciar sesión" link pointing to `/login` (but page doesn't exist - returns 404)
- **Forms**: 7 working visa forms (USA/ESTA, India, UK, Cuba, Thailand, Egypt, Costa Rica)
- **Database**: MongoDB with country-specific models (6 models: ESTAApplication, IndiaApplication, UKApplication, CubaApplication, ThailandApplication, EgyptApplication)
- **API Routes**: 6 working POST/GET endpoints (`/api/esta`, `/api/india`, `/api/uk`, `/api/cuba`, `/api/thailand`, `/api/egypt`)
- **Data Flow**: Forms submit anonymously → Save to DB → No user tracking
- **Existing Data**: Anonymous applications in DB (test data - can be left as-is)
- **Note**: Costa Rica form exists but missing model and API route (can be added later)

### Current Tech Stack
- **Frontend**: Next.js 14.1.0, React 18.2.0, DaisyUI + TailwindCSS
- **Backend**: Next.js API routes, MongoDB with Mongoose 8.2.0
- **Testing**: Jest with 185+ tests

---

## Requirements & Goals

### Primary Goal
Allow users to track their visa application progress and update information if needed.

### Specific Requirements
1. **Forms remain fillable anonymously** - no login required to start/fill forms
2. **Login required for submission & payment** - auth check happens at submit point
3. **Post-login experience**: Homepage with user's name displayed
4. **User dashboard**: Users can view their own applications only
5. **Data updating**: Users can update incorrect information in their applications
6. **Existing data**: Leave anonymous applications as-is (no migration needed)

### Business Goals
- Track who's submitting applications
- Allow users to check application status
- Reduce support overhead with self-service tracking

---

## MVP User Flow

### New Authentication Flow
```
1. User visits site → Fills out visa form (anonymous)
2. User clicks "Submit & Pay" → AUTH CHECK
3. If NOT logged in → Redirect to /login with Google Sign-In
4. After successful login → Return to form and complete submission
5. Application saved with user ID attached
6. User can now view/track their applications
```

### Technical Flow
```
Form Component → handleSubmit() → Check session
├── If authenticated → Submit directly to API
└── If not authenticated → Redirect to /login → Return after auth → Submit
```

---

## Implementation Plan

### Phase 1: Authentication Foundation
1. **Install Dependencies**
   ```bash
   npm install next-auth
   ```

2. **Create NextAuth.js Configuration**
   - File: `src/app/api/auth/[...nextauth]/route.js`
   - Configure Google as authentication provider
   - MongoDB adapter for user storage

3. **Create User Model**
   - File: `src/lib/models/User.js`
   - Basic fields: name, email, image, googleId, createdAt

### Phase 2: Database Integration
4. **Update Existing Models**
   - Add optional `userId` field to existing 6 models:
     - `ESTAApplication.js`
     - `IndiaApplication.js`
     - `UKApplication.js`
     - `CubaApplication.js`
     - `ThailandApplication.js`
     - `EgyptApplication.js`
   - Note: Costa Rica model/API can be completed separately

### Phase 3: Authentication Pages
5. **Create Login Page**
   - File: `src/app/login/page.jsx`
   - Google Sign-In button
   - Handle redirect after login

### Phase 4: Form Integration
6. **Update Forms with Auth Check**
   - Modify form submission handlers in 6 working forms:
     - `src/components/forms/us/Form.jsx` (ESTA)
     - `src/components/forms/india/Form.jsx`
     - `src/components/forms/uk/Form.jsx`
     - `src/components/forms/cuba/Form.jsx`
     - `src/components/forms/thailand/Form.jsx`
     - `src/components/forms/egypt/Form.jsx`
   - Note: Costa Rica form can be updated when its API is ready

### Phase 5: API Route Protection
7. **Update API Routes**
   - Add authentication middleware to POST endpoints for 6 existing APIs:
     - `src/app/api/esta/route.js`
     - `src/app/api/india/route.js`
     - `src/app/api/uk/route.js`
     - `src/app/api/cuba/route.js`
     - `src/app/api/thailand/route.js`
     - `src/app/api/egypt/route.js`

### Phase 6: User Experience
8. **Update Navbar**
   - File: `src/components/Navbar.jsx`
   - Show user info when logged in
   - Show login link when not authenticated

9. **Create User Dashboard**
   - File: `src/app/dashboard/page.jsx`
   - Display user's applications only
   - Basic editing capabilities

---

## File Changes Summary

### New Files to Create
```
src/app/api/auth/[...nextauth]/route.js    # NextAuth configuration
src/lib/models/User.js                     # User model
src/app/login/page.jsx                     # Login page
src/app/dashboard/page.jsx                 # User dashboard
```

### Files to Modify
```
package.json                               # Add next-auth dependency
src/components/Navbar.jsx                  # Add auth state display
src/lib/models/ESTAApplication.js         # Add userId field
src/lib/models/IndiaApplication.js        # Add userId field
src/lib/models/UKApplication.js           # Add userId field
src/lib/models/CubaApplication.js         # Add userId field
src/lib/models/ThailandApplication.js     # Add userId field
src/lib/models/EgyptApplication.js        # Add userId field
src/app/api/esta/route.js                 # Add auth middleware
src/app/api/india/route.js                # Add auth middleware
src/app/api/uk/route.js                   # Add auth middleware
src/app/api/cuba/route.js                 # Add auth middleware
src/app/api/thailand/route.js             # Add auth middleware
src/app/api/egypt/route.js                # Add auth middleware
src/components/forms/us/Form.jsx          # Add auth check to submit
src/components/forms/india/Form.jsx       # Add auth check to submit
src/components/forms/uk/Form.jsx          # Add auth check to submit
src/components/forms/cuba/Form.jsx        # Add auth check to submit
src/components/forms/thailand/Form.jsx    # Add auth check to submit
src/components/forms/egypt/Form.jsx       # Add auth check to submit
```

---

## Testing Strategy

### What to Test
1. **Existing functionality remains unchanged**
   - All forms still work for anonymous users
   - Database operations continue working
   - All existing tests pass

2. **New authentication flows**
   - Login/logout functionality
   - Auth redirect during form submission
   - User data association
   - Dashboard displays correct user data

### Test Approach
1. Run existing test suite to ensure no regressions
2. Add new tests for authentication components
3. Test form submission with/without authentication
4. Verify user data isolation (users only see their own data)

---

## Environment Variables Needed
```bash
# Google Provider Credentials (for NextAuth.js)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

---

## Notes & Considerations

### MVP Scope
- **Keep it simple**: NextAuth.js with Google provider only
- **No complex user roles**: All users have same permissions
- **No email verification**: Google handles verification through NextAuth.js
- **No password system**: Google Sign-In only (no email/password forms)

### Future Enhancements (Post-MVP)
- Additional NextAuth.js providers (Facebook, Apple, GitHub)
- Email/password authentication option (NextAuth.js credentials provider)
- Admin user roles and permissions
- Advanced user profile management
- Application status updates from admin panel

### Data Handling
- **Existing anonymous applications**: Leave as-is, no migration needed
- **New applications**: All associated with user accounts
- **User privacy**: Users only see their own applications

---

## Implementation Order
1. Install NextAuth.js
2. Create User model and NextAuth config
3. Create login page
4. Update one visa model (ESTA) as test case
5. Update one API route (ESTA) as test case
6. Test authentication flow end-to-end
7. Apply changes to remaining models/routes
8. Update navbar and create dashboard
9. Final testing and cleanup

---

**Status**: Planning Complete ✅  
**Next Step**: Begin Phase 1 - Authentication Foundation  
**Estimated Time**: 2-3 days for MVP implementation