export default function WelcomeText({ username, message }) {
	return (
		<div className='flex justify-end items-center text-base text-neutral-700 font-semibold mb-5'>
			<p className='flex gap-1 text-right' dir='rtl'>
				{`${username}, `}
				{message}
			</p>
			<span className='text-2xl'>✨</span>
		</div>
	)
}
