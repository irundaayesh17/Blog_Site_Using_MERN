import React from 'react'
import BlogList from '../Components/BlogList'
import NewlyPublishedList from '../Components/NewlyPublishedList'

export default function Home() {
  return (
    <div>
        <div className='flex'>
            <BlogList/>
            <div className='border-l ml-16'></div>
            <div className='flex-1 ml-8 mt-9'>
                <NewlyPublishedList/>
            </div>
        </div>    
    </div>
  )
}
