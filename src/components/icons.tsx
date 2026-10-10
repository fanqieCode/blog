import { createElement, forwardRef, type ComponentProps, type ComponentType } from 'react'
import {
	Check as LucideCheck,
	CircleCheckIcon as LucideCircleCheckIcon,
	Copy as LucideCopy,
	Heart as LucideHeart,
	InfoIcon as LucideInfoIcon,
	Loader2Icon as LucideLoader2Icon,
	Moon as LucideMoon,
	OctagonXIcon as LucideOctagonXIcon,
	Pause as LucidePause,
	Play as LucidePlay,
	Plus as LucidePlus,
	RotateCcw as LucideRotateCcw,
	Sun as LucideSun,
	TriangleAlertIcon as LucideTriangleAlertIcon,
	X as LucideX,
	XIcon as LucideXIcon
} from 'lucide-react'

type IconProps = ComponentProps<'svg'>
type IconComponent = ComponentType<IconProps>

/**
 * Dark Reader 等浏览器扩展会在 React 水合完成之前改写 <svg> 的内联 stroke，
 * 注入 data-darkreader-inline-stroke 属性与 --darkreader-inline-stroke 自定义属性，
 * 导致服务端 HTML 与客户端属性不一致，触发 hydration mismatch 报错。
 *
 * 这种差异来自页面之外的第三方脚本，渲染层无法避免，
 * 这里统一为该元素补上 suppressHydrationWarning，仅忽略属性层面的差异，不影响任何真实逻辑。
 * 注意：该模块刻意不加 'use client'，以便在服务端组件中仍然保持服务端渲染。
 */
function ssrSafe<T extends IconComponent>(Icon: T, displayName: string): T {
	const Guarded = forwardRef<SVGSVGElement, IconProps>((props, ref) => createElement(Icon, { ...props, ref, suppressHydrationWarning: true }))
	Guarded.displayName = displayName
	return Guarded as unknown as T
}

export const Check = ssrSafe(LucideCheck, 'Check')
export const CircleCheckIcon = ssrSafe(LucideCircleCheckIcon, 'CircleCheckIcon')
export const Copy = ssrSafe(LucideCopy, 'Copy')
export const Heart = ssrSafe(LucideHeart, 'Heart')
export const InfoIcon = ssrSafe(LucideInfoIcon, 'InfoIcon')
export const Loader2Icon = ssrSafe(LucideLoader2Icon, 'Loader2Icon')
export const Moon = ssrSafe(LucideMoon, 'Moon')
export const OctagonXIcon = ssrSafe(LucideOctagonXIcon, 'OctagonXIcon')
export const Pause = ssrSafe(LucidePause, 'Pause')
export const Play = ssrSafe(LucidePlay, 'Play')
export const Plus = ssrSafe(LucidePlus, 'Plus')
export const RotateCcw = ssrSafe(LucideRotateCcw, 'RotateCcw')
export const Sun = ssrSafe(LucideSun, 'Sun')
export const TriangleAlertIcon = ssrSafe(LucideTriangleAlertIcon, 'TriangleAlertIcon')
export const X = ssrSafe(LucideX, 'X')
export const XIcon = ssrSafe(LucideXIcon, 'XIcon')
