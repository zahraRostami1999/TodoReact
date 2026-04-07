import { useState } from "react"
import GetUsername from "../login/components/GetUsername"
import GetPassword from "../login/components/GetPassword"

function LoginPage() {
	const [step, setStep] = useState(1)
	const [haveAccount, setHaveAccount] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [userInput, setUserInput] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	})

	const getState = (state) => eval(state)

	function setState(key, value) {
		const firstChar = key.substring(0, 1).toUpperCase()
		const restChars = key.substring(1)
		const stateSetter = `set${firstChar}${restChars}`

		if (typeof value === "string") {
			value = value.replaceAll('"', '\\"')
			value = `"${value}"`
		} else if (typeof value === "object") {
			value = JSON.stringify(value)
		}

		eval(`${stateSetter}(${value});`)
	}	

	return (
		<div className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-purple-400'>
			<div className='lg:w-2/5 md:w-1/2 sm:w-4/5 bg-white/70 shadow-lg rounded-lg lg:py-16 lg:px-5 sm:px-3 sm:py-10'>
				<header className='mb-10'>
					<h1 className='lg:font-extrabold lg:text-4xl sm:font-bold sm:text-2xl text-neutral-700 text-center'>
						😡 HISTX ToDo list 😇
					</h1>
				</header>
				<main className='flex flex-col gap-10'>
					{step === 1 && <GetUsername get={getState} set={setState} />}
					{step === 2 && <GetPassword get={getState} set={setState} />}
				</main>
			</div>
		</div>
	)
}

export default LoginPage
