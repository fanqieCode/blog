'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { motion } from 'motion/react'
import { Heart } from '@/components/icons'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { BLOG_SLUG_KEY } from '@/consts'

type LikeButtonProps = {
	slug?: string
	className?: string
	delay?: number
}

const ENDPOINT = 'https://blog-liker.yysuni1001.workers.dev/api/like'

export default function LikeButton({ slug = 'yysuni', delay, className }: LikeButtonProps) {
	slug = BLOG_SLUG_KEY + slug
	const [liked, setLiked] = useState(false)
	const [show, setShow] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setShow(true)
		}, delay || 1000)
	}, [])

	const fetcher = useCallback(async (url: string): Promise<number | null> => {
		const res = await fetch(url, { method: 'GET', cache: 'no-store' })
		if (!res.ok) return null
		const data = await res.json().catch(() => ({}))
		return typeof data?.count === 'number' ? data.count : null
	}, [])

	const { data: fetchedCount, mutate } = useSWR(slug ? `${ENDPOINT}?slug=${encodeURIComponent(slug)}` : null, fetcher, {
		revalidateOnFocus: false,
		dedupingInterval: 1000 * 10
	})

	const handleLike = useCallback(async () => {
		if (!slug) return
		setLiked(true)

		try {
			const url = `${ENDPOINT}?slug=${encodeURIComponent(slug)}`
			const res = await fetch(url, { method: 'POST' })
			const data = await res.json().catch(() => ({}))
			if (data.reason == 'rate_limited') toast('谢谢啦😘，今天已经不能再点赞啦💕')
			const value = typeof data?.count === 'number' ? data.count : (fetchedCount ?? 0) + 1
			await mutate(value, { revalidate: false })
		} catch {
			// ignore
		}
	}, [slug, fetchedCount, mutate])

	const count = typeof fetchedCount === 'number' ? fetchedCount : null

	if (show)
		return (
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				aria-label='Like this post'
				onClick={handleLike}
				className={clsx('text-secondary hover:text-primary relative flex items-center gap-2 rounded-full p-2 transition-colors', className)}>
				<Heart className={clsx(liked ? 'fill-rose-400 text-rose-400' : 'fill-rose-200 text-rose-200')} size={20} />

				{typeof count === 'number' && (
					<span className={cn('text-xs tabular-nums', liked ? 'text-rose-400' : 'text-secondary')}>{count}</span>
				)}
			</motion.button>
		)
}
