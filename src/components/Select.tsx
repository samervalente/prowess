import { PropsWithChildren } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SelectProps extends PropsWithChildren {
    id:string;
    options: string[];
    selectTitle?: string;
    selectIcon?: JSX.Element;
    initialValue?: string;
    register: UseFormRegister<any>
    errors: FieldErrors | undefined;
}

export default function Select({ id, options, selectTitle, register, selectIcon, initialValue, ...rest }: SelectProps) {
    return (
        <div>
            <span className="text-[12px] text-gray-300 mb-4">{selectTitle}</span>
            <div className=" flex items-center h-[30px] rounded-[4px] border-[1px] border-gray-600 ">
                <div className="p-1 text-gray-500">
                    {selectIcon}
                </div>
                <select {...register(id)}  {...rest} className="w-full [&>option]:text-gray-700  [&>option]:rounded-none  text-gray-300 text-[12px] bg-inherit outline-none">
                    <option value="none" selected disabled hidden>{initialValue}</option>
                    {options?.map(value => <option className='rounded-none' key={value} value={value}>{value}</option>)}
                </select>

            </div>
        </div>

    )
}