'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'

import { useAdminReviews } from './useAdminReviews'
import { AdminList } from '@/components'

const Reviews: FC = () => {
	const { data, isFetching } = useAdminReviews()

	return (
		<>
			<Heading className='mb-7'>Reviews</Heading>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Reviews
