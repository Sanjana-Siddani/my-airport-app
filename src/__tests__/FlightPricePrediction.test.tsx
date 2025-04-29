import React from 'react';
import { render, screen } from '@testing-library/react';

// A simple inline React component
const SimpleComponent = () => <h1>Hello, Airport App!</h1>;

describe('SimpleComponent', () => {
  it('renders the heading text', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello, Airport App!')).toBeInTheDocument();
  });
});
