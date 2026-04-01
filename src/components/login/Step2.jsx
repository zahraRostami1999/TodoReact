import React, { useState } from 'react';
import FloatPassword from '../input/FloatPassword';

function Step2({ data, haveAccount, handleChangeInput, handleClickButton, errorMessage }) {
  console.log(errorMessage);
  const [error, setError] = useState();
  const min_length = 5;
  const max_length = 20;

  const handlePasswordChange = (e, type) => {
    const newValue = e.target.value;
    handleChangeInput(e, type);
  };

  const checkInput = () => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (!password) {
      setError("رمز عبورت کو پس؟ بدون اون که نمی‌شه وارد شد");
      return;
    } else if (!haveAccount && (confirmPassword !== password)) {
      setError('تکرار پسورد و پسوردت با هم فرق داره. دقت کن')
    } else {
      setError("");
      handleClickButton();
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-end items-center text-base text-neutral-700 font-semibold mb-5'>
          <p className='flex gap-1'>
            {haveAccount ?
              "تو قبلا ثبت نام کردی، رمزعبورت رو وارد کن تا وارد سایت بشی" :
              "تو قبلا ثبت نام نکردی، اول یه پسورد وارد کن"}
            <span>،{data.username}</span> <br />
          </p>
          <span className='text-2xl'>✨</span>
        </div>
        {
          haveAccount && (
            <>
              <FloatPassword label="رمزعبور" value={data.password}
                onChange={(e) => handlePasswordChange(e, 'password')}
              />
              <div className='h-6'>
                {
                  (error || errorMessage) && (
                    <>
                      {
                        error && (
                          <>
                            <p className='text-sm text-right pt-1 px-1 text-red-500 font-semibold'>
                              {error}
                            </p>
                            <span>
                              ‼️
                            </span>
                          </>
                        )
                      }{
                        errorMessage && (
                          <div className='flex justify-end gap-0.5'>
                            <p className='text-sm text-right pt-1 px-1 text-red-500 font-semibold' dir='rtl'>
                              {errorMessage}
                            </p>
                            <span>
                              ‼️
                            </span>
                          </div>
                        )
                      }
                    </>
                  )
                }
              </div>
            </>
          )
        }
        {
          !haveAccount && (
            <>
              <FloatPassword label="رمزعبور" value={data.password}
                onChange={(e) => handlePasswordChange(e, 'password')}
              />
              <FloatPassword label="تکرار رمزعبور" value={data.confirmPassword}
                onChange={(e) => handlePasswordChange(e, 'confirmPassword')}
              />
              <div className='h-6'>
                {
                  (error || errorMessage) && (
                    <>
                      {
                        error && (
                          <>
                            <p className='text-sm text-right pt-1 px-1 text-red-500 font-semibold'>
                              {error}
                            </p>
                            <span>
                              ‼️
                            </span>
                          </>
                        )
                      }{
                        errorMessage && (
                          <>
                            <p className='text-sm text-right pt-1 px-1 text-red-500 font-semibold'>
                              {errorMessage}
                            </p>
                            <span>
                              ‼️
                            </span>
                          </>
                        )
                      }
                    </>
                  )
                }
              </div>
            </>

          )
        }

      </div>
      <button
        type="submit"
        onClick={checkInput}
        className="bg-purple-600 rounded-lg text-[16px] font-medium w-full shadow-lg hover:bg-purple-700 text-white py-2 transition-all duration-300"
      >
        ورود
      </button>
    </div>
  )
}

export default Step2;
