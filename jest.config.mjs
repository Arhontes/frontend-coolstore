import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
	dir: './',
})

/** @type {import('next/jest.js').Config} */
const config = {
	testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
