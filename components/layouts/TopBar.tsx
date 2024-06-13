"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation';

import { navLinks } from '@/lib/constants'


const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const Pathname = usePathname();
  return (
    <div className="sticky w-full px-8 flex justify-between items-center bg-blue-2 shadow-xl z-20 top-0 py-4 lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className='flex gap-8 max-md:hidden'>
        {navLinks.map((link) => {
          return <Link href={link.url} key={link.label} className={`flex gap-4 text-body-medium ${Pathname === link.url ? `text-blue-1` : `text-grey-1`}`}><p>{link.label}</p></Link>
        })}
      </div>
      <div className='relative flex gap-4 items-center'>
        <Menu className='cursor-pointer md:hidden' onClick={() => setDropdownMenu(!dropdownMenu)} />
        {dropdownMenu &&
          <div className='absolute top-10 right-0 flex flex-col gap-8 p-5 bg-white rounded-lg'>
            {navLinks.map((link) => {
              return <Link href={link.url} key={link.label} className={`flex gap-4 text-body-medium ${Pathname === link.url ? `text-blue-1` : `text-grey-1`}`}>{link.icon}<p>{link.label}</p></Link>
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default TopBar
