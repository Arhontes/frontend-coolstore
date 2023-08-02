import { IInitialState, checkAuth, login, logout, register, userSlice } from '.'
import { Store, configureStore } from '@reduxjs/toolkit'

import { getStoreLocal } from '@/utils'

const mockGetStoreLocal = jest.fn((name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
})

jest.mock('', () => ({
	getStoreLocal: mockGetStoreLocal,
}))

const { fulfilled } = register
//@ts-ignore
describe('userSlice reducers', () => {
	let store: Store<{ user: IInitialState }>

	beforeEach(() => {
		//@ts-ignore
		store = configureStore({
			reducer: userSlice.reducer,
		})
		localStorage.clear()
	})

	it('should handle register.fulfilled correctly', () => {
		const payload = { user: { id: 1, name: 'John' } }
		//@ts-ignore
		store.dispatch(register.fulfilled(payload))
		//@ts-ignore
		expect(store.getState().isLoading).toBe(false)
		expect(store.getState().user).toEqual(payload.user)
	})

	it('should handle register.rejected correctly', () => {
		store.dispatch(register.rejected)
		//@ts-ignore
		expect(store.getState().isLoading).toBe(false)
		expect(store.getState().user).toBe(null)
	})

	// Add similar tests for other actions (login, logout, and checkAuth).
	// For brevity, I'll provide only one test case for each.

	it('should handle login.fulfilled correctly', () => {
		const payload = { user: { id: 2, name: 'Alice' } }
		//@ts-ignore
		store.dispatch(login.fulfilled(payload))
		//@ts-ignore
		expect(store.getState().isLoading).toBe(false)
		expect(store.getState().user).toEqual(payload.user)
	})

	it('should handle login.rejected correctly', () => {
		store.dispatch(login.rejected)
		//@ts-ignore
		expect(store.getState().isLoading).toBe(false)
		expect(store.getState().user).toBe(null)
	})

	it('should handle logout.fulfilled correctly', () => {
		store.dispatch(logout.fulfilled)
		//@ts-ignore
		expect(store.getState().isLoading).toBe(false)
		expect(store.getState().user).toBe(null)
	})

	it('should handle checkAuth.fulfilled correctly', () => {
		const payload = { user: { id: 3, name: 'Bob' } }
		//@ts-ignore
		store.dispatch(checkAuth.fulfilled(payload))

		expect(store.getState().user).toEqual(payload.user)
	})
})
