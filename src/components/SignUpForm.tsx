
import { SignUpInputFields } from "../protocols/auth";
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from "./Button";
import { User, EnvelopeSimple, Phone, Key, GenderNeuter, Calendar } from "@phosphor-icons/react";
import Input from "./Input";
import Select from './Select'
import { useYupValidationResolver } from "@/hooks/yupValidationResolver";
import { signupSchema } from "../schemas/signup";
import { Form } from "./Form";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomizedSnackbars from "./Snackbar";

export default function SignUpForm() {
    const resolver = useYupValidationResolver(signupSchema)
    const { register, watch, handleSubmit, formState: { errors } } = useForm<SignUpInputFields>({ resolver });
    const [image, setImage] = useState<Blob | MediaSource>()
    const [openSnackbar, setOpenSnackBar] = useState(false)


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };


    const onSubmit: SubmitHandler<SignUpInputFields> = async (data: SignUpInputFields) => {
        const date = new Date(data.birthDate).toLocaleString('pt-BR', { dateStyle: 'short', timeZone: 'UTC' })
        const { passwordConfirmation, image, ...body } = data
        body.birthDate = date

        if (image[0].size > 1024 * 1024) {
            alert("Tamanho do arquivo deve ser menor que 1 MB")
        } else {
            const formData = new FormData();

            for (const key in body) {
                formData.append(key, body[key])
            }

            formData.append("image", image[0])

            try {
                const res = await axios.post("http://localhost:4000/auth/signup", formData)
                console.log(res.data)
            } catch (error: any) {
                error.response?.status === 409 && setOpenSnackBar(true);

            }
        }
    };

    function avoidSpaces(event: any): boolean {
        const key = event.key
        if (key === ' ' || key === 'Tab') {
            event.preventDefault();
            return false;
        }
        return true;
    }

    useEffect(() => {
        setImage(watch("image")[0])
    }, [watch("image")])


    return (
        <>
            <CustomizedSnackbars severity="error" open={openSnackbar} message="Usuário com email já existente" handleClose={handleClose} />
            <div className="flex flex-col items-center">
                    <img className="w-[120px] h-[120px] rounded-full" src={image ? URL.createObjectURL(image) : '/user-profile.png'} />
                    <Input id="image" name="image" inputTitle="Sua foto de perfil (max. 1MB)" register={register} errors={errors} type="file" required />
                </div>
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center" >
                <div className="grid gap-4 sm:grid-cols-2 mt-2 w-full">
                    <Input id="firstname" autoComplete="off" inputTitle="Nome" onKeyDown={(e) => avoidSpaces(e)} inputIcon={<User size={16} />} register={register} errors={errors} />
                    <Input id="surname" inputTitle="Sobrenome" onKeyDown={(e) => avoidSpaces(e)} inputIcon={<User size={16} />} register={register} errors={errors} />
                    <Select id="gender" selectTitle="Gênero" selectIcon={<GenderNeuter  size={16} />} options={["Masculino", "Feminino", "Outro"]} register={register} errors={errors} />
                    <Input id="birthDate" inputTitle="Data de Nascimento" inputIcon={<Calendar size={16} />} type="date" register={register} errors={errors} />
                    <Input id="email" inputTitle="Email" inputIcon={<EnvelopeSimple size={16} />} register={register} errors={errors} />
                    <Input id="phone" inputTitle="Telefone" inputIcon={<Phone size={16} />} register={register} errors={errors} />
                    <Input id="password" inputTitle="Senha" inputIcon={<Key size={16} />} type="password" register={register} errors={errors} />
                    <Input id="passwordConfirmation" inputTitle="Confirmar Senha" inputIcon={<Key size={16} />} type="password" register=

                        {register} errors={errors} />
                </div>
                
                <Button type="submit">Cadastrar-se</Button>
            </Form>
        </>
    )

}