export default function ErrorContainer({ text }) {
	return (
		<div className='h-6'>
			<p
				dir='rtl'
				className='lg:text-[14px] sm:text-[13px] text-right pt-1 px-1 text-red-500 font-semibold'
			>
				{text}
			</p>
		</div>
	)
}
