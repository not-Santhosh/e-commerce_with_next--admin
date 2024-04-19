"use client";


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'

const LeftSideBar = () => {
  const Pathname = usePathname();

  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden'>
        <Image src="/logo.png" alt="logo" width={150} height={70} />
        <div className='flex flex-col gap-12'>
            {navLinks.map((link) => {
                return <Link  href={link.url} key={link.label} className={`flex gap-4 text-body-medium ${Pathname === link.url ? `text-blue-1` : `text-grey-1`}`}>{link.icon}<p>{link.label}</p></Link>
            })}
        </div>
        <div className='flex gap-4 text-body-medium items-center'>
            <UserButton />
            <p>Edit Profile</p>
        </div>
    </div>
  )
}

export default LeftSideBar
