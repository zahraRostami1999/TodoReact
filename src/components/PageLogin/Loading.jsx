function LoadingPulse({ interval }) {
	return (
		<span
			className='rounded-full h-1 w-1 bg-white mx-1 animate-pulse'
			style={{ animationDelay: `${interval}ms` }}
		></span>
	)
}

export default function Loading({ loadingText }) {
	return (
		// <div className='flex items-center justify-center w-full h-full'>
		<span className='flex items-center justify-center w-full h-full gap-1'>
			{loadingText}
			<span className='inline-flex items-center ml-2'>
				<LoadingPulse interval={0} />
				<LoadingPulse interval={300} />
				<LoadingPulse interval={600} />
			</span>
		</span>
		// </div>
	)
}
