import React, { useState } from "react"
import FloatInput from "../FloatInput"
import ErrMsg from "../../config/errorMessages"
import Const from "../../config/constants"
import LoginButton from "../LoginButton"

export default function GetPassword({
  userInput,
  haveAccount,
  handleChangeInput,
  handleClickButton,
  errorMessage,
}) {
  const [error, setError] = useState("")

  const handlePasswordChange = (e, type) => {
    e.preventDefault()
    const password = e.target.value.trim()
    // const password = userInput.password
    // const confirmPassword = userInput.confirmPassword

    let haveForbidChar = false
    for (let i = 0; i < Const.PASS.FORBID_CHARS.length; i++) {
      const char = Const.PASS.FORBID_CHARS.slice(i, i + 1)
      if (password.indexOf(char) >= 0) {
        setError(ErrMsg.COMMON.FORBID(char))
        haveForbidChar = true
      }
    }

    if (!password) {
      setError(ErrMsg.PASS.NO)
    } else if (password.length < Const.PASS.MIN) {
      setError(ErrMsg.PASS.SHORT(password.length))
      // } else if (!haveAccount && confirmPassword !== password) {
      // 	setError(ErrMsg.PASS.VERIFY)
    } else if (!haveForbidChar) {
      setError("")
    }

    handleChangeInput(e.target.value, type)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-end items-center text-base text-neutral-700 font-semibold mb-5'>
          <p className='flex gap-1 text-right' dir='rtl'>
            {`${userInput.username}, `}
            {haveAccount ? ErrMsg.ACCOUNT.HAVE : ErrMsg.ACCOUNT.DHAVE}
          </p>
          <span className='text-2xl'>✨</span>
        </div>
        <FloatInput
          type='password'
          label='رمزعبور'
          value={userInput.password}
          onChange={(e) => handlePasswordChange(e, "password")}
        />
        {!haveAccount && (
          <FloatInput
            type='password'
            label='تکرار رمزعبور'
            value={userInput.confirmPassword}
            onChange={(e) => handlePasswordChange(e, "confirmPassword")}
          />
        )}
        <div className='h-6'>
          {[error, errorMessage].map(
            (err) =>
              err && (
                <div className='flex justify-end gap-0.5'>
                  <p
                    className='text-sm text-right pt-1 px-1 text-red-500 font-semibold'
                    dir='rtl'
                  >
                    {err} ‼️
                  </p>
                </div>
              ),
          )}
        </div>
      </div>
      <LoginButton
        text='ورود'
        onClick={handleClickButton}
        disable={error.length > 0 || (errorMessage||"").length > 0}
      />
    </div>
  )
}
