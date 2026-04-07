import Const from "../../config/constants"
import Loading from "./Loading"

export default function LoginButton({
	text,
	disabled,
	isLoading,
	loadingText = Const.UI.LOAD,
}) {
	const ltr = text && !/^[\u0600-\u06FF]/.test(text) ? "ltr" : "rtl"

	return (
		<button
			type='submit'
			disabled={disabled}
			dir={ltr}
			className={`${disabled ? "bg-purple-400" : "bg-purple-700 hover:bg-purple-800"}
				text-white font-medium text-base px-4 py-2 rounded-lg w-full
				flex items-center justify-center transition-all duration-300
				${isLoading ? "cursor-not-allowed" : ""}`}
		>
			{isLoading ?
				<Loading loadingText={loadingText} />
			:	text}
		</button>
	)
}
