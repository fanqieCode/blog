'use client'

import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { useMarkdownRender } from '@/hooks/use-markdown-render'
import { useSize } from '@/hooks/use-size'
import { BlogSidebar } from '@/components/blog-sidebar'
import { useConfigStore } from '@/app/(home)/stores/config-store'

type BlogPreviewProps = {
	markdown: string
	title: string
	tags: string[]
	date: string
	summary?: string
	cover?: string
	slug?: string
}

export function BlogPreview({ markdown, title, tags, date, summary, cover, slug }: BlogPreviewProps) {
	const { maxLG: isNarrow } = useSize()
	const { content, toc, loading } = useMarkdownRender(markdown)
	const { siteContent } = useConfigStore()
	const summaryInContent = siteContent.summaryInContent ?? false

	if (loading) {
		return <div className='text-secondary flex min-h-[60vh] items-center justify-center text-sm'>渲染中...</div>
	}

	return (
		<div className='mx-auto flex w-full max-w-[1080px] justify-center gap-12 max-sm:px-0'>
			<motion.article
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: INIT_DELAY }}
				className='min-w-0 max-w-[720px] flex-1'>
				<h1 className='text-3xl leading-snug font-semibold tracking-tight'>{title}</h1>

				<div className='text-secondary mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm'>
					<span>{date}</span>
					{tags.map(t => (
						<span key={t}>#{t}</span>
					))}
				</div>

				{summary && summaryInContent && <p className='text-secondary mt-4 text-sm leading-relaxed'>{summary}</p>}

				<div className='prose mt-10 cursor-text'>{content}</div>
			</motion.article>

			{!isNarrow && <BlogSidebar cover={cover} summary={summary} toc={toc} slug={slug} />}
		</div>
	)
}
