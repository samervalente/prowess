
import { Warning } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id:string;
    inputTitle: string;
    inputIcon?: JSX.Element;
    register: UseFormRegister<any>
    errors: FieldErrors | undefined;
    [x: string]: any
}

export default function Input({ id, inputTitle, inputIcon, register, errors, ...rest }: InputProps) {
    return (
        <div>
            <label className="text-[12px] text-gray-300">{inputTitle}</label>
            <div className=" flex items-center h-[30px] rounded-[4px] border-[1px] border-gray-600 ">
                <div className="p-1 text-gray-500">
                    {inputIcon}
                </div>
                <input id={id}  {...register(id)} {...rest} className="h-[100%] flex-grow bg-inherit outline-none pl-1 text-[12px] text-gray-400" />
            </div>
            <span className="flex items-center gap-x-1 text-[14px] text-red-500">
           
            {errors && errors[id]?.message && <>
                <Warning size={16} color="#ff0000" weight="fill" />
                {JSON.stringify(errors && errors[id]?.message).replaceAll('"', '')}
            </>}
            </span>

        </div >
    )
}