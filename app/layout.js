import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'Gabrielle Johnson',
  description: 'Software Engineer Portfolio',
  icons: {
    icon: '/GJ.png',
    apple: '/GJ.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}