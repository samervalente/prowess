import { PropsWithChildren } from "react";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export default function Auth({children}: PropsWithChildren){
    return (
        <div className={`md:w-[50%] m-[0_auto] flex flex-col ${inter.className}`}>
            {children}
        </div>
    )
}