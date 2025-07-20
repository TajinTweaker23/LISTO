import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Explore from '../pages/explore';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/explore',
    push: jest.fn(),
  }),
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = 'LoadableComponent';
  return DynamicComponent;
});

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    input: 'input',
    nav: 'nav',
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock react-spring
jest.mock('@react-spring/web', () => ({
  useSpring: () => ({ number: { to: () => '0.0' } }),
  animated: {
    div: 'div',
    span: 'span',
  },
}));

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }: any) => children,
  Droppable: ({ children }: any) => children({ innerRef: jest.fn(), droppableProps: {}, placeholder: null }),
  Draggable: ({ children }: any) => children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
}));

describe('Explore Component', () => {
  test('renders explore component', () => {
    render(<Explore />);
    const exploreElement = screen.getByText(/explore/i);
    expect(exploreElement).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<Explore />);
    const searchInput = screen.getByPlaceholderText(/search images, articles/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders navigation elements', () => {
    render(<Explore />);
    const darkModeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(darkModeToggle).toBeInTheDocument();
  });
});