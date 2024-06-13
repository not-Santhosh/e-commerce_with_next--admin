import '../globals.css'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "Admin Authorization",
  description: "Authorization page for admins to access GoodTime"
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}