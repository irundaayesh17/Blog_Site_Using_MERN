import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { Form, Link } from 'react-router-dom'
import PasswordStrengthMeter from './PasswordStrengthMeter'
import {useNavigate} from 'react-router-dom'
import {Loader} from 'lucide-react'
import {useAuthStore} from '../Store/authStore.js'


export default function RegisterForm() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(firstname, lastname, email, password);
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <motion.div initial={{opacity: 0,y:20}} animate={{opacity: 1,y:0}} transition={{duration: 0.5}} className='shadow-md px-20 py-10'>
        <h1 className='text-5xl font-bold'>Create Account</h1>
        <form className='mt-4' onSubmit={handleSignup}>
            <div className='flex gap-[8px]'>
                <div>
                    <input type='text' 
                    id='first-name' 
                    className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                    placeholder='First Name' 
                    value={firstname} 
                    onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <input type='text' 
                    id='last-name' 
                    className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                    placeholder='Last Name' 
                    value={lastname} 
                    onChange={(e) => setLastName(e.target.value)}/>
                </div>
            </div>
            <div className='mt-[2px]'> 
                <input type='email' 
                id='email' 
                className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                placeholder='Email Address' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mt-[2px]'>
                <input type='password' 
                id='password' 
                className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                placeholder='Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='mt-[2px]'>
                <input type='password' 
                id='confirm-password' 
                className='w-full p-3 border border-gray-300 mt-2  rounded-xl' 
                placeholder='Confirm Password'/>
            </div>
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            {/*Password Strength Meter*/}
            <PasswordStrengthMeter password={password}/>
            <div className='mt-8 flex flex-col'>
                <motion.button 
                className='w-full bg-blue-primary text-white py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                focus:ring-offset-white transition duration-200 hover:bg-blue-700 text-lg font-bold'
                whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} type='submit' disabled={isLoading}
                >{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> : 'Sign up'}</motion.button>               
                <button className='flex items-center justify-center gap-2 mt-4 border-2 py-2 rounded-3xl'>
                        <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='google' className='w-8 h-8'/>
                        Sign up with Google
                </button>
            </div>
            <div className='flex justify-center mt-5'>
                <p className='text-base font-semibold'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-blue-primary hover:underline'>Login</Link>
                </p>
            </div>
        </form>
    </motion.div>
  )
}
