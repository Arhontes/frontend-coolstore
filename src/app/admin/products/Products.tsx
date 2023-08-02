'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'

import { useAdminProducts } from './useAdminProducts'
import { AdminList } from '@/components'

const Products: FC = () => {
	const { data, isFetching, mutate } = useAdminProducts()

	return (
		<>
			<Heading className='mb-7'>Products</Heading>
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={mutate}
			/>
		</>
	)
}

export default Products
