import siteContent from '@/config/site-content.json'

export default function Footer() {
	const beian = siteContent.beian

	return (
		<footer className='border-border mt-8 border-t py-10'>
			<div className='text-secondary mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-xs'>
				<span>© {siteContent.meta.title}</span>

				{beian?.text &&
					(beian.link ? (
						<a href={beian.link} target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
							{beian.text}
						</a>
					) : (
						<span>{beian.text}</span>
					))}
			</div>
		</footer>
	)
}
