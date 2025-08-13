require('@testing-library/jest-dom');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    // Empty constructor for mock
  }
  observe() {
    // Mock observe method
  }
  unobserve() {
    // Mock unobserve method
  }
  disconnect() {
    // Mock disconnect method
  }
};

// Mock geolocation
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  },
  writable: true,
});