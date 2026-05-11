export default function WelcomeText({ username, message }) {
	return (
		<div className='flex justify-end items-start lg:text-base sm:text-sm text-neutral-700 font-semibold mb-5'>
			<p className='flex gap-1 text-right' dir='rtl'>
				{`${username}, `}
				{message}
			</p>
			<span className='lg:text-2xl sm:text-xl'>✨</span>
		</div>
	)
}
