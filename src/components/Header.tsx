import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between p-4 sticky">
      <Link href="/" className='flex items-center text-[24px] text-blue-main font-bold'>

        <img src="/logo.png" width={60} height={50} alt="logo" />
        <h1>Prowess</h1>

      </Link>
      <div className="flex flex-col md:flex-row gap-y-3 gap-x-10">
        <Link href="/faqs">FAQS</Link>
        <Link href="/auth/signin">Entrar</Link>
        <Link href="/auth/signup">Cadastrar-se</Link>
      </div>
    </header>
  )
}