import React from 'react'
import NewlyPublished from './NewlyPublished'

export default function NewlyPublishedList() {
  return (
    <div>
        <div>
            <h1 className='text-[17px] font-semibold text-black mb-5'>Newly Published</h1>
            <NewlyPublished/>
            <NewlyPublished/>
            <NewlyPublished/>
        </div>
    </div>
  )
}
