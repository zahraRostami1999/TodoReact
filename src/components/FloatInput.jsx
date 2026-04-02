import React, { useState } from "react"

export default function FloatInput({ type, value, onChange, label, onKeyDown }) {
	const hasValue = value !== ""
	const [displayPassword, setDisplayPassword] = useState(false)
	const ltr = value && !/^[\u0600-\u06FF]/.test(value)

	return (
		<div className='w-full relative'>
			<input
				type={type}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				className={`peer w-full h-11 rounded-lg border px-3 bg-(--bg-container) text-neutral-500 pt-1 font-semibold text-[14px] ring-1 ring-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${hasValue ? "border-purple-600" : "border-[#E2E8F0]"}`}
				dir={`${ltr ? "ltr" : "rtl"}`}
			/>
			<label
				style={{ pointerEvents: "none" }}
				className={`
                    absolute -top-3 ${ltr ? "left-3" : "right-3"} px-1 font-semibold bg-white rounded-xl
                    text-[15px] transition-all duration-300 text-neutral-700
                    bg-(--bg-container)
                    ${hasValue ? "-top-2.5 text-purple-600 bg-white rounded-xl" : "top-2.5"}
                     peer-focus:-top-3
                    peer-focus:font-semibold
                    peer-focus:text-purple-900
                `}
			>
				{label}
			</label>
			{type === "password" && (
				<button
					className={`text-3xl absolute ${ltr ? "right-3" : "left-3"} top-2`}
					onClick={() => setDisplayPassword(!displayPassword)}
				>
					{displayPassword ? "🙂" : "🫣"}
				</button>
			)}
		</div>
	)
}
