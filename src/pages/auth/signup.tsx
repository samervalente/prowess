import Auth from "@/components/Auth";
import Header from "@/components/Header";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";


export default function SignUp() {
    return (
        <>
            <Header />
                <Auth>
                    <div className="flex flex-col gap-y-3">
                        <text className="text-md text-center text-gray-300 font-medium">Registre-se</text>
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
                    <SignUpForm />
                    <div className="flex flex-col items-center">
                        <Link href={"/auth/signin"} className="text-[12px] underline text-blue-main">
                            Já possui uma conta? Faça login
                        </Link>
                    </div>
                </Auth>  
        </>
    )
}