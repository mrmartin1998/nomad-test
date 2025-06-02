# Testing Guide

## Quick Start
1. Write tests in `src/__tests__` directory
2. Run tests with `npm test`
3. See test coverage with `npm test -- --coverage`

## Test Structure
```javascript
describe('Component/Function Name', () => {
  it('should do something specific', () => {
    // Arrange - set up test data
    // Act - perform the action
    // Assert - check the results
  });
});
```

## What to Test
1. Components
   - Does it render?
   - Does it show the right content?
   - Does it respond to user interactions?

2. Functions
   - Does it return the expected result?
   - Does it handle edge cases?
   - Does it handle errors?

## Example Test
See `src/__tests__/example.test.jsx` for a working example.

## Running Tests
- `npm test` - Run all tests
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report 