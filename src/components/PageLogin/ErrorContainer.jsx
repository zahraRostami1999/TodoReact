export default function ErrorContainer({ text }) {
	return (
		<div className='h-6'>
			<p
				dir='rtl'
				className='text-sm text-right pt-1 px-1 text-red-500 font-semibold'
			>
				{text}
			</p>
		</div>
	)
}
