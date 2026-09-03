import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./lib/workspace', () => ({
  initAuth: () => () => {},
  googleSignIn: vi.fn(),
  logout: vi.fn(),
}));

describe('App', () => {
  it('renders the primary navigation', () => {
    render(<App />);
    expect(screen.getAllByText('Our Process').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Why Us').length).toBeGreaterThan(0);
  });
});
