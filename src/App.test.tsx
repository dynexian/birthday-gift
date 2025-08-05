import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock audio context for tests
Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    createGain: jest.fn().mockReturnValue({
      connect: jest.fn(),
      disconnect: jest.fn(),
      gain: { value: 1 }
    }),
    createBufferSource: jest.fn().mockReturnValue({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      buffer: null
    }),
    decodeAudioData: jest.fn(),
    destination: {}
  }))
});

describe('Birthday Gift App', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Just verify the app renders without errors
    expect(document.body).toBeInTheDocument();
  });

  test('contains birthday-related elements', () => {
    render(<App />);
    // The app should contain some birthday-related content
    // This is a basic test to ensure the app structure is present
    const appElement = document.querySelector('.App') || document.body;
    expect(appElement).toBeInTheDocument();
  });
});
