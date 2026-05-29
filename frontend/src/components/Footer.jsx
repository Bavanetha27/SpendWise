import React from 'react'
import { HiOutlineHeart } from 'react-icons/hi2'

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0B0C10] border-t border-gray-100 dark:border-gray-800 transition-colors duration-500 py-8 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
         <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
           Crafted with <HiOutlineHeart className="text-red-500 fill-red-500/20" /> using React, Tailwind & AI
         </div>
         <p className="text-sm text-gray-400 dark:text-gray-500">
           © {new Date().getFullYear()} SpendWise. All rights reserved.
         </p>
      </div>
    </footer>
  )
}

export default Footer

