import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyEmail from './Pages/VerifyEmail';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CreateBlog from './Pages/CreateBlog';
import { useAuthStore } from './Store/authStore';
import LoadingSpinner from './Components/LoadingSpinner';

//redirect authenticated users to home page
const RedirectAuthenticated = ({children}) => {
  const {isAuthenticated, user} = useAuthStore()
  if(isAuthenticated && user.isVerified) 
  {
    return <Navigate to='/' replace/>
  }
  return children
}

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore()
  if(!isAuthenticated) 
  {
    return <Navigate to='/login' replace/>
  }
  if(!user.isVerified)
  {
    return <Navigate to='/verify-email' replace/>
  }
  return children
}

function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore()
  const [count, setCount] = useState(0)
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(isAuthenticated, user)
  if(isCheckingAuth) return <LoadingSpinner/>
  return (
    <>
    <div className='flex'>
      <Header/>
      <div className='flex-1 ml-80 p-4 transition-all duration-200'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<RedirectAuthenticated> <Login/> </RedirectAuthenticated>}/>
            <Route path='/register' element={<RedirectAuthenticated> <Register/> </RedirectAuthenticated>}/>
            <Route path='/verify-email' element={<VerifyEmail/>}/>
            <Route path='/create' element={<ProtectedRoute> <CreateBlog/> </ProtectedRoute>}/>
            {/* Add more routes here as needed */}
          </Routes>
          <Toaster />
        </div>
    </div>
    </>
  )
}

export default App
