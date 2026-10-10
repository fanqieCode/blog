'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import SocialButtons from '@/app/(home)/social-buttons'
import { useBlogIndex } from '@/hooks/use-blog-index'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import ConfigDialog from './config-dialog/index'
import { NAV_ITEMS } from '@/consts'

const RECENT_COUNT = 5

const SECTION_TITLE = 'text-secondary text-xs tracking-widest uppercase'

export default function Home() {
	const { siteContent, configDialogOpen, setConfigDialogOpen } = useConfigStore()
	const { items, loading } = useBlogIndex()
	const recent = items.slice(0, RECENT_COUNT)
	const hideEditButton = siteContent.hideEditButton ?? false

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === ',')) {
				e.preventDefault()
				setConfigDialogOpen(true)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [setConfigDialogOpen])

	return (
		<div className='mx-auto w-full max-w-[680px] space-y-12 py-2'>
			<section className='space-y-3'>
				<h1 className='font-averia text-3xl leading-tight'>{siteContent.meta.title}</h1>
				<p className='text-secondary text-sm leading-relaxed'>{siteContent.meta.description}</p>
			</section>

			<section className='space-y-3'>
				<h2 className={SECTION_TITLE}>导航</h2>
				<ul className='border-border divide-border divide-y border-y'>
					{NAV_ITEMS.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='hover:text-primary flex items-baseline justify-between gap-4 py-3 text-sm transition-colors'>
								<span>{item.label}</span>
								<span className='text-secondary text-xs'>{item.href}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section className='space-y-4'>
				<h2 className={SECTION_TITLE}>最新文章</h2>

				{loading ? (
					<div className='text-secondary text-xs'>加载中...</div>
				) : recent.length === 0 ? (
					<div className='text-secondary text-xs'>暂无文章</div>
				) : (
					<ul className='space-y-3'>
						{recent.map(item => (
							<li key={item.slug}>
								<Link href={`/blog/${item.slug}`} className='group flex items-baseline justify-between gap-4'>
									<span className='group-hover:text-primary truncate text-sm transition-colors'>{item.title || item.slug}</span>
									<span className='text-secondary shrink-0 text-xs tabular-nums'>{dayjs(item.date).format('YYYY-MM-DD')}</span>
								</Link>
							</li>
						))}
					</ul>
				)}

			<div className='flex items-center gap-4'>
				<Link href='/blog' className='text-secondary hover:text-primary inline-block text-xs transition-colors'>
					全部文章 →
				</Link>

				{!hideEditButton && (
					<Link href='/write' className='text-secondary hover:text-primary inline-block text-xs transition-colors'>
						写文章 →
					</Link>
				)}
			</div>
		</section>

			<section className='space-y-3'>
				<h2 className={SECTION_TITLE}>联系</h2>
				<SocialButtons />
			</section>

			<ConfigDialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} />
		</div>
	)
}
