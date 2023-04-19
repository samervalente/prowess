import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Select from '@/components/Select'
import { useForm } from 'react-hook-form'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { register, formState: { errors } } = useForm()

  return (
    <main className="flex min-h-screen flex-col ">
      <header className="flex justify-between p-4">
        <img src="#" alt="logo" />
        <div className="flex gap-x-10">
          <Link href="/auth/signin">Entrar</Link>
          <Link href="/auth/signup">Cadastrar-se</Link>
        </div>
      </header>
      <section className="flex flex-col justify-center items-center h-[80vh]">
        <h1 className="text-[24px] mt-[80px]">Seja bem vindo a <span className="text-blue-main font-bold ">Prowess</span></h1>
        <div className='flex flex-col items-center mb-[70px]'>
          <h3 className='mt-5'>Busque colegas de quarto</h3>
          <div className="flex justify-between gap-x-3 mt-3">
            <Select id="state" initialValue="Estado" options={["Pará", "São Paulo", "Santa Catarina"]} register={register} errors={errors} />
            <Select id="state" initialValue="Cidade" options={["Pará", "São Paulo", "Santa Catarina"]} register={register} errors={errors} />
            <Select id="state" initialValue="Gênero" options={["Masculino", "Feminino", "Indiferente"]} register={register} errors={errors} />
          </div>
        </div>
        <label>FAQS</label>
        <p className='w-[80vw] text-justify text-gray-400'>A <span className="text-blue-main font-bold">Prowess</span> é uma plataforma online que tem como objetivo conectar estudantes que desejam dividir os custos de moradia e vida em uma determinada cidade ou estado. A ideia é que os estudantes possam encontrar companheiros de quarto ou colegas de apartamento que estejam estudando na mesma região, o que pode resultar em economias significativas para todos os envolvidos.

          A plataforma funciona de forma simples e intuitiva. Os usuários se registram na plataforma e criam publicações inserindo informações como local de destino, . A partir daí, a Prowess sugere possíveis colegas de quarto com base em preferências de gênero, interesses e outros critérios. Os usuários podem então se conectar com essas pessoas e decidir se desejam morar juntos.

          Além de facilitar a busca por colegas de quarto, a Prowess também oferece recursos úteis para os usuários, como informações sobre os preços médios de aluguel na região e dicas sobre como economizar dinheiro enquanto estudam. Com a Prowess, os estudantes podem encontrar um lugar para morar de forma mais fácil, econômica e socialmente conectada. </p>
      </section>
    </main>
  )
}
