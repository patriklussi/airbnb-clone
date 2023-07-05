import './globals.css'
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import { Nunito } from "next/font/google"
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
const font = Nunito({
  subsets: ["latin"],
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser  = await getCurrentUser();
 
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body 
      className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal/>
          <RegisterModal/>
          <RentModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
