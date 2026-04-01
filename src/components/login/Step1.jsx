import React, { useState } from 'react';
import FloatInput from '../input/FloatInput';
import { Link } from 'react-router-dom';

function Step1({ data, handleChangeInput, handleClickButton }) {
    const [error, setError] = useState();
    const min_length = 4;
    const max_length = 18;

    const handleUsernameChange = (e) => {
        const newValue = e.target.value;
        handleChangeInput(e, "username");
    };


    const checkInput = () => {
        const username = data.username;

        if (!username) {
            setError("هی! اول یه نام کاربری خوشگل برامون بنویس");
            return;
        } else if (username.length < min_length) {
            setError(` خیلی کوتاهه! حداقل ${min_length - username.length} حرف دیگه لازمه `);
            return;
        } else if (username.length > max_length) {
            setError(`وای! نام کاربری طولانی شد! نهایت ${max_length} حرف جا داره`);
            return;
        } else {
            setError("");
            handleClickButton();
        }
    }

    return (
        <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-1'>
                <FloatInput label="نام کاربری" value={data.username} required={true}
                    onChange={(e) => handleUsernameChange(e)}
                />
                <div className='h-6'>
                    {
                        error && (
                            <p className='text-sm text-right pt-1 px-1 text-red-500 font-medium'>
                                {error}
                            </p>
                        )
                    }
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <button
                    type="submit"
                    onClick={checkInput}
                    className={`bg-purple-500  rounded-lg text-[16px] font-medium w-full
                         hover:bg-purple-700 text-white py-2 transition-all duration-300`}
                >
                    ورود
                </button>
                <Link>
                    <button
                        type="submit"
                        className="bg-purple-700 rounded-lg text-[16px]
                 flex flex-row-reverse justify-center gap-1 
                 font-medium w-full hover:bg-purple-700 text-white py-2
                  transition-all duration-300"
                    >
                        ورود با
                        <span>Souperlopers</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Step1;
