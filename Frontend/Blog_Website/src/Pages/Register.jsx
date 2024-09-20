import React from 'react'
import LoadingPage from '../Components/LoadingPage'
import RegisterForm from '../Components/RegisterForm'

export default function Register() {
  return (
    <div>
      <div className='flex w-full h-screen'>
          <div className=' w-full lg:w-3/4 flex items-center justify-center bg-white'>
              <RegisterForm/>
          </div>  
      </div>
    </div>
  )
}
