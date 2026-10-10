export const INIT_DELAY = 0.3
export const ANIMATION_DELAY = 0.1
export const CARD_SPACING = 36
export const CARD_SPACING_SM = 24
export const BLOG_SLUG_KEY = process.env.BLOG_SLUG_KEY || ''

/** 顶部导航入口（与路由一一对应，顺序即显示顺序） */
export const NAV_ITEMS = [
	{ label: '近期文章', href: '/blog' },
	{ label: '照片墙', href: '/pictures' },
	{ label: '我的项目', href: '/projects' },
	{ label: '关于网站', href: '/about' },
	{ label: '推荐分享', href: '/share' },
	{ label: '优秀博客', href: '/bloggers' }
] as const

/**
 * GitHub 仓库配置
 */
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'FanQie',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || '2026-blog',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '-',
	ENCRYPT_KEY: process.env.NEXT_PUBLIC_GITHUB_ENCRYPT_KEY || '',
} as const
