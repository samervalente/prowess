import { SignUpInputFields } from "../../protocols/auth";
import Auth from "@/components/Auth";
import Header from "@/components/Header";
import { EnvelopeSimple, Key } from "@phosphor-icons/react";
import Link from "next/link";
import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/UserContext";
import { useYupValidationResolver } from "@/hooks/yupValidationResolver";
import { signInSchema } from "@/schemas/signin";
import { Form } from "@/components/Form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignIn() {
    const resolver = useYupValidationResolver(signInSchema)
    const { register, watch, handleSubmit, formState: { errors } } = useForm<SignUpInputFields>({ resolver,  });
    const { storageUser } = useAuth()
    const router = useRouter()

    const onSubmit: SubmitHandler<SignUpInputFields> = async (data: SignUpInputFields) => {
       try {
            const res = await axios.post("http://localhost:4000/auth/signin", data)
            storageUser(res.data.user)
            router.push("/dashboard")
       } catch (error: any) {
        if(error.response.status === 401){
            toast.error("Credenciais incorretas")
            return;
        }
            toast.error("Erro ao fazer loguin")
       }
    };

    return (
        <>
            <Header />
                <Auth>
                    <div className="flex flex-col gap-y-3">
                        <text className="text-md text-center text-gray-300 font-medium">Faça login</text>
                        {/* <div className="flex gap-x-3 justify-center">
                    <SocialLabel onClick={(e: Event) =>  {
                        e.preventDefault()
                    }}>
                        <GoogleLogo size={24} weight="regular" color="#E0E0E0" />
                    </SocialLabel>
                    <SocialLabel  onClick={(e: Event) =>  {
                        e.preventDefault()
                    }}>
                        <GithubLogo size={24} weight="fill" color="#2A2A2A" className="bg-gray-300 rounded-full" />
                    </SocialLabel>
                </div> */}
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center" >
                    <Input id="email" inputTitle="Email" defaultValue={"samervalente21323@gmail.com"} inputIcon={<EnvelopeSimple size={16} />} register={register} errors={errors} />
                    <Input id="password" inputTitle="Senha" defaultValue="12345678" inputIcon={<Key size={16} />} type="password" register={register} errors={errors} />
                    <Button type="submit">Entrar</Button>
                    </Form>
                   
                    <div className="flex flex-col items-center">
                        <Link href={"/auth/signin"} className="text-[12px] underline text-blue-main">
                            Já possui uma conta? Faça login
                        </Link>
                    </div>
                </Auth>  
        </>
    )
}