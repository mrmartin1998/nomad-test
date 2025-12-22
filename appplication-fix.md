# Multiple Form Submissions Fix Guide

## Problem Summary
Forms were being submitted multiple times due to authentication redirects and state changes when the user returned from login. This was happening in both the UK and ESTA forms.

## Root Causes
1. Multiple state updates after auth redirects
2. localStorage being cleared after submission (too late)
3. State not properly preserved between rerenders
4. Form data being handled incorrectly in component updates

## Solution 1: Using useRef to Track Submission State

```jsx
// Before:
// The form would resubmit whenever session/status changed (multiple times)

// After:
const hasAutoSubmitted = useRef(false);
  
useEffect(() => {
  const pendingSubmission = localStorage.getItem('form_pending_submission');
  
  if (pendingSubmission && !hasAutoSubmitted.current) {
    // Only process if we haven't already auto-submitted
    try {
      // Parse data, check timestamp
      const { formData, timestamp } = JSON.parse(pendingSubmission);
      
      // Auto-submit only once when authenticated
      if (session && status === 'authenticated') {
        hasAutoSubmitted.current = true; // Set flag to prevent resubmission
        localStorage.removeItem('form_pending_submission'); // Clear before submission
        handleSubmit(formData);
      }
    } catch (error) {
      console.error('Error parsing pending submission:', error);
    }
  }
}, [session, status]);
```

### Why This Works
- **useRef vs useState**:
  - useRef creates a mutable value that persists across re-renders
  - Unlike state variables, changing a ref doesn't trigger a re-render
  - Perfect for tracking "has this happened already?" flags
- **Single-time Action**:
  - The useEffect still runs multiple times as auth state changes
  - But the submission only happens once thanks to the ref check

## Solution 2: Immediate localStorage Cleanup

```jsx
// Before:
if (session && status === 'authenticated') {
  handleSubmit(formData);
  // localStorage was cleared after response (too late)
}

// After:
if (session && status === 'authenticated') {
  hasAutoSubmitted.current = true;
  localStorage.removeItem('form_pending_submission'); // Clear BEFORE submission
  handleSubmit(formData);
}
```

### Why This Works
- **Race Condition Prevention**:
  - Other useEffect runs might read localStorage before the operation completes
  - Clearing storage immediately blocks any other execution paths from seeing the data
  - Even if multiple concurrent effects run, only one will process the submission

## Solution 3: Proper Form Data Handling in Components

```jsx
// Before:
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value }); // Risks losing data if formData is null
}

// After:
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value })); // Always preserves previous state
}
```

### Why This Works
- **Functional Updates**:
  - Using the function form of setState ensures you always have the latest state
  - Prevents race conditions when multiple state updates happen rapidly
  - More resilient against null or undefined state values

## Solution 4: Safe Document Handling for API Submissions

```jsx
// Before:
const dataWithUser = {  
  ...formData,
  documentos: formData.documentos // Objects that can't be stored directly
};

// After:
// Process the document data properly
const processedDocuments = {
  fotoCarnet: formData.documentos?.fotoCarnet?.name || "",
  pasaporteEscaneado: formData.documentos?.pasaporteEscaneado?.name || ""
};

const formattedData = {
  // ...other fields
  documentos: processedDocuments // Strings that can be stored in MongoDB
};
```

### Why This Works
- **MongoDB Schema Compatibility**:
  - MongoDB expects strings for document fields, not complex objects
  - Converting File objects to simple strings prevents validation errors
  - Explicit processing ensures consistent data format

## Solution 5: Server-Side Duplicate Prevention

```jsx
// Server-side duplicate detection in API route
const recentSubmission = await FormModel.findOne({
  userId: session.user.id,
  fechaCreacion: { $gte: new Date(Date.now() - 5000) } // Last 5 seconds
});

if (recentSubmission) {
  // Return existing submission instead of creating a new one
  return NextResponse.json({
    success: true,
    message: "Application submitted successfully",
    applicationId: recentSubmission._id.toString(),
    data: recentSubmission,
    isDuplicate: true
  });
}
```

### Why This Works
- **Database-level Protection**:
  - Provides an additional safeguard beyond client-side prevention
  - Time window (5 seconds) prevents accidental double-submissions
  - Returns the existing submission ID instead of creating duplicates

## Implementation Guide for All Forms

For each form, ensure:

1. **Use refs for submission tracking**:
   ```jsx
   const hasAutoSubmitted = useRef(false);
   ```

2. **Check the ref flag before auto-submitting**:
   ```jsx
   if (pendingSubmission && !hasAutoSubmitted.current) {
     // Process submission
   }
   ```

3. **Set the flag and clear localStorage BEFORE submission**:
   ```jsx
   hasAutoSubmitted.current = true;
   localStorage.removeItem('form_pending_submission');
   handleSubmit(formData);
   ```

4. **Always use functional updates for form data**:
   ```jsx
   setFormData(prev => ({ ...prev, [name]: value }));
   ```

5. **Process document/file data before API submission**:
   ```jsx
   // Convert complex objects to strings
   const processedDocs = {
     document1: formData.document1?.name || "",
   };
   ```

6. **Add duplicate detection in API routes**:
   ```jsx
   // Check for submissions in the last 5 seconds
   const recentSubmission = await Model.findOne({
     userId: session.user.id,
     fechaCreacion: { $gte: new Date(Date.now() - 5000) }
   });
   ```

This pattern works for any form that involves authentication redirects, where multiple re-renders can occur as the auth state changes.

## Example: Successful UK Form Implementation

The UK form now properly handles all these scenarios:
- Preserves form data during typing with functional state updates
- Prevents multiple submissions with useRef tracking
- Handles document uploads correctly by converting to strings
- Clears localStorage at the right time (before submission, not after)
- Has server-side protection against duplicates

These patterns should be followed for all future form implementations.