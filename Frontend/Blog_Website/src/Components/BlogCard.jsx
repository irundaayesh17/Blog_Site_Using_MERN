import React from 'react'

export default function BlogCard() {
  return (
    <div className='flex gap-10 items-center p-4 bg-slate-100 mb-4 w-[670px]  justify-between rounded-lg mt-7'>
        <div className='Left-section'>
            <div className='UserName text-sm mb-3 font-medium text-gray-500'>
                <h1>Ayesh Perera</h1>
            </div>
            <div className='BlogData mb-2'>
                <div className='BlogTitle mb-2 text-2xl font-bold'>
                    <h1>How to Make $1M + per Year with 0 Skills</h1>
                </div>
                <div className='BlogDescription text-gray-500 font-medium'>
                    <p>Dhammika Perera, Who got 0 skills became a billionire wit</p>
                </div>
            </div>
            <div className='BlogFooter'>
                <div className='BlogDate text-sm font-medium text-gray-500'>
                    <p>Aug 12</p>
                </div>
            </div>
        </div>
        <div className='Right-section'>
            <div className='BlogImage'>
                <img src='src/assets/OIP.jpg' className='w-48 h-[140px] size-fit'/>
            </div>
        </div>
    </div>
  )
}
