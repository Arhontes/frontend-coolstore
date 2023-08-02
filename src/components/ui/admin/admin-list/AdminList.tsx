'use client'

import { AdminListItem } from '.'
import { FC } from 'react'

import Loader from '@/ui/Loader'

import styles from './AdminList.module.scss'
import { IListItem } from './admin-list.interface'

interface IAdminList {
	listItems?: IListItem[]
	isLoading: boolean

	removeHandler?: (id: number) => void
}

export const AdminList: FC<IAdminList> = ({
	isLoading,
	removeHandler,
	listItems = [],
}) => {
	return (
		<div>
			{isLoading ? (
				<Loader />
			) : listItems.length ? (
				listItems.map(listItem => (
					<AdminListItem
						key={listItem.id}
						removeHandler={
							removeHandler ? () => removeHandler(listItem.id) : undefined
						}
						listItem={listItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}
