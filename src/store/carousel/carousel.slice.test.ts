import { Store, configureStore } from '@reduxjs/toolkit'

import { carouselSlice } from './carousel.slice'
import { ICarouselInitialState } from './carousel.types'

const { nextSlide, prevSlide, selectSlide } = carouselSlice.actions

describe('carouselSlice reducer', () => {
	let store: Store<ICarouselInitialState>

	beforeEach(() => {
		store = configureStore({
			reducer: carouselSlice.reducer,
		})
	})

	it('should handle nextSlide correctly', () => {
		// Dispatch nextSlide action
		store.dispatch(nextSlide({ carouselLength: 5 }))

		// Check if selectedItemIndex has increased by 1
		expect(store.getState().selectedItemIndex).toBe(1)
	})

	it('should handle prevSlide correctly', () => {
		// Dispatch prevSlide action
		store.dispatch(prevSlide())

		// Check if selectedItemIndex has decreased by 1
		expect(store.getState().selectedItemIndex).toBe(0)

		// Dispatch prevSlide action when already at the first slide
		store.dispatch(prevSlide())

		// Check if selectedItemIndex stays at 0
		expect(store.getState().selectedItemIndex).toBe(0)
	})

	it('should handle selectSlide correctly', () => {
		// Dispatch selectSlide action
		store.dispatch(selectSlide(3))

		// Check if selectedItemIndex is set to 3
		expect(store.getState().selectedItemIndex).toBe(3)
	})
})
