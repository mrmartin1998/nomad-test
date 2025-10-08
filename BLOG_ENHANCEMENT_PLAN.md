# Blog System Enhancement Plan

## Current state (from the codebase)
- Models: src/lib/models/Post.js, src/lib/models/Category.js (Mongoose + MongoDB)
- API routes: /api/blog/posts (exists), /api/blog/categories (needs to be created), sitemap generator
- Pages: /blog, /blog/[slug]
- Components: src/components/blog/BlogContent.jsx, PostCard.jsx, Blog layout and post page implementation
- Existing admin component: src/components/admin/posts/PostForm.jsx (already created, can be reused)
- SEO: OpenGraph, JSON-LD and sitemap support in post page
- Auth: NextAuth.js integration present (JWT sessions)
- UI: TailwindCSS + DaisyUI style system, responsive layouts
- Deployment target: Vercel (serverless)

## Key gaps to fill (priority)
- Admin interface / media library for team-managed content
- Rich text editor (WYSIWYG) integrated into post creation
- Image upload + media management (must be Vercel-compatible)
- Category management UI and API route (API route needs to be created)
- Draft preview workflow for editors

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

## Phases & deliverables

Phase 1 — Admin foundation (2–3 days)
- Create admin app pages under `src/app/admin`:
  - layout.jsx (auth protected), page.jsx (dashboard), posts/page.jsx, posts/new/page.jsx, posts/[id]/edit/page.jsx, categories/page.jsx
- Small Navbar modification: add Admin link inside authenticated user menu
- Create minimal AdminSidebar component for navigation
- Create Category API route at src/app/api/blog/categories/route.js (currently missing)

Phase 2 — Rich text editor (1–2 days)
- Install: `npm install react-quill`
- Implement `src/components/admin/RichTextEditor.jsx` (dynamic import, ssr: false)
- Update existing `src/components/admin/posts/PostForm.jsx` to use RichTextEditor and category select
- Wire a simple create flow pointing to `/api/admin/posts`

Phase 3 — Image upload & media library (2–3 days)
- Install: `npm install @vercel/blob`
- Add API route `src/app/api/admin/upload/route.js` that uploads files to Vercel Blob (uses `put` from @vercel/blob) — returns CDN URL
- Create `ImageUploader.jsx` (client component) which POSTs FormData to `/api/admin/upload`
- Create `MediaLibrary.jsx` / `ImagePicker.jsx` to reuse uploaded images in the PostForm
- Modify Post model to include `featuredImage: String` (store blob URL)
- Add BLOB_READ_WRITE_TOKEN environment variable (get from Vercel Dashboard → Storage → Blob)

Phase 4 — Admin polish & features (1 day)
- Add AdminStats, PostsList (paginated), RecentPosts components
- Draft/publish toggle and Preview button (preview via a draft token or by showing draft previews for authenticated admin)

---

## Implementation patterns and code snippets (copy into files when ready)

Admin layout (auth protected):
```jsx
// filepath: src/app/admin/layout.jsx
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) { router.push('/login?callbackUrl=/admin'); return null; }
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

React‑Quill wrapper:
```jsx
// filepath: src/components/admin/RichTextEditor.jsx
'use client';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
export default function RichTextEditor({ value, onChange }) {
  const modules = { toolbar: [['bold','italic'], ['link','image'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]] };
  return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />;
}
```

Vercel Blob upload route pattern:
```javascript
// filepath: src/app/api/admin/upload/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { put } from '@vercel/blob';

