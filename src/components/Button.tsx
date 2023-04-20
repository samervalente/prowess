import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren{
    [x:string]: any
    width?: string
}

export default function Button({children, width, ...otherProps}: ButtonProps){
    return (
        <button {...otherProps} className={`h-[38px] hover:bg-blue-main transition-all w-full ${width} duration-[0.4s]  mt-4 rounded-md border-none bg-blue-700`}>
            {children}
        </button>
    )
}