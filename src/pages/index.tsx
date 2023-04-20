import { Inter } from 'next/font/google'
import Link from 'next/link'
import Select from '@/components/Select'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { states } from '@/constants/states'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

type filterFields = {
  state?: string;
  city?: string;
  gender?: string;
}

type District = {
  nome: string;
}

export default function Home() {
  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<filterFields>();
  const [districts, setDistricts] = useState([])
  const onSubmit: SubmitHandler<filterFields> = async (data: filterFields) => {

    const clause = data.city !== "none" ? `&city=${data.city}`:""
    const req = `http://localhost:4000/posts?state=${data.state}${clause}`
    console.log(req)
    const res = await fetch(req)
    const posts = await res.json()
    console.log(posts)
  } 

  useEffect(() => {
      async function fetchData(){
        const state = states.find(state => state.nome === watch("state"))
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state?.uf}/microrregioes?orderBy=nome
      `)
      const districts = await res.json()
   
      setDistricts(districts)
        
      }
      fetchData()
   
  },[watch("state")])



  return (
    <main className="flex min-h-screen flex-col ">
      <header className="flex justify-between items-center p-4">
       <div className='flex items-center text-[24px] text-blue-main font-bold'>
       <img src="/logo.png" width={60} height={50} alt="logo" />
       <h1>Prowess</h1>
       </div>
        <div className="flex flex-col md:flex-row gap-y-3 gap-x-10">
        <Link href="/faqs">FAQS</Link>
          <Link href="/auth/signin">Entrar</Link>
          <Link href="/auth/signup">Cadastrar-se</Link>
        </div>
      </header>
      <section className="flex flex-col  items-center h-[80vh]">
        <h1 className="text-[24px] ">Seja bem vindo a <span className="text-blue-main font-bold ">Prowess</span></h1>
        <form className='flex flex-col items-center p-1' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='text-gray-400'>Conecte-se com estudantes de todo o país</h3>
          <div className="flex justify-between gap-x-3 mt-2">
            <Select id="state" initialValue="Estado" options={states.map(state => state.nome)} register={register} errors={errors} />
            <Select id="city" initialValue="Cidade" options={districts.map((district: District) => district.nome)} register={register} errors={errors} />
            <Select id="gender" initialValue="Gênero" options={["Masculino", "Feminino", "Indiferente"]} register={register} errors={errors} />
          </div>
          <Button width='w-[50%]' type="submit" >Buscar</Button>
          <span className='mt-3 underline text-blue-main cursor-pointer' onClick={() => reset()}>Limpar formulário</span>
        </form>
       
      </section>
    </main>
  )
}

