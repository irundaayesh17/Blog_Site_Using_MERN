import { useState } from 'react'
import React from 'react'
import {motion} from 'framer-motion'
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore.js';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signin, isLoading, error } = useAuthStore();


    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(`Logging in with ${email} and ${password}`);
        await signin(email, password);
    }

  return (
    <motion.div initial={{opacity: 0,y:20}} animate={{opacity: 1,y:0}} transition={{duration: 0.5}} className='shadow-md px-20 py-10'>
        <h1 className='text-5xl font-bold'>Welcome Back</h1>
        <p className='text-gray-500 font-medium mt-3'>Login to your account</p>
        <form onSubmit={handleLogin} className='mt-8'>
            <div>
                <label htmlFor='email' 
                className='block text-lg font-medium'>Email</label>
                <input type='email' 
                id='email' 
                className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mt-2'>
                <label htmlFor='password' 
                className='block text-lg font-medium'>Password</label>
                <input type='password' 
                id='password' 
                className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='mt-4 flex justify-between items-center'>
                <div>
                    <input 
                    type='checkbox' 
                    id='remember' 
                    className='mr-2'/>
                    <label 
                    htmlFor='remember' 
                    className='text-base font-medium'>Remember me</label>
                </div>
                <button 
                className='font-medium text-base text-blue-primary'>Fotgot Password</button>
            </div>
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            <div className='mt-8 flex flex-col'>
                <motion.button 
                type='submit'
                className='w-full bg-blue-primary text-white py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                focus:ring-offset-white transition duration-200 hover:bg-blue-700 text-lg font-bold'
                whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} disabled={isLoading}
                >{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> : 'Sign in'}</motion.button>    
                <button className='flex items-center justify-center gap-2 mt-4 border-2 py-2 rounded-3xl'>
                    <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='google' className='w-8 h-8'/>
                    Sign in with Google</button>
            </div>
            <div className='flex justify-center mt-5'>
                <p className='text-base font-semibold'>
                    Don't have an account?{" "}
                    <Link to={"/register"} className='text-blue-primary hover:underline'>Register</Link>
                </p>
            </div>
        </form>
    </motion.div>
  )
}
