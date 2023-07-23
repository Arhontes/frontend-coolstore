import axios from 'axios'

import { errorCatch, getContentType } from './api.helper'
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

const axiosOptions = {
	baseURL: process.env.SERVER_URL,
	headers: getContentType(),
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config && config.headers && accessToken)
		//assing token to the header of the request if it exists
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	//if the request is rejected
	async error => {
		const originalRequest = error.config

		//if the request is unauthorized and it's not a retry request
		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			//set isRetry to true to avoid infinite loop
			originalRequest._isRetry = true
			try {
				//get new tokens and retry the request with the new tokens
				await AuthService.getNewTokens()
				//send the request with the new tokens
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	},
)
