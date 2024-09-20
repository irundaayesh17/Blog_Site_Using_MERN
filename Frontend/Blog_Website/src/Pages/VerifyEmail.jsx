import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from "react-hot-toast";
import { useAuthStore } from '../Store/authStore.js'

export default function VerifyEmail() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([])
    const navigate = useNavigate()
    const {error, isLoading, verifyEmail} = useAuthStore()



    const handleChange = (index, value) => {
        const newCode = [...code]
        //handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split('');
            for (let i=0;i<6; i++){
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode);
            //focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value
            setCode(newCode)

            //focus on the next input or the previous one
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const verificationCode = code.join('')
        try{
            await verifyEmail(verificationCode)
            navigate('/')
            toast.success('Email Verified Successfully')
        }
        catch(error){
            console.log(error)

        }
        
    };

    //auto submit when all fileds filled
    useEffect(() => {
        if (code.every(digit => digit !=='')) {
            handleSubmit(new Event('submit'));
        }
    }, [code])

  return (
    <div className='w-3/4 h-screen flex items-center justify-center bg-white  backdrop-filter backdrop-blur-lg'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='w-[500px] px-10 py-10 bg-white rounded-xl shadow-lg'>
                <h2 className='text-3xl font-bold text-center text-black'>Verify Email</h2>
                <p className='text-center text-gray-400'>Enter the verification code sent to your email</p>
                <form className='space-y-6 mt-5' onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input 
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-12 text-center font-bold bg-white text-black border-black border-2 rounded-lg focus:outline-none focus:border-blue-primary'
                            />
                        ))}
                    </div>
                    {error && <p className='text-red-500 font-semibold text-center'>{error}</p>}
                    <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
                        disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-blue-primary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-primary focus:outline-none focus:ring-2 focus:to-blue-700 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
                </form>
            </motion.div>
        </div>
  )
}
