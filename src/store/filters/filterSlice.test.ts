import { IFiltersActionsPayload, IFiltersState } from '.'
import { Store, configureStore } from '@reduxjs/toolkit'

import { filtersSlice } from './filters.slice'
import { EnumProductSort } from '@/services/product/product.types'

const { updateQueryParam, resetFilterUpdate } = filtersSlice.actions

describe('filtersSlice reducer', () => {
	let store: Store<IFiltersState>

	beforeEach(() => {
		store = configureStore({
			reducer: filtersSlice.reducer,
		})
	})

	it('should handle updateQueryParam correctly', () => {
		const payload: IFiltersActionsPayload = {
			key: 'searchTerm',
			value: 'example search',
		}

		store.dispatch(updateQueryParam(payload))

		expect(store.getState().queryParams.searchTerm).toBe('example search')
		expect(store.getState().isFilterUpdated).toBe(true)
	})

	it('should handle multiple updateQueryParam correctly', () => {
		const initialPayload: IFiltersActionsPayload = {
			key: 'sort',
			value: EnumProductSort.HIGH_PRICE,
		}

		const updatedPayload: IFiltersActionsPayload = {
			key: 'ratings',
			value: '4+',
		}

		store.dispatch(updateQueryParam(initialPayload))
		store.dispatch(updateQueryParam(updatedPayload))

		expect(store.getState().queryParams.sort).toBe(EnumProductSort.HIGH_PRICE)
		expect(store.getState().queryParams.ratings).toBe('4+')
		expect(store.getState().isFilterUpdated).toBe(true)
	})

	it('should handle resetFilterUpdate correctly', () => {
		const initialState: IFiltersState = {
			isFilterUpdated: true,
			queryParams: {
				sort: EnumProductSort.LOW_PRICE,
				searchTerm: 'test',
				page: 2,
				perPage: 10,
				ratings: '3+',
			},
		}

		store = configureStore({
			reducer: filtersSlice.reducer,
			preloadedState: initialState,
		})

		store.dispatch(resetFilterUpdate())

		expect(store.getState().isFilterUpdated).toBe(false)
	})
})
