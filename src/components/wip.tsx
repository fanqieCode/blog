'use client'

import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'

export default function WIP() {
	return (
		<div className='flex flex-col items-center justify-center pb-12'>
			<div className='w-full max-w-[600px]'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: INIT_DELAY }}
					className='flex flex-col items-center gap-4 py-16 text-center'>
					<h1 className='text-2xl font-semibold'>开发中</h1>
					<p className='text-secondary text-sm leading-relaxed'>这个功能正在努力开发中，敬请期待！</p>
				</motion.div>
			</div>
		</div>
	)
}
