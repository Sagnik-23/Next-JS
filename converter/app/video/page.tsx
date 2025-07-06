"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const CondensedVideo = dynamic(() => import('./_components/CondenserVideo'),{
  ssr: false,
})

const Video = () => {
  return (
    <div className='text-white pt-32 mx-auto max-w-5xl'>
      <div className='lg:grid lg:grid-cols-8 gap-10 lg:h-[calc(100dvh-130px)] pb-10 px-6 lg:px-0 flex flex-col'>
        <CondensedVideo />
      </div>
    </div>
  )
}

export default Video