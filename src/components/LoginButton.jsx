import React, { useState } from "react"

export default function LoginButton({ text, onClick, disable }) {
	return (
		<button
			type='submit'
			onClick={onClick}
			disabled={disable}
			style={{ cursor: disable && "not-allowed" }}
			className={`${disable ? "bg-red-600" : "bg-purple-500 hover:bg-purple-700"} rounded-lg text-[16px] font-medium w-full text-white py-2 transition-all duration-300`}
			dir={text && !/^[\u0600-\u06FF]/.test(text) ? "ltr" : "rtl"}
		>
			{text}
			{/** loading spinner here */}
		</button>
	)
}
