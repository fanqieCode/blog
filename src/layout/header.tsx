'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/consts'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import siteContent from '@/config/site-content.json'

export default function Header() {
	const pathname = usePathname()

	return (
		<header className='border-border bg-bg/85 sticky top-0 z-40 border-b backdrop-blur-sm'>
			<div className='mx-auto flex max-w-7xl flex-col gap-2 px-6 py-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='font-averia hover:text-brand shrink-0 text-base font-medium tracking-wide transition-colors'>
						{siteContent.meta.title}
					</Link>

					<div className='sm:hidden'>
						<ThemeToggle />
					</div>
				</div>

				<nav className='scrollbar-none -mx-1 flex min-w-0 shrink gap-1 overflow-x-auto sm:mx-0 sm:gap-2'>
					{NAV_ITEMS.map(item => {
						const active = pathname === item.href || pathname.startsWith(item.href + '/')

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'text-secondary hover:text-primary rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors',
									active && 'text-primary font-medium'
								)}>
								{item.label}
							</Link>
						)
					})}
				</nav>

				<div className='hidden sm:block'>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