export async function POST(request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  // Upload file to Vercel Blob store (requires BLOB_READ_WRITE_TOKEN env var)
  // Get token from: Vercel Dashboard → Storage → Blob → Create Store
  const blob = await put(file.name, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
```

Category API route (needs to be created) — corrected to import getServerSession for POST authorization:
```javascript
// filepath: src/app/api/blog/categories/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';

export async function GET() {
  await connectDB();
  const categories = await Category.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  await connectDB();
  const category = new Category(data);
  await category.save();
  return NextResponse.json(category, { status: 201 });
}
```

Post API pattern for admin:
```javascript
// filepath: src/app/api/admin/posts/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const posts = await Post.find({}).populate('category').sort({ date: -1 }).limit(50);
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  await connectDB();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const post = new Post({ ...data, slug, date: new Date() });
  await post.save();
  await post.populate('category');
  return NextResponse.json({ post }, { status: 201 });
}
```

PostForm integration notes (using existing component at src/components/admin/posts/PostForm.jsx)
- Update existing PostForm to integrate RichTextEditor component
- Load categories from `/api/blog/categories` (needs to be created)
- Use ImageUploader to upload and set `featuredImage` (blob URL)
- Submit processed tags array and meta_description
- Use slug generation on title if desired

---

## Files to create / modify (clear list)

Create:
- src/app/admin/layout.jsx
- src/app/admin/page.jsx
- src/app/admin/posts/page.jsx
- src/app/admin/posts/new/page.jsx
- src/app/admin/posts/[id]/edit/page.jsx
- src/app/admin/categories/page.jsx
- src/app/api/blog/categories/route.js (MISSING - needs to be created)
- src/components/admin/RichTextEditor.jsx
- src/components/admin/ImageUploader.jsx
- src/components/admin/MediaLibrary.jsx
- src/components/admin/ImagePicker.jsx
- src/components/admin/AdminSidebar.jsx
- src/components/admin/AdminStats.jsx
- src/components/admin/PostsList.jsx
- src/components/admin/RecentPosts.jsx
- src/app/api/admin/upload/route.js
- src/app/api/admin/media/route.js
- src/app/api/admin/posts/route.js
- (optional) small admin utility hooks under src/hooks/admin

Modify:
- src/components/admin/posts/PostForm.jsx (EXISTS - update to use RichTextEditor)
- src/components/Navbar.jsx — add Admin link in user dropdown (authenticated only)
- src/lib/models/Post.js — add featuredImage: String
- package.json — add dependencies: react-quill, @vercel/blob

Environment Variables to Add:
- BLOB_READ_WRITE_TOKEN (get from: Vercel Dashboard → Project → Storage → Blob → Create Store)
  - Add to .env.local for local development
  - Add to Vercel Dashboard → Settings → Environment Variables for production

---

## Timeline & priorities

Week 1
- Day 1–2: Admin layout, posts listing, Navbar link, Category API route
- Day 3–4: Update PostForm with React‑Quill integration
- Day 5: Basic create flow test and fixes

Week 2
- Day 1–2: Vercel Blob upload route + ImageUploader
- Day 3–4: MediaLibrary & ImagePicker integration into PostForm
- Day 5: Draft/publish preview and QA

Week 3
- Polishing, AdminStats, documentation, team handoff

---

## Success criteria (MVP)
- Team (you + partner) can create/edit posts with React‑Quill
- Images uploaded to Vercel Blob and usable in posts
- Categories manageable via admin UI
- Published posts appear in /blog and /blog/[slug]
- Admin area protected with NextAuth and works on Vercel

---

## Environment Setup Guide

### For Vercel Blob Storage:
1. Go to Vercel Dashboard → Your Project → Storage Tab
2. Click "Create Database" → Select "Blob"
3. Create a new Blob store (name it something like "nomad-blog-images")
4. Copy the `BLOB_READ_WRITE_TOKEN` that's generated
5. Add to your environment variables:
   - **Local development**: Add to `.env.local`
   - **Production**: Add to Vercel Dashboard → Settings → Environment Variables
6. Redeploy your app after adding the token

### Example .env.local addition:
```bash
# Vercel Blob Storage (get from Vercel Dashboard → Storage → Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

---

## Notes & next steps
- Implement incrementally and test each API/page after creation
- Keep admin UI client-only (`'use client'`) and protect API routes with `getServerSession`
- The existing PostForm at src/components/admin/posts/PostForm.jsx can be updated instead of creating a new one
- Category API route needs to be created before admin can load categories
- Get BLOB_READ_WRITE_TOKEN from Vercel Dashboard before implementing image upload
- If you want, I can generate the first admin file (updated PostForm, upload route, or Category API) — tell me which file to create first.
