import '../globals.css'
import { Metadata } from 'next'

import LeftSideBar from '@/components/layouts/LeftSideBar'
import TopBar from '@/components/layouts/TopBar'
import { ToastProvider } from '@/lib/ToastProvider'

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard page for admins to access GoodTime"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <ToastProvider />
          <div className='flex max-lg:flex-col text-grey-1'>
            <LeftSideBar />
            <TopBar />
            <div className='flex-1'>
              {children}
            </div>
          </div>
        </body>
      </html>
  )
}