'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'

import { useAdminOrders } from './useAdminOrders'
import { AdminList } from '@/components'

const Orders: FC = () => {
	const { data, isFetching } = useAdminOrders()

	return (
		<>
			<Heading className='mb-7'>Orders</Heading>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Orders
