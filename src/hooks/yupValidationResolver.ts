import * as yup from "yup";
import { useCallback } from "react";

interface FormValues {
  [key: string]: any;
}

interface ValidationResult {
  values: FormValues;
  errors: {
    [key: string]: {
      type: string;
      message: string;
    };
  };
}

export const useYupValidationResolver = (validationSchema: yup.Schema<FormValues>) =>
  useCallback(
    async (data: FormValues): Promise<ValidationResult> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (error: yup.ValidationError | any) {
        return {
          values: {},
          errors: error.inner.reduce(
            (allErrors: {[key: string]: {type: string; message: string}}, currentError: yup.ValidationError | any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
