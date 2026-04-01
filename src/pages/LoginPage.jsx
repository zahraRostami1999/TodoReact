import React, { useState } from 'react';
import Step1 from '../components/login/Step1';
import Step2 from '../components/login/Step2';
import { checkUserName, login } from '../services/API';
import { startAutoRefresh } from '../services/API';

function LoginPage() {
  const [step, setStep] = useState(1);
  const [haveAccount, setHaveAccount] = useState(false);
  const [data, setData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState();

  const handleCheckUsername = async () => {
    try {
      if (data.username) {
        const response = await checkUserName(data.username);
        setHaveAccount(response.user_exists);
        setStep(2);
      }
    } catch {
      console.log("Error checking username");
    }
  }
  // startAutoRefresh();
  const handleLoginBtn = async () => {
    try {
      if (data.username && data.password) {
        const response = await login(haveAccount, data.username, data.password);
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
    } catch (error) {
      console.log("Error in login/signup");
    }
  };  

  const handleChangeInput = (e, key) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value
    }));
  };

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
            <Step1 data={data} handleChangeInput={handleChangeInput} handleClickButton={handleCheckUsername} />
          )}
          {
            step === 2 && (
              <Step2 data={data} haveAccount={haveAccount} errorMessage={error} handleChangeInput={handleChangeInput} handleClickButton={handleLoginBtn} />
            )
          }
        </main>
      </div >
    </div >
  )
}

export default LoginPage;
