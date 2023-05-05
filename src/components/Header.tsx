import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const {asPath} = useRouter()

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 sticky">
      <Link href="/" className='flex items-center text-[24px] text-blue-main font-bold'>

        <img src="/logo.png" width={60} height={50} alt="logo" />
        <h1>Prowess</h1>

      </Link>
      <div className="flex flex-col md:flex-row gap-y-3 gap-x-10">
        <Link className={`${asPath === '/faqs' && 'border-b-2 border-blue-main'}`} href="/faqs">FAQS</Link>
        <Link className={`${asPath === '/auth/signin' && 'border-b-2 border-blue-main'}`} href="/auth/signin">Entrar</Link>
        <Link className={`${asPath === '/auth/signup' && 'border-b-2 border-blue-main'}`} href="/auth/signup">Cadastrar-se</Link>
      </div>
    </header>
  )
}