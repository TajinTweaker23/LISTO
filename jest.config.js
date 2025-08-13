module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle static assets
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle Next.js absolute imports (if you use @/ or ~/)
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(react-leaflet|@react-leaflet|leaflet)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  collectCoverageFrom: [
    'pages/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!**/*.d.ts',
  ],
  testMatch: [
    '<rootDir>/__tests__/**/*.(test|spec).{ts,tsx}',
  ],
};