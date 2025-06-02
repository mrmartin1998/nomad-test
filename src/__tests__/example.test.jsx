import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Example component test
describe('Example Component Tests', () => {
  // Test 1: Simple render test
  it('renders a heading', () => {
    // Arrange
    render(<h1>Hello World</h1>);
    
    // Act
    const heading = screen.getByText('Hello World');
    
    // Assert
    expect(heading).toBeInTheDocument();
  });
});

// Example function test
describe('Example Function Tests', () => {
  // Test 2: Simple function test
  it('adds two numbers correctly', () => {
    // Arrange
    const add = (a, b) => a + b;
    
    // Act
    const result = add(1, 2);
    
    // Assert
    expect(result).toBe(3);
  });
}); 