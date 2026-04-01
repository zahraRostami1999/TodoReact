import React, { useState } from 'react';
import GetUsername from '../components/login/GetUsername';
import GetPassword from '../components/login/GetPassword';
import Auth from '../services/API'

function LoginPage() {
  const [step, setStep] = useState(1);
  const [haveAccount, setHaveAccount] = useState(false);
  const [userInput, setUserInput] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState();

  async function handleCheckUsername(){
    const userExists = await Auth.checkUserName(userInput.username)
    setHaveAccount(userExists)
    setStep(2)
  }

  async function handleLoginBtn(){
    if (userInput.username && userInput.password) {
      const response = await Auth.login(haveAccount, userInput.username, userInput.password);
      setError(response.message)        
      if (response) {
        localStorage.setItem("refresh", response.refresh_token);
        localStorage.setItem("access", response.access_token);
        if (localStorage.getItem("refresh") === response.refresh_token &&
          localStorage.getItem("access") === response.access_token) {
          setTimeout(() => {
            window.location.href = "/todo";
          }, 1000);
        }
      }
    }
  }

  function handleChangeInput(newValue, key) {
    setUserInput((prev) => ({ ...prev, [key]: newValue }))
  }

  return (
    <div className='w-full min-h-screen
     flex justify-center items-center
     bg-gradient-to-br from-purple-50 to-purple-400'>
      <div className='lg:w-2/5 md:w-1/2 sm:w-4/5 bg-white/70 shadow-lg rounded-lg lg:py-16 lg:px-5 sm:px-3 sm:py-10'>
        <header className='mb-10'>
          <h1 className='lg:font-extrabold lg:text-4xl
          sm:font-bold sm:text-2xl
           text-neutral-700 text-center'>
            😡 HISTX ToDo list 😇
          </h1>
        </header>
        <main className='flex flex-col gap-10'>
          {step === 1 && (
            <GetUsername userInput={userInput} handleChangeInput={handleChangeInput} handleClickButton={handleCheckUsername} />
          )}
          {
            step === 2 && (
              <GetPassword userInput={userInput} haveAccount={haveAccount} errorMessage={error} handleChangeInput={handleChangeInput} handleClickButton={handleLoginBtn} />
            )
          }
        </main>
      </div >
    </div >
  )
}

export default LoginPage;
