import { PropsWithChildren } from "react";

interface SocialLabelProps extends PropsWithChildren {
    [x: string]: any
}


export default function SocialLabel({children, ...rest}: SocialLabelProps){
    return (
        <button {...rest} className="bg-gray-700 h-[40px]  flex items-center justify-center py-1 cursor-pointer hover:opacity-50 transition-all duration-[0.3s] rounded-md flex-grow md:flex-grow-[0.2]">
            {children}
        </button>
    )
}