import React, { useState } from "react"
import FloatInput from "../../../components/FloatInput";
import ErrMsg from "../../../config/errorMessages";
import Const from "../../../config/constants";
import LoginButton from "../../../components/LoginButton";

export default function GetUsername({
    userInput,
    handleChangeInput,
    handleClickButton,
    isLoading
}) {
    const [error, setError] = useState(ErrMsg.USER.NO);    

    const handleUsernameChange = (e) => {
        e.preventDefault()
        const username = e.target.value.trim()

        let haveForbidChar = false
        for (let i = 0; i < Const.USER.FORBID_CHARS.length; i++) {
            const char = Const.USER.FORBID_CHARS.slice(i, i + 1)
            if (username.indexOf(char) >= 0) {
                setError(ErrMsg.COMMON.FORBID(char))
                haveForbidChar = true
            }
        }

        if (!username) {
            setError(ErrMsg.USER.NO)
        } else if (username.length < Const.USER.MIN) {
            setError(ErrMsg.USER.SHORT(username.length))
        } else if (username.length > Const.USER.MAX) {
            setError(ErrMsg.USER.LONG(username.length))
        } else if (!haveForbidChar) {
            setError("")
        }

        handleChangeInput(e.target.value, "username")
    }

    return (
        <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-1'>
                <FloatInput
                    type={"text"}
                    label='نام کاربری'
                    value={userInput.username}
                    onChange={(e) => handleUsernameChange(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && error.length === 0) handleClickButton();
                    }}
                />
                <div className='h-6'>
                    <p className='text-sm text-right pt-1 px-1 text-red-500 font-medium'>
                        {error}
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <LoginButton
                    text='ورود'
                    onClick={handleClickButton}
                    disable={error.length > 0}
                    isLoading={isLoading}
                />
                <LoginButton text='ورود با Souperlopers' disable={true} />
            </div>
        </div>
    )
}
