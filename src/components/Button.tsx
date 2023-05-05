import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren{
    [x:string]: any
    width?: string
}

export default function Button({children, width, ...otherProps}: ButtonProps){
    return (
        <button {...otherProps} className={`h-[38px] my-3 hover:bg-blue-main transition-all w-max px-4 ${width} duration-[0.4s] rounded-md border-none bg-blue-700`}>
            {children}
        </button>
    )
}