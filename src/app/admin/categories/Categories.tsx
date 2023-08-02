'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'

import { useAdminCategories } from './useAdminCategories'
import { AdminList } from '@/components'

const Categories: FC = () => {
	const { data, isFetching, mutate } = useAdminCategories()

	return (
		<>
			<Heading className='mb-7'>Categories</Heading>
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={mutate}
			/>
		</>
	)
}

export default Categories
