import { render, screen } from '@testing-library/react';
import PanchangamTable from '../PanchangamTable';

describe('PanchangamTable', () => {
  it('renders the title', () => {
    render(<PanchangamTable />);
    expect(screen.getByText('📅 పంచాంగం')).toBeInTheDocument();
  });

  it('renders only one known row label', () => {
    render(<PanchangamTable />);
    expect(screen.getByText('తిథి')).toBeInTheDocument();
  });
});