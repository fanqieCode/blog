import { motion } from 'motion/react'
import { BlogPreview } from '@/components/blog-preview'
import { useWriteData } from '../hooks/use-write-data'
import type { PublishForm } from '../types'

type WritePreviewProps = {
	form: PublishForm
	coverPreviewUrl: string | null
	onClose: () => void
	slug?: string
}

export function WritePreview({ form, coverPreviewUrl, onClose, slug }: WritePreviewProps) {
	const previewData = useWriteData()
	return (
		<div>
			<div onClick={e => e.stopPropagation()}>
				<BlogPreview
					markdown={previewData.markdown}
					title={previewData.title}
					tags={form.tags}
					date={previewData.date}
					summary={form.summary}
					cover={coverPreviewUrl || undefined}
					slug={slug}
				/>
			</div>
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='border-border bg-card text-secondary hover:text-primary fixed top-[72px] right-6 z-40 rounded-lg border px-3 py-1.5 text-xs transition-colors'
				onClick={onClose}>
				关闭预览
			</motion.button>
		</div>
	)
}
