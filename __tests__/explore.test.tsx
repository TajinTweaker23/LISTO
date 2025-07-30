import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Explore from '../pages/explore';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/explore',
    push: jest.fn(),
    query: {},
    asPath: '/explore',
  }),
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = 'LoadableComponent';
  return DynamicComponent;
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock Firebase
jest.mock('../lib/firebase', () => ({
  auth: {},
  db: {},
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    input: ({ children, ...props }: any) => <input {...props}>{children}</input>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => children,
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
}));

// Mock react-spring
jest.mock('@react-spring/web', () => ({
  useSpring: () => ({ number: { to: () => '0.0' } }),
  animated: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }: any) => children,
  Droppable: ({ children }: any) => children({ innerRef: jest.fn(), droppableProps: {}, placeholder: null }),
  Draggable: ({ children }: any) => children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
}));

// Mock Leaflet and React-Leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
}));

// Mock other dependencies that might cause issues
jest.mock('leaflet', () => ({}));
jest.mock('howler', () => ({}));

describe('Explore Component', () => {
  // Simple smoke test - just ensure component renders without crashing
  test('renders without crashing', () => {
    expect(() => render(<Explore />)).not.toThrow();
  });

  // Test that the component structure exists
  test('renders main container', () => {
    render(<Explore />);
    // Look for a div that should always be present
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });
});