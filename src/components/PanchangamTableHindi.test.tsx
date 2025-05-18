import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import PanchangamTableHindi from './PanchangamTableHindi';

// Mock the mhah-panchang library using vi.mock
vi.mock('mhah-panchang', () => {
  const mockPanchangData = {
    Tithi: { name_en_IN: 'Mock Tithi' },
    Nakshatra: { name_en_IN: 'Mock Nakshatra' },
    Yoga: { name_en_IN: 'Mock Yoga' },
    Karna: { name_en_IN: 'Mock Karna' },
  };
  // Define a mock class
  const MockMhahPanchang = vi.fn().mockImplementation(() => {
    return {
      calendar: vi.fn().mockReturnValue(mockPanchangData),
    };
  });
  return { MhahPanchang: MockMhahPanchang };
});

describe('PanchangamTableHindi', () => {
  beforeEach(() => {
    // Reset the mock before each test
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    render(<PanchangamTableHindi />);
    await waitFor(() => {
      expect(screen.getByText('📅 పంచాంగం')).toBeInTheDocument();
    });
  });
});