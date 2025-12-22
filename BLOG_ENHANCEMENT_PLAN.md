# Blog System Enhancement Plan

## Current state (from the codebase)
- Models: src/lib/models/Post.js, src/lib/models/Category.js (Mongoose + MongoDB)
- API routes: /api/blog/posts (exists), /api/blog/categories (complete), sitemap generator
- Pages: /blog, /blog/[slug]
- Components: src/components/blog/BlogContent.jsx, PostCard.jsx, Blog layout and post page implementation
- Admin system: Complete admin interface with protected routes (Phase 1-4 complete)
- SEO: OpenGraph, JSON-LD and sitemap support in post page
- Auth: NextAuth.js integration present (JWT sessions)
- UI: TailwindCSS + DaisyUI style system, responsive layouts
- Deployment target: Vercel (serverless)

## ✅ COMPLETED PHASES

### Phase 1 — Admin foundation ✅ COMPLETE
- ✅ Created admin app pages under `src/app/admin`:
  - layout.jsx (auth protected), page.jsx (dashboard), posts/page.jsx, posts/new/page.jsx, posts/[slug]/edit/page.jsx, categories/page.jsx
- ✅ Small Navbar modification: added Admin link inside authenticated user menu
- ✅ Created AdminSidebar component for navigation
- ✅ Created Category API route at src/app/api/blog/categories/route.js

### Phase 2 — Rich text editor ✅ COMPLETE
- ✅ Installed: `npm install react-quill`
- ✅ Implemented `src/components/admin/RichTextEditor.jsx` (dynamic import, ssr: false)
- ✅ Updated existing `src/components/admin/posts/PostForm.jsx` to use RichTextEditor and category select
- ✅ Wired create flow with proper API integration

### Phase 3 — Image upload & media library ✅ COMPLETE
- ✅ Installed: `npm install @vercel/blob`
- ✅ Added API route `src/app/api/admin/upload/route.js` that uploads files to Vercel Blob
- ✅ Created `ImageUploader.jsx` (client component) which POSTs FormData to `/api/admin/upload`
- ✅ Created `MediaLibrary.jsx` for reusing uploaded images in the PostForm
- ✅ Modified Post model to include `featuredImage: String` (store blob URL)
- ✅ Added BLOB_READ_WRITE_TOKEN environment variable

### Phase 4 — Admin polish & features ✅ COMPLETE
- ✅ Added AdminStats component with dashboard statistics and recent activity
- ✅ Added PostsList component with comprehensive post management
- ✅ Added RecentPosts component for dashboard overview
- ✅ Created categories management page with full CRUD operations
- ✅ Implemented draft preview functionality in PostForm with modal preview
- ✅ Enhanced admin dashboard with professional UX and quick actions

---

## 🧪 Phase 5 — Comprehensive Testing (CURRENT PHASE)

### Testing Philosophy
- **Small, focused tests** instead of large integration tests
- **One component per test file** with clear test boundaries  
- **Test user behavior** not implementation details
- **Progressive complexity** - start simple, add complexity gradually

### Part A: Component Unit Tests (Day 1-2)
Focus on individual component rendering and basic interactions

#### 1. AdminStats Component Tests ⏳
**File**: `src/components/admin/__tests__/AdminStats.test.jsx`
```javascript
// Test scenarios:
- Renders loading skeleton correctly
- Displays stats cards with correct data
- Shows recent activity list
- Handles empty state gracefully
- Updates when data changes
```

#### 2. PostsList Component Tests ⏳  
**File**: `src/components/admin/__tests__/PostsList.test.jsx`
```javascript
// Test scenarios:
- Renders post list correctly
- Shows proper status badges (published/draft)
- Handles edit/delete actions
- Displays "no posts" state
- Limits posts when limit prop provided
```

#### 3. RichTextEditor Component Tests ⏳
**File**: `src/components/admin/__tests__/RichTextEditor.test.jsx`
```javascript
// Test scenarios:
- Loads dynamically without SSR errors
- Accepts initial value prop
- Calls onChange when content changes
- Shows loading skeleton during load
- Handles toolbar interactions
```

