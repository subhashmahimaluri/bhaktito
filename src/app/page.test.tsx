import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders Bhaktito Panchangam title', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Bhaktito Panchangam/i })).toBeInTheDocument();
  });
});