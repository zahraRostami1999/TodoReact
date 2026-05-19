import { useEffect } from "react"
import Const from "../../../config/constants"
import Msg from "../../../config/messages.js"
import Api from "../../../services/api/api.js"
import {
	FloatInput,
	LoginButton,
	ErrorContainer,
} from "../../../components/PageLogin/index"

export default function GetUsername({ get, set }) {
	useEffect(() => set("error", Msg.USER.NO), [])

	const handleChange = (e) => {
		e.preventDefault()
		const username = e.target.value.trim()

		let haveForbidChar = false
		for (let i = 0; i < Const.USER.FORBID_CHARS.length; i++) {
			const char = Const.USER.FORBID_CHARS.slice(i, i + 1)
			if (username.indexOf(char) >= 0) {
				set("error", Msg.COMMON.FORBID(char))
				haveForbidChar = true
			}
		}
		if (!username) {
			set("error", Msg.USER.NO)
		} else if (username.length < Const.USER.MIN) {
			set("error", Msg.USER.SHORT(username.length))
		} else if (username.length > Const.USER.MAX) {
			set("error", Msg.USER.LONG(username.length))
		} else if (!haveForbidChar) {
			set("error", "")
		}

		set("userInput", { ...get("userInput"), username: e.target.value })
	}

	async function handleEnter(e) {
		e.preventDefault()
		if (get("error").length !== 0) return

		set("loading", true)
		let userExist = await Api.Auth.usernameExist(get("userInput").username)
		
		set("loading", false)

		if (userExist.ok !== null) {
			set("haveAccount", userExist.body.user_exists)
			set("step", 2)
		}
	}

	return (
		<form onSubmit={(e) => handleEnter(e)} className='flex flex-col lg:gap-7 sm:gap-10'>
			<div className='flex flex-col gap-1'>
				<FloatInput
					type={"text"}
					label='نام کاربری'
					value={get("userInput").username}
					onChange={(e) => handleChange(e)}
				/>
				<ErrorContainer text={get("error")} />
			</div>
			<LoginButton
				text='ورود'
				disabled={get("error").length > 0}
				isLoading={get("loading")}
			/>
		</form>
	)
}
