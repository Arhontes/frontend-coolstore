import {
	IAddToCartPayload,
	ICartInitialState,
	IChangeQuantityPayload,
	cartSlice,
} from '.'
import { Store, configureStore } from '@reduxjs/toolkit'

import { IProduct } from '@/types'

const { addToCart, removeFromCart, changeQuantity, reset } = cartSlice.actions

describe('cartSlice reducer', () => {
	let store: Store<ICartInitialState>

	beforeEach(() => {
		store = configureStore({
			reducer: cartSlice.reducer,
		})
	})

	it('should handle addToCart correctly', () => {
		const payload: IAddToCartPayload = {
			product: { id: 1, name: 'Product 1', price: 10 },
			quantity: 2,
		} as IAddToCartPayload

		store.dispatch(addToCart(payload))

		expect(store.getState().items.length).toBe(1)
		expect(store.getState().items[0].product.id).toBe(1)
	})

	it('should handle removeFromCart correctly', () => {
		const initialState: ICartInitialState = {
			items: [
				{
					id: 0,
					product: { id: 1, name: 'Product 1', price: 10 },
					quantity: 2,
				},
			],
		} as ICartInitialState

		store = configureStore({
			reducer: cartSlice.reducer,
			preloadedState: initialState,
		})

		store.dispatch(removeFromCart({ id: 0 }))

		expect(store.getState().items.length).toBe(0)
	})

	it('should handle changeQuantity correctly (plus)', () => {
		const initialState: ICartInitialState = {
			items: [
				{
					id: 0,
					product: {
						id: 1,
						name: 'Product 1',
						price: 10,
					},
					quantity: 2,
				},
			],
		} as ICartInitialState

		store = configureStore({
			reducer: cartSlice.reducer,
			preloadedState: initialState,
		})

		const payload: IChangeQuantityPayload = { id: 0, type: 'plus' }

		store.dispatch(changeQuantity(payload))

		expect(store.getState().items[0].quantity).toBe(3)
	})

	it('should handle changeQuantity correctly (minus)', () => {
		const initialState: ICartInitialState = {
			items: [
				{
					id: 0,
					product: { id: 1, name: 'Product 1', price: 10 },
					quantity: 2,
				},
			],
		} as ICartInitialState

		store = configureStore({
			reducer: cartSlice.reducer,
			preloadedState: initialState,
		})

		const payload: IChangeQuantityPayload = { id: 0, type: 'minus' }

		store.dispatch(changeQuantity(payload))

		expect(store.getState().items[0].quantity).toBe(1)
	})

	it('should handle reset correctly', () => {
		const initialState: ICartInitialState = {
			items: [
				{
					id: 0,
					product: { id: 1, name: 'Product 1', price: 10 },
					quantity: 2,
				},
			],
		} as ICartInitialState

		store = configureStore({
			reducer: cartSlice.reducer,
			preloadedState: initialState,
		})

		store.dispatch(reset())

		expect(store.getState().items.length).toBe(0)
	})
})
