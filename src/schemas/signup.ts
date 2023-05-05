import * as yup from 'yup'

export const signupSchema = yup.object({
    firstname: yup.string().min(3, "Mínimo 3 caracteres").required("Campo obrigatório"),
    surname: yup.string().required("Campo obrigatório"),
    gender: yup.string().required("Campo obrigatório"),
    birthDate: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Insira um email válido").required("Campo obrigatório"),
    phone: yup.string().matches(/^(\([1-9]{2}\)|[1-9]{2})\s?([9]{1})?\s?[0-9]{4}\-?[0-9]{4}$/, "Telefone inválido").required("Campo obrigatório"),
    password: yup.string().min(8, "Mínimo 8 caracteres").required("Campo obrigatório"),
    passwordConfirmation: yup.string().required("Campo obrigatório").oneOf([yup.ref('password')], "Senhas não conferem.")
})