# AI Development Rules

## 1. Documentation Order
1. Start with PRD.md review/update
   Example: When adding a new feature, first check PRD.md requirements:
   ```markdown
   ### User Management System
   - User registration and authentication
   - Role-based access (Admin/Customer)
   ```

2. Update FEATURE_PLANNING.md based on PRD
   Example: Break down the feature into tasks:
   ```markdown
   ### Authentication System (Issue #1)
   #### Technical Tasks
   1. Backend:
      - [ ] Update User model
      - [ ] Implement JWT auth
   ```

3. Use DESIGN_FLOW.md template for each feature
   Example: Document technical implementation:
   ```markdown
   ## Technical Design
   ### Backend Changes
   - Model: Add role field to User
   - Controller: Add role validation
   ```

## 2. Focus Rules
- Stay on current task until completion
  Example: Complete all authentication tasks before starting product features
- No code suggestions for unrelated features
  Example: Don't suggest cart features while working on auth
- Reference only relevant documentation
  Example: When working on user auth, reference:
  - @server/src/models/user.model.js
  - @server/src/controllers/auth.controller.js

## 3. Development Process
1. Planning Phase
   ```markdown
   - Review: Check PRD.md for requirements
   - Plan: Create DESIGN_FLOW.md entry
   - Document: Update FEATURE_PLANNING.md
   ```

2. Implementation Phase
   ```javascript
   // Example: Follow established patterns
   const userSchema = new mongoose.Schema({
     email: { type: String, required: true },
     role: { type: String, enum: ['user', 'admin'] }
   });
   ```

## 4. Documentation Requirements
- Use @notation for file references
  Example: @server/src/models/user.model.js
- Track progress in version-1.0.0.md
  Example:
  ```markdown
  ## Progress
  - [x] User Model
  - [ ] Authentication
  ```

## 5. Issue Management
- Create specific, actionable issues
  Example:
  ```markdown
  Title: [AUTH] Implement JWT Authentication
  Tasks:
  - [ ] Add JWT middleware
  - [ ] Create token generation
  ```

## 6. Communication Protocol
- Confirm current task
  Example: "Currently working on user authentication, specifically JWT implementation"
- Report completion
  Example: "Completed: JWT middleware implementation, ready for review"

## 7. Error Prevention
- Validate existing code
  Example: Check auth.middleware.js before modifying auth flow
- Test edge cases
  Example:
  ```javascript
  // Test invalid token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  ```

## 8. Progress Tracking
- Start with status
  Example: "Current: Implementing user authentication (70% complete)"
- End with summary
  Example: "Completed: JWT middleware, Next: Password reset"

## 9. Code Organization
- Follow patterns
  Example:
  ```javascript
  // Controller pattern
  const controllerName = async (req, res) => {
    try {
      // Logic
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  ```

## 10. Testing Requirements
- Unit test critical paths
  Example:
  ```javascript
  describe('Auth Middleware', () => {
    it('should validate JWT token', () => {
      // Test code
    });
  });
  ```

## 11. Security Practices
- Always validate input
  Example:
  ```javascript
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  ```

## 12. Testing Implementation
- Start with critical paths
  Example:
  ```javascript
  // Test user authentication first
  describe('Auth Flow', () => {
    test('user registration', () => {
      // Test code
    });
  });
  ```

- Follow test hierarchy:
  1. Unit Tests (Functions/Components)
  2. Integration Tests (API/Services)
  3. E2E Tests (User Flows)

## 13. Development Context
- Share repository structure
- Reference completed issues
- Indicate current task
- List relevant dependencies

## 14. Progress Continuation
- Confirm last completed task
- Verify current issue
- Review pending changes
- Check dependencies 

## 15. Package Management
- Verify dependencies before coding
  Example:
  ```bash
  # Check package.json first
  npm list react-toastify
  # Install if missing
  npm install react-toastify
  ```

## 16. Session Continuity
- Start each session with status update:
  ```markdown
  /start-development
  Current Issue: #issue_number
  Last Completed: task_name
  Project Phase: phase_name
  Core Files: @relevant_files
  ```

## 17. Error Recovery Protocol
- Document error solutions
  Example:
  ```markdown
  Error: Module not found
  Solution: 
  1. Check package.json
  2. Install missing dependency
  3. Update import statement
  ```

## 18. Feature Dependencies
- Check ISSUES_INDEX.md before starting
- Verify all dependent features are complete
- Document any new dependencies found
  Example:
  ```markdown
  Feature: User Profile
  Dependencies:
  - [x] Authentication (#1)
  - [ ] Image Upload Service
  ```

## 19. Testing Documentation
- Create test specifications before implementation:
  ```markdown
  ### Test Cases
  1. Unit Tests:
     - Function behavior
     - Edge cases
     - Error handling
  2. Integration Tests:
     - API endpoints
     - Component interaction
  3. E2E Tests:
     - User flows
     - Error scenarios
  ```

## 20. Development Checkpoints
- Pre-implementation checklist:
  ```markdown
  - [ ] Dependencies verified
  - [ ] Packages installed
  - [ ] Documentation updated
  - [ ] Test cases defined
  - [ ] Branch created
  ``` 

## Feature Protection Rules
1. Never Modify Working Features
   - Test existing functionality before making changes
   - Document current working state
   - Verify all existing features after changes
   - Roll back immediately if any existing feature breaks

2. Change Validation Process
   - Create backup of current working state
   - Test all related features before changes
   - Test all related features after changes
   - Document all tests performed

3. Code Modification Safety
   - Never remove existing code without verification
   - Keep existing validation patterns
   - Maintain current authentication flows
   - Preserve working middleware chains

4. Testing Requirements
   Before any changes:
   - [ ] Test all authentication flows
   - [ ] Verify user operations
   - [ ] Document working features
   - [ ] Create restore point

   After changes:
   - [ ] Re-test all authentication flows
   - [ ] Verify all user operations
   - [ ] Compare with pre-change documentation
   - [ ] Prepare rollback procedure

5. Critical Systems Protection
   Never modify without thorough testing:
   - Authentication systems
   - Password handling
   - User sessions
   - Data validation

6. File Structure Protection
   - Never create new directories without explicit user approval
   - Never suggest moving existing files
   - Never create duplicate components
   - Always use existing file structure
   - Verify file paths before suggesting changes
   - Document all file dependencies in current location

7. File Path Integrity
   - Use exact paths from project structure
   - Maintain existing import/export paths
   - Never assume directory existence
   - Validate imports before suggesting changes
   - Keep components in their original locations
   - Respect the established component hierarchy

8. Component Organization Rules
   - Follow existing component categorization
   - Never mix component levels
   - Keep components in their designated locations
   - Document component relationships without restructuring

9. Development Workflow Protection
   - Start with existing file structure
   - Document dependencies in current locations
   - Update components in place
   - Never suggest structural changes without user approval
   - Maintain established import paths
   - Respect existing component boundaries

