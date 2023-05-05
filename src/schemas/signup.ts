import * as yup from 'yup'

export const signupSchema = yup.object({
    firstname: yup.string().min(3, "Mínimo 3 caracteres").required("Nome é obrigatório"),
    surname: yup.string().required("Sobrenome é obrigatório"),
    gender: yup.string().required("Gênero é obrigatório"),
    birthDate: yup.string().required("Data de nascimento é obrigatória"),
    email: yup.string().email("Insira um email válido").required("Email é obrigatório"),
    phone: yup.string().matches(/^(\([1-9]{2}\)|[1-9]{2})\s?([9]{1})?\s?[0-9]{4}\-?[0-9]{4}$/, "Telefone inválido").required("Telefone é obrigatório"),
    password: yup.string().min(8, "Mínimo 8 caracteres").required("Senha é obrigatória"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], "Senhas não conferem.")
})