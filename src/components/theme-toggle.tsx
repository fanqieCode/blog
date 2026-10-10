'use client'

import { Moon, Sun } from '@/components/icons'
import { useThemeStore } from '@/hooks/use-theme'

export function ThemeToggle() {
	const toggle = useThemeStore(state => state.toggle)

	return (
		<button
			type='button'
			onClick={toggle}
			aria-label='切换深色模式'
			className='text-secondary hover:text-primary rounded-md p-2 transition-colors'>
			<Sun className='size-4 dark:hidden' />
			<Moon className='hidden size-4 dark:block' />
		</button>
	)
}
