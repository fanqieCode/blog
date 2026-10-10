'use client'

import { useEffect } from 'react'
import { create } from 'zustand'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'blog-theme'

type ThemeState = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggle: () => void
}

const readTheme = (): Theme => {
	if (typeof document === 'undefined') return 'light'
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
	document.documentElement.classList.toggle('dark', theme === 'dark')
	try {
		localStorage.setItem(STORAGE_KEY, theme)
	} catch {
		/* localStorage 不可用时忽略 */
	}
}

export const useThemeStore = create<ThemeState>(set => ({
	theme: 'light',
	setTheme: theme => {
		applyTheme(theme)
		set({ theme })
	},
	toggle: () => {
		const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
		applyTheme(next)
		set({ theme: next })
	}
}))

/** 把首屏脚本设置的 class 同步进 store（脚本已保证无闪烁） */
export function useThemeInit() {
	useEffect(() => {
		useThemeStore.setState({ theme: readTheme() })
	}, [])
}

export const useTheme = useThemeStore
