import React from 'react'
import LoadingPage from '../Components/LoadingPage'
import RegisterForm from '../Components/RegisterForm'

export default function Register() {
  return (
    <div>
      <div className='flex w-full h-screen'>
          <div className=' w-full lg:w-2/3 flex items-center justify-center bg-white'>
              <RegisterForm/>
          </div>  
          <div className='hidden lg:flex items-center  justify-center lg:w-1/3 '>
              <LoadingPage/>
          </div>
      </div>
    </div>
  )
}
