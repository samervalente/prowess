
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
import Image from "next/image";
import { useRouter } from "next/router";


export default function SignUpForm() {
    const resolver = useYupValidationResolver(signupSchema)
    const { register, watch, handleSubmit, formState: { errors } } = useForm<SignUpInputFields>({ resolver,  });
    const [image, setImage] = useState<Blob | MediaSource>()
    const [openSnackbar, setOpenSnackBar] = useState(false)
    const router = useRouter();

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
        if (image[0]?.size > 1024 * 1024) {
            alert("Tamanho do arquivo deve ser menor que 1 MB")
        } else {
            const formData = new FormData();

            for (const key in body) {
                formData.append(key, body[key])
            }

            formData.append("image", image[0])

            try {
                const res = await axios.post("http://localhost:4000/auth/signup", formData)
                if(res.data.statusCode === 201){
                    router.push("/auth/signin")
                }
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

            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center" >
                <div className="flex flex-col items-center">
                    <Image className="rounded-full" src={image ? URL.createObjectURL(image) : '/user-profile.png'} alt="user-profile" width={80} height={60} />
                    <Input id="image" name="image" inputTitle="Sua foto de perfil (max. 1MB)" register={register} errors={errors} type="file" accept="image/*" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 mt-2 w-full">
                    <Input id="firstname" autoComplete="off" defaultValue={"Samer"} inputTitle="Nome" onKeyDown={(e) => avoidSpaces(e)} inputIcon={<User size={16} />} register={register} errors={errors} />
                    <Input id="surname" inputTitle="Sobrenome" defaultValue={"Valente"}  onKeyDown={(e) => avoidSpaces(e)} inputIcon={<User size={16} />} register={register} errors={errors} />
                    <Select id="gender" selectTitle="Gênero" initialValue="Masculino" defaultValue="Masculino"  selectIcon={<GenderNeuter size={16} />} options={["Masculino", "Feminino", "Outro"]} register={register} errors={errors} />
                    <Input id="birthDate" inputTitle="Data de Nascimento" defaultValue="2003-05-02" inputIcon={<Calendar size={16} />} type="date" register={register} errors={errors} />
                    <Input id="email" inputTitle="Email" defaultValue={"samervalente21323@gmail.com"} inputIcon={<EnvelopeSimple size={16} />} register={register} errors={errors} />
                    <Input id="phone" inputTitle="Telefone" defaultValue="91988580205" inputIcon={<Phone size={16} />} register={register} errors={errors} />
                    <Input id="password" inputTitle="Senha" defaultValue="12345678" inputIcon={<Key size={16} />} type="password" register={register} errors={errors} />
                    <Input id="passwordConfirmation" inputTitle="Confirmar Senha" defaultValue="12345678" inputIcon={<Key size={16} />} type="password" register=

                        {register} errors={errors} />
                </div>

                <Button type="submit">Cadastrar-se</Button>
            </Form>
        </>
    )

}