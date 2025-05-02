import { render, screen, waitFor } from '@testing-library/react';
import PanchangamTable from '../PanchangamTable';
import { MhahPanchang } from 'mhah-panchang';
import { vi } from 'vitest';

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

describe.skip('PanchangamTable', () => {
  beforeEach(() => {
    // Reset the mock before each test
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('📅 పంచాంగం')).toBeInTheDocument();
    });
  });

  it('renders all expected row labels', async () => {
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('తిథి')).toBeInTheDocument();
      expect(screen.getByText('నక్షత్రం')).toBeInTheDocument();
      expect(screen.getByText('యోగం')).toBeInTheDocument();
      expect(screen.getByText('కరణం')).toBeInTheDocument();
    });
  });

  it('renders the calculated panchangam values', async () => {
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('Mock Tithi')).toBeInTheDocument();
      expect(screen.getByText('Mock Nakshatra')).toBeInTheDocument();
      expect(screen.getByText('Mock Yoga')).toBeInTheDocument();
      expect(screen.getByText('Mock Karna')).toBeInTheDocument();
    });
  });

  it('handles errors during panchangam calculation', async () => {
    // Spy on console.error to prevent it from logging during this test
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock the MhahPanchang implementation specifically for this test
    vi.mocked(MhahPanchang).mockImplementationOnce(() => {
      return {
        calendar: vi.fn().mockImplementation(() => {
          throw new Error('Calculation failed');
        }),
      } as any; // Use 'as any' to bypass type checking for the mock implementation
    });

    render(<PanchangamTable />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Could not calculate')).toBeInTheDocument();
    });

    // Restore the original console.error
    consoleErrorSpy.mockRestore();
  });

  it('renders "N/A" for Tithi when name_en_IN is null', async () => {
    vi.mocked(MhahPanchang).mockImplementationOnce(() => {
      return {
        calendar: vi.fn().mockReturnValue({
          Tithi: { name_en_IN: null },
          Nakshatra: { name_en_IN: 'Mock Nakshatra' },
          Yoga: { name_en_IN: 'Mock Yoga' },
          Karna: { name_en_IN: 'Mock Karna' },
        }),
      } as any;
    });
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('తిథి')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  it('renders "N/A" for Nakshatra when name_en_IN is null', async () => {
    vi.mocked(MhahPanchang).mockImplementationOnce(() => {
      return {
        calendar: vi.fn().mockReturnValue({
          Tithi: { name_en_IN: 'Mock Tithi' },
          Nakshatra: { name_en_IN: null },
          Yoga: { name_en_IN: 'Mock Yoga' },
          Karna: { name_en_IN: 'Mock Karna' },
        }),
      } as any;
    });
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('నక్షత్రం')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  it('renders "N/A" for Yoga when name_en_IN is null', async () => {
    vi.mocked(MhahPanchang).mockImplementationOnce(() => {
      return {
        calendar: vi.fn().mockReturnValue({
          Tithi: { name_en_IN: 'Mock Tithi' },
          Nakshatra: { name_en_IN: 'Mock Nakshatra' },
          Yoga: { name_en_IN: null },
          Karna: { name_en_IN: 'Mock Karna' },
        }),
      } as any;
    });
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('యోగం')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  it('renders "N/A" for Karna when name_en_IN is null', async () => {
    vi.mocked(MhahPanchang).mockImplementationOnce(() => {
      return {
        calendar: vi.fn().mockReturnValue({
          Tithi: { name_en_IN: 'Mock Tithi' },
          Nakshatra: { name_en_IN: 'Mock Nakshatra' },
          Yoga: { name_en_IN: 'Mock Yoga' },
          Karna: { name_en_IN: null },
        }),
      } as any;
    });
    render(<PanchangamTable />);
    await waitFor(() => {
      expect(screen.getByText('కరణం')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });
});