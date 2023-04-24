import { Inter } from 'next/font/google'

import Select from '@/components/Select'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { states } from '@/constants/states'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { TPost } from '@/components/Post'
import Post from '@/components/Post'

type filterFields = {
  state?: string;
  city?: string;
  gender?: string;
}

type District = {
  nome: string;
}



export default function Home({ data }: { data: TPost[] }) {
  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<filterFields>();
  const [districts, setDistricts] = useState([])
  const [posts, setPosts] = useState<TPost[]>(data)
  const [skip, setSkip] = useState(0)
  const onSubmit: SubmitHandler<filterFields> = async (data: filterFields) => {

    const clause = data.city !== "none" ? `&city=${data.city}` : ""
    const req = `http://localhost:4000/posts?state=${data.state}${clause}&skip=${skip}`
    const res = await fetch(req)
    const { posts } = await res.json()
    setPosts(posts)
  }

  const handleSkip = () => setSkip(skip + 1)
  const handleBack = () => skip > 0 && setSkip(skip - 1)

  useEffect(() => {
    async function fetchData() {
      const state = states.find(state => state.nome === watch("state"))
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state?.uf}/microrregioes?orderBy=nome
      `)
      const districts = await res.json()

      setDistricts(districts)

    }
    fetchData()

  }, [watch("state")])



  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <div className='flex relative'>
        <section className="flex flex-col justify-center items-center h-[60vh] fixed left-10">
          <h1 className="text-[24px] ">Seja bem vindo a <span className="text-blue-main font-bold ">Prowess</span></h1>
          <form className='flex flex-col items-center p-1' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-gray-400'>Conecte-se com estudantes de todo o país</h3>
            <div className="flex justify-between gap-x-3 mt-2">
              <Select id="state" initialValue="Estado" options={states.map(state => state.nome)} register={register} errors={errors} />
              <Select id="city" initialValue="Cidade" options={districts.map((district: District) => district.nome)} register={register} errors={errors} />
              <Select id="gender" initialValue="Gênero" options={["Masculino", "Feminino", "Indiferente"]} register={register} errors={errors} />
            </div>

            <Button width='w-[70%]' type="submit" >Buscar</Button>
            <span className='mt-3 text-[14px] underline text-blue-main cursor-pointer' onClick={() => reset()}>Limpar formulário</span>
            <div className='flex gap-x-3'>
              {skip > 0 && <button onClick={handleBack}>Back</button>}
              <button onClick={handleSkip}>Skip</button>
            </div>
          </form>
        </section>
        <section className='flex flex-col gap-y-5 absolute right-10'>
          <h4 className='text-center'>Últimas publicações</h4>
          {posts ? posts.map((post: TPost) => <Post postData={post} />) : 'Carregando...'}
        </section>
      </div>
    </main>
  )
}


export async function getStaticProps() {
  const res = await fetch(`http://localhost:4000/posts?state=Santa Catarina`)

  const { posts } = await res.json()

  return {
    props: {
      data: posts,
    },
    revalidate: 60,
  }
}