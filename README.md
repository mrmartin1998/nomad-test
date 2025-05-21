This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Git Workflow

This project uses a modified GitFlow strategy to ensure a clean, reliable, and collaborative development process.

### Main Branches

- **master**: Production-ready code. Only release branches are merged here after final review and testing.
- **develop**: Main development branch. All feature and bugfix branches are merged here.

### Supporting Branches

- **feature/**: For new features.  
  Example: `feature/user-authentication`
- **bugfix/**: For bug fixes.  
  Example: `bugfix/login-error`
- **release/**: For preparing a new production release.  
  Example: `release/1.0.0`

### Branch Protection Rules

- **master**:
  - Pull request reviews required
  - Status checks must pass (CI, tests)
  - No direct pushes allowed
- **develop**:
  - Pull request reviews required
  - Status checks must pass
  - No direct pushes allowed

### Workflow Steps

1. **Starting a Feature or Bugfix**
   - Checkout `develop`:  
     `git checkout develop`
   - Pull latest changes:  
     `git pull origin develop`
   - Create a new branch:  
     `git checkout -b feature/your-feature-name`  
     or  
     `git checkout -b bugfix/your-bug-description`

2. **Working on Your Branch**
   - Make and commit your changes.
   - Push to remote:  
     `git push origin feature/your-feature-name`

3. **Creating a Pull Request**
   - Open a PR targeting the `develop` branch.
   - Ensure all status checks pass and request a review.
   - Link the PR to the relevant issue.

4. **After PR Merge**
   - Switch to `develop` and pull latest:  
     `git checkout develop`  
     `git pull origin develop`
   - Delete your local branch:  
     `git branch -d feature/your-feature-name`
   - Prune remote branches:  
     `git fetch --prune`

5. **Release Process**
   - When ready, create a `release/x.y.z` branch from `develop`.
   - After final testing, merge `release/x.y.z` into both `master` and `develop`.
   - Tag the release on `master`.

### Testing Branch Protection Rules

- Attempting to push directly to `master` or `develop` should be blocked.
- PRs must be reviewed and all status checks must pass before merging.
- If any rule is not enforced, update the repository settings in GitHub.

### Full Branch Strategy

For detailed rules and workflow, see [`.github/BRANCH_STRATEGY.md`](.github/BRANCH_STRATEGY.md).
