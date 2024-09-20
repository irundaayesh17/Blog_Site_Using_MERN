import React from 'react'
import loadergif from '../assets/animate2.json' // Path to the gif file
import Lottie from 'lottie-react'

export default function LoadingSpinner() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center relative overflow-hidden'>
      {/* Replace spinner with loader.gif */}
      <Lottie
        animationData={loadergif}
        loop={true}
        className='w-40 h-40' // Adjust size if necessary
      />
    </div>
  )
}
