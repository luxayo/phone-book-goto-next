import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    "node_modules",
    "<rootDir>/src"
  ],
  moduleNameMapper: {
  '@components/(.*)': '<rootDir>/src/components/$1',
  '@api/(.*)': '<rootDir>/src/api/$1',
  '@models/(.*)': '<rootDir>/src/models/$1',
  '@styles/(.*)': '<rootDir>/src/styles/$1',
  '@lib/(.*)': '<rootDir>/src/lib/$1',
  '@/(.*)': '<rootDir>/src/$1',
  }
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)