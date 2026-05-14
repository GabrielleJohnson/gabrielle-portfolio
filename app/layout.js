import { Changa_One } from 'next/font/google'
import './globals.css'

const changaOne = Changa_One({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Gabrielle Johnson Portfolio',
  description: 'QA Engineer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={changaOne.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}