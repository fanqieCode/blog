'use client'

import { motion } from 'motion/react'
import { ANIMATION_DELAY, INIT_DELAY } from '@/consts'
import LikeButton from '@/components/like-button'
import { BlogToc } from '@/components/blog-toc'
import { ScrollTopButton } from '@/components/scroll-top-button'
import { useConfigStore } from '@/app/(home)/stores/config-store'

type TocItem = {
	id: string
	text: string
	level: number
}

type BlogSidebarProps = {
	cover?: string
	summary?: string
	toc: TocItem[]
	slug?: string
}

export function BlogSidebar({ cover, summary, toc, slug }: BlogSidebarProps) {
	const { siteContent } = useConfigStore()
	const summaryInContent = siteContent.summaryInContent ?? false

	return (
		<div className='sticky top-20 flex w-[200px] shrink-0 flex-col items-start gap-8 self-start text-sm max-sm:hidden'>
			{cover && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: INIT_DELAY + ANIMATION_DELAY * 1 }} className='w-full'>
					<img src={cover} alt='cover' className='border-border h-auto w-full rounded-lg border object-cover' />
				</motion.div>
			)}

			{summary && !summaryInContent && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: INIT_DELAY + ANIMATION_DELAY * 2 }} className='w-full'>
					<h2 className='text-secondary mb-2 text-xs tracking-widest uppercase'>摘要</h2>
					<div className='text-secondary scrollbar-none max-h-[240px] cursor-text overflow-auto'>{summary}</div>
				</motion.div>
			)}

			<BlogToc toc={toc} delay={INIT_DELAY + ANIMATION_DELAY * 3} />

			<LikeButton slug={slug} delay={(INIT_DELAY + ANIMATION_DELAY * 4) * 1000} />

			<ScrollTopButton delay={INIT_DELAY + ANIMATION_DELAY * 5} />
		</div>
	)
}
