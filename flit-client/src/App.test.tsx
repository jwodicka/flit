import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('knows its name', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Flit/i);
  expect(linkElement).toBeInTheDocument();
});
