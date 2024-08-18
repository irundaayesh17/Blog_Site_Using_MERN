import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header'
import BlogCard from './Components/BlogCard'
import BlogList from './Components/BlogList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex'>
      <Header/>
      <div className='flex-1 ml-80 p-4 transition-all duration-200'>
          <Routes>
            <Route path='/' element={<BlogList/>}/>
            {/* Add more routes here as needed */}
          </Routes>
        </div>
    </div>
    </>
  )
}

export default App
