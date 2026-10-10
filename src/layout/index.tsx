'use client'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from '@/components/icons'
import Header from './header'
import Footer from './footer'
import { useSize, useSizeInit } from '@/hooks/use-size'
import { useTheme, useThemeInit } from '@/hooks/use-theme'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { ScrollTopButton } from '@/components/scroll-top-button'
import MusicCard from '@/components/music-card'

export default function Layout({ children }: PropsWithChildren) {
	useSizeInit()
	useThemeInit()
	const { cardStyles } = useConfigStore()
	const { maxSM, init } = useSize()
	const theme = useTheme(state => state.theme)

	return (
		<>
			<Toaster
				position='bottom-right'
				richColors
				theme={theme}
				icons={{
					success: <CircleCheckIcon className='size-4' />,
					info: <InfoIcon className='size-4' />,
					warning: <TriangleAlertIcon className='size-4' />,
					error: <OctagonXIcon className='size-4' />,
					loading: <Loader2Icon className='size-4 animate-spin' />
				}}
				style={
					{
						'--border-radius': '12px'
					} as React.CSSProperties
				}
			/>

			<Header />

			<main className='relative z-10 mx-auto w-full max-w-7xl px-6 pt-10 pb-16 max-sm:px-4'>{children}</main>

			<Footer />

			{!maxSM && cardStyles.musicCard?.enabled !== false && <MusicCard />}

			{maxSM && init && <ScrollTopButton className='bg-card fixed right-6 bottom-8 z-50 border shadow-sm' />}
		</>
	)
}
