import type { Metadata } from 'next'
import { Golos_Text, Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import Providers from '@/providers/Providers'

import '@/assets/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
	icons: {
		icon: '/favicon.svg',
	},
}

const golos = Golos_Text({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
	style: ['normal'],
	variable: '--font-golos',
})

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang='en' className={golos.variable}>
			<body>
				<Providers>
					<div className='bg-secondary'>
						<div
							className='grid'
							style={{
								gridTemplateColumns: '.8fr 4fr',
							}}
						>
							<main className='p-12 pb-52 bg-bg-color rounded-tl-lg'>
								{children}
							</main>
						</div>
					</div>
				</Providers>
				<div id='modal'></div>
			</body>
		</html>
	)
}
