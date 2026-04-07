import { useNavigate } from "react-router-dom"
import ErrMsg from "../../../config/errorMessages"
import Const from "../../../config/constants"
import Api from "../../../services/Api"
import {
	FloatInput,
	LoginButton,
	ErrorContainer,
	WelcomeText,
} from "../../../components/PageLogin/index"

export default function GetPassword({ get, set }) {
	const navigate = useNavigate() // Hook for navigation

	const handleChange = (e, type) => {
		e.preventDefault()

		const thisPass = e.target.value.trim()
		let errorToSet = ""

		// check if password or confirmPassword changed
		if (!get("haveAccount")) // only when registering
		{
			const otherInput = type === "password" ? "confirmPassword" : "password"
			if (thisPass !== get("userInput")[otherInput])
				errorToSet = ErrMsg.PASS.VERIFY
		}

		// check if only password changed
		if (type === "password") {
			for (let i = 0; i < Const.PASS.FORBID_CHARS.length; i++) {
				const char = Const.PASS.FORBID_CHARS.slice(i, i + 1)
				if (thisPass.indexOf(char) >= 0) {
					errorToSet = ErrMsg.COMMON.FORBID(char)
				}
			}
			if (!thisPass) {
				errorToSet = ErrMsg.PASS.NO
			} else if (thisPass.length < Const.PASS.MIN) {
				errorToSet = ErrMsg.PASS.SHORT(thisPass.length)
			} else if (!errorToSet) {
				errorToSet = ""
			}
		}

		set("error", errorToSet)
		set("userInput", { ...get("userInput"), [type]: e.target.value })
	}

	async function handleEnter(e) {
		e.preventDefault()
		if (get("error").length !== 0) return

		set("loading", true)
		const response = await Api.Auth[get("haveAccount") ? "login" : "register"](
			get("userInput").username,
			get("userInput").password,
		)
		set("loading", false)

		if (response === null) {
			// error on fetching
			set("error", ErrMsg.COMMON.CNN)
		} else if (!response.ok) {
			set("error", response.body.message)
		} else {
			navigate("/")
		}
	}

	return (
		<form onSubmit={(e) => handleEnter(e)} className='flex flex-col gap-5'>
			<div className='flex flex-col gap-5'>
				<WelcomeText
					username={get("userInput").username}
					message={get("haveAccount") ? Const.UI.HAVE : Const.UI.DHAVE}
				/>
				<FloatInput
					type='password'
					label='رمز عبور'
					value={get("userInput").password}
					onChange={(e) => handleChange(e, "password")}
				/>
				{!get("haveAccount") && (
					<FloatInput
						type='password'
						label='تکرار رمز عبور'
						value={get("userInput").confirmPassword}
						onChange={(e) => handleChange(e, "confirmPassword")}
						autoFocus={false}
					/>
				)}
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
