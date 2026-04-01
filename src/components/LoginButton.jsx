import React from "react";

export default function LoginButton({ text, onClick, disable, isLoading }) {
	const buttonClasses = `
        ${disable ? "bg-purple-400" : "bg-purple-700 hover:bg-purple-800"}
        text-white font-medium text-base px-4 py-2 rounded-lg w-full
        flex items-center justify-center transition-all duration-300
        ${isLoading ? 'cursor-not-allowed' : ''}
    `;

	const loadingText = "یه لحظه صبر کن";

	return (
		<button
			type='submit'
			onClick={onClick}
			disabled={disable}
			className={buttonClasses}
		>
			{isLoading ? (
				<div className="flex items-center justify-center w-full h-full">
					<span className="flex items-center gap-1">
						<span className="inline-flex items-center ml-2">
							<span className="rounded-full h-1 w-1 bg-white mx-1 animate-pulse" style={{ animationDelay: '0ms' }}></span>
							<span className="rounded-full h-1 w-1 bg-white mx-1 animate-pulse" style={{ animationDelay: '300ms' }}></span>
							<span className="rounded-full h-1 w-1 bg-white mx-1 animate-pulse" style={{ animationDelay: '600ms' }}></span>
						</span>
						{loadingText}
					</span>
				</div>
			) : (
				text
			)}
		</button>
	);
}
