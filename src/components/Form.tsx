import { SignUpInputFields } from "@/protocols/auth";
import React from "react";
import { useForm } from "react-hook-form";

export function Form({ defaultValues, children, resolver, onSubmit, ...otherProps }: any) {
  const { handleSubmit, register } = useForm<SignUpInputFields>({defaultValues, resolver});

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...otherProps}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child;
          })
        : children}
    </form>
  );
}


