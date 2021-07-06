import { render, screen } from '@testing-library/react';
import App from '../App';

test('Hello World test', () => {
  render(<App />);
  const text = screen.getByText(/hello world/i, {exact : false});
  expect(text).toBeInTheDocument();
});
