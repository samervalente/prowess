import * as yup from 'yup'

export const signInSchema = yup.object({
    email: yup.string().email("Insira um email válido").required("Email é obrigatório"),
    password: yup.string().min(8, "Mínimo 8 caracteres").required("Senha é obrigatória"),  
})