#### 4. MediaLibrary Component Tests ⏳
**File**: `src/components/admin/__tests__/MediaLibrary.test.jsx`
```javascript
// Test scenarios:
- Switches between grid and upload views
- Displays images in grid layout
- Handles image selection
- Shows empty state correctly
- Calls onSelect callback with correct data
```

#### 5. ImageUploader Component Tests ⏳
**File**: `src/components/admin/__tests__/ImageUploader.test.jsx`
```javascript
// Test scenarios:
- Renders drag-drop area
- Shows upload progress state
- Validates file types
- Handles drag and drop events
- Calls onUpload callback on success
```

### Part B: Page Integration Tests (Day 3)
Test complete page functionality and user flows

#### 6. Admin Dashboard Page Tests ⏳
**File**: `src/app/admin/__tests__/AdminDashboard.test.jsx`
```javascript
// Test scenarios:
- Renders all dashboard sections
- Shows user welcome message
- Displays quick action cards
- Loads stats components
- Navigation links work correctly
```

#### 7. Posts Management Page Tests ⏳
**File**: `src/app/admin/posts/__tests__/PostsPage.test.jsx`
```javascript
// Test scenarios:
- Lists posts correctly
- Create new post button works
- Edit/delete actions function
- Search and filtering work
- Pagination displays properly
```

#### 8. Categories Management Page Tests ⏳
**File**: `src/app/admin/categories/__tests__/CategoriesPage.test.jsx`
```javascript
// Test scenarios:
- Shows category list
- Create form toggles correctly
- Form validation works
- Category creation succeeds
- Empty state displays properly
```

### Part C: Form Integration Tests (Day 4)
Focus on the complex PostForm with all its features

#### 9. PostForm Component Tests (Main Focus) ⏳
**File**: `src/components/admin/posts/__tests__/PostForm.test.jsx`
```javascript
// Test scenarios:
- Renders all form fields correctly
- Validates required fields
- Generates slug from title
- Rich text editor integration works
- Media library modal opens/closes
- Preview modal functions correctly
- Form submission with valid data
- Error handling for invalid data
- Loading states during submission
- Edit mode vs create mode
```

### Part D: API Route Tests (Day 5)
Test backend functionality with mocked database

#### 10. Blog API Routes Tests ⏳
**File**: `src/app/api/blog/__tests__/api.test.js`
```javascript
// Test scenarios:
- Categories GET/POST routes
- Posts GET/PUT/DELETE routes
- Authentication middleware works
- Error handling for invalid data
- Database connection handling
```

#### 11. Admin API Routes Tests ⏳
**File**: `src/app/api/admin/__tests__/admin-api.test.js`
```javascript
// Test scenarios:
- Upload route with auth protection
- Media listing route
- File validation works
- Error responses correct
- Unauthorized access blocked
```

## Implementation Approach

### Day 1: Simple Component Tests ⏳
**Focus**: Basic rendering and props
```bash
# Start with simplest components
npm test AdminStats.test.jsx
npm test PostsList.test.jsx
```

### Day 2: Interactive Component Tests ⏳  
**Focus**: User interactions and state changes
```bash
npm test RichTextEditor.test.jsx
npm test MediaLibrary.test.jsx
npm test ImageUploader.test.jsx
```

### Day 3: Page Integration Tests ⏳
**Focus**: Complete user flows
```bash
npm test AdminDashboard.test.jsx
npm test PostsPage.test.jsx
npm test CategoriesPage.test.jsx
```

### Day 4: Complex Form Tests ⏳
**Focus**: PostForm with all features
```bash
npm test PostForm.test.jsx
# This will be the most comprehensive test
```

### Day 5: API and Backend Tests ⏳
**Focus**: Server-side functionality
```bash
npm test api.test.js
npm test admin-api.test.js
```

## Testing Tools Setup

### Dependencies Already Available ✅
```json
{
  "@testing-library/react": "^14.2.1",
  "@testing-library/jest-dom": "^6.4.2", 
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0"
}
```

### Additional Testing Utilities Needed ⏳
```bash
# For mocking file uploads
npm install --save-dev @testing-library/user-event

# For API route testing  
npm install --save-dev node-mocks-http
```

### Mock Strategy ⏳
```javascript
// Mock NextAuth for admin tests
jest.mock('next-auth/react');

// Mock file upload for ImageUploader tests  
global.FormData = jest.fn();

// Mock Vercel Blob for upload tests
jest.mock('@vercel/blob');

// Mock database for API tests
jest.mock('@/lib/mongodb');
```

## Success Criteria

### Coverage Goals
- **Component Tests**: 90%+ coverage on new admin components
- **Integration Tests**: All critical user flows tested
- **API Tests**: All endpoints tested with auth/validation
- **Error Handling**: All error states covered

### Quality Standards
- Tests are **readable** and **maintainable**
- No **flaky tests** that pass/fail randomly
- **Fast execution** - full test suite under 30 seconds
- **Clear error messages** when tests fail

## Learning Objectives

By the end of Phase 5, you should be comfortable with:
1. **Component testing patterns** for React components
2. **Mocking strategies** for external dependencies
3. **User-centric testing** approach with Testing Library
4. **API testing** with Next.js routes
5. **Test organization** and file structure
6. **Debugging failing tests** effectively

---

## High-level strategy
Enhance the existing in-repo blog rather than adopt an external CMS. Build a lightweight admin CMS that:
- Reuses your DB, auth and API patterns
- Is Vercel-compatible (no server fs writes)
- Uses a light JS WYSIWYG (React‑Quill)
- Is team-only (internal editors: you + partner)

Benefits: minimal risk, faster delivery, maintainable, no TypeScript enforcement.

---

## Final decisions (important)
- Rich text editor: React‑Quill (lighter, no TypeScript overhead)
- Image storage: Vercel Blob Storage via @vercel/blob (serverless-friendly)
- Admin protection: NextAuth + getServerSession for API protection and client useSession for page access
- Category CRUD and simple media library to manage assets
- Get BLOB_READ_WRITE_TOKEN from: Vercel Dashboard → Project → Storage → Blob → Create Store

---

## Success criteria (MVP) ✅ ACHIEVED
- ✅ Team (you + partner) can create/edit posts with React‑Quill
- ✅ Images uploaded to Vercel Blob and usable in posts
- ✅ Categories manageable via admin UI
- ✅ Published posts appear in /blog and /blog/[slug]
- ✅ Admin area protected with NextAuth and works on Vercel

## Phase 5 Success Criteria (CURRENT)
- ⏳ Comprehensive test coverage for all admin components
- ⏳ Reliable test suite that catches regressions
- ⏳ Documentation of testing patterns for future development
- ⏳ Confidence in admin system stability and maintainability

---

## Environment Setup Guide

### For Vercel Blob Storage: ✅ COMPLETE
1. Go to Vercel Dashboard → Your Project → Storage Tab
2. Click "Create Database" → Select "Blob"
3. Create a new Blob store (name it something like "nomad-blog-images")
4. Copy the `BLOB_READ_WRITE_TOKEN` that's generated
5. Add to your environment variables:
   - **Local development**: Add to `.env.local`
   - **Production**: Add to Vercel Dashboard → Settings → Environment Variables
6. Redeploy your app after adding the token

### Example .env.local addition: ✅ COMPLETE
```bash
# Vercel Blob Storage (get from Vercel Dashboard → Storage → Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

---

## Notes & next steps
- ✅ Phases 1-4 complete - admin system fully functional
- ⏳ Phase 5 in progress - comprehensive testing implementation
- Focus on maintainable, readable tests that prevent regressions
- Build testing knowledge incrementally with daily focused practice
- Each test should be a learning opportunity for testing patterns
