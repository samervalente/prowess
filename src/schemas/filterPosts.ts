import * as yup from 'yup'


export const filterPostSchema = yup.object({
    state: yup.string().required("Selecione pelo menos o estado de destino")
})