import React from 'react'

export default function RegisterForm() {
  return (
    <div className='shadow-md p-20'>
        <h1 className='text-5xl font-bold'>Create Account</h1>
        <p className='text-gray-500 font-medium mt-3'>Register to the Knowledge</p>
        <div className='mt-8'>
            <div className='flex gap-4'>
                <div>
                    <input type='text' id='first-name' className='w-full p-3 border border-gray-300 mt-2  rounded-xl' placeholder='First Name'/>
                </div>
                <div>
                    <input type='text' id='last-name' className='w-full p-3 border border-gray-300 mt-2  rounded-xl' placeholder='Last Name'/>
                </div>
            </div>
            <div className='mt-2'>
                <input type='email' id='email' className='w-full p-3 border border-gray-300 mt-2  rounded-xl' placeholder='Enter your Email'/>
            </div>
            <div className='mt-2'>
                <input type='password' id='password' className='w-full p-3 border border-gray-300 mt-2  rounded-xl' placeholder='Enter your Password'/>
            </div>
            <div className='mt-2'>
                <input type='password' id='confirm-password' className='w-full p-3 border border-gray-300 mt-2  rounded-xl' placeholder='Enter your Password'/>
            </div>
            <div className='mt-4 flex justify-between items-center'>
                <div>
                    <input type='checkbox' id='remember' className='mr-2'/>
                    <label for='remember' className='text-base font-medium'>Remember me</label>
                </div>
                
            </div>
            <div className='mt-8 flex flex-col'>
                <button className='bg-blue-primary text-white text-lg font-bold py-3 rounded-3xl active:scale-[.99] active:duration-100 transition-all'> Sign up</button>
                <button className='flex items-center justify-center gap-2 mt-4 border-2 py-2 rounded-3xl'>
                    <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='google' className='w-8 h-8'/>
                    Sign up with Google</button>
            </div>
        </div>
    </div>
  )
}
