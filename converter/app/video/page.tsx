"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const CondensedVideo = dynamic(() => import('./_components/CondenserVideo'),{
  ssr: false,
})

const Video = () => {
  return (
    <div className="text-white pt-24 px-4 lg:px-8 bg-slate-900 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-7xl">
        <CondensedVideo />
      </div>
    </div>
  );
};


export default Video