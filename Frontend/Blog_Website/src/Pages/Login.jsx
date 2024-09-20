import React from 'react'
import LoginForm from '../Components/LoginForm'
import LoadingPage from '../Components/LoadingPage'

export default function Login() {
  return (
    <div>
      <div className='flex w-full h-screen'>
          <div className=' w-full lg:w-3/4 flex items-center justify-center bg-white'>
              <LoginForm/>
          </div>  
      </div>
    </div>
  )
}
