import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

test('renders loader?', () => {
  render(<App />);
  expect(screen.getByAltText(/loader/i)).toBeInTheDocument();
});

test('check if loader removes', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByAltText(/loader/i));
});
