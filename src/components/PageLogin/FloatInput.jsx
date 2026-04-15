import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useBrowserInfo } from "../hooks/useBrowserInfo"

function PassToggler({ enable, onclick, ltr }) {
	const browserName = useBrowserInfo() //Edge - Chrome

	return (
		<button
			type='button'
			tabIndex={-1}
			className={`text-3xl absolute text-neutral-500 ${ltr ? "right-3" : "left-3"} top-2.5`}
			onClick={onclick}
		>
			{browserName !== "Edge" &&
				(enable ? <FiEyeOff size={22} /> : <FiEye size={22} />)}
		</button>
	)
}

export default function FloatInput({
	type,
	value,
	onChange,
	label,
	autoFocus = true,
}) {
	const hasValue = value !== ""
	const [displayPassword, setDisplayPassword] = useState(false)
	const ltr = value && !/^[\u0600-\u06FF]/.test(value)

	return (
		<div className='w-full relative'>
			<input
				type={
					type === "text" ? "text"
					: displayPassword ?
						"text"
					:	"password"
				}
				value={value}
				autoFocus={autoFocus}
				onChange={onChange}
				className={`
					peer w-full h-11 rounded-lg border px-3 bg-(--bg-container) text-neutral-500 
					pt-1 font-semibold text-[14px] ring-1 ring-purple-300 
					focus:outline-none focus:ring-2 focus:ring-purple-600 
					${hasValue ? "border-purple-600" : "border-[#E2E8F0]"}`}
				dir={ltr ? "ltr" : "rtl"}
			/>
			<label
				style={{ pointerEvents: "none" }}
				className={`
                    absolute -top-3 transition-all duration-300 px-1 font-semibold bg-white rounded-xl
                    text-[15px] text-neutral-700 bg-(--bg-container) peer-focus:-top-3 
                    peer-focus:font-semibold peer-focus:text-purple-900
					${ltr && type === "password" ? "left-3" : "right-3"}
                    ${hasValue ? "-top-2.5 text-purple-600 bg-white rounded-xl" : "top-2.5"}
                `}
			>
				{label}
			</label>
			{type === "password" && (
				<PassToggler
					enable={displayPassword}
					onclick={() => setDisplayPassword(!displayPassword)}
					ltr={ltr}
				/>
			)}
		</div>
	)
}
