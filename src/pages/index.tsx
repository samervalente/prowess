import Select from '@/components/Select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { states } from '@/constants/states'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { TPost } from '@/components/Post'
import Post from '@/components/Post'
import { Pagination, PaginationItem, Stack } from '@mui/material'
import SkeletonPost from '@/components/SkeletonPost'


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
  const [posts, setPosts] = useState<TPost[]>()
  const [skip, setSkip] = useState(0)
  const [isFetchintPosts, setIsFetchingPosts] = useState(false)

  const onSubmit: SubmitHandler<filterFields> = async (data: filterFields) => {
    setIsFetchingPosts(true)
    const clause = data.city !== "none" ? `&city=${data.city}` : ""
    const req = `http://localhost:4000/posts?state=${data.state}${clause}&skip=${skip}`
    const res = await fetch(req)

    
    const { posts } = await res.json()
    if(posts){
      setTimeout(() => {
       setIsFetchingPosts(false)
       console.log(posts)
      }, 3000)
    }
   
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

  let skeletonPosts = Array(3).fill(0);

  return (
    <>
      <Header />
    <main className="flex flex-col min-h-screen ">
        <section className="flex flex-col justify-center items-center  text-center ">
          <h1 className="text-[24px]">Seja bem vindo a <span className="text-blue-main font-bold ">Prowess</span></h1>
          <form className='flex flex-col items-center p-1' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-gray-400'>Conecte-se com estudantes de todo o país</h3>
            <div className="flex justify-between items-center gap-x-3 mt-2">
              <Select id="state" initialValue="Estado" options={states.map(state => state.nome)} register={register} errors={errors} />
              <Select id="city" initialValue="Cidade" options={districts.map((district: District) => district.nome)} register={register} errors={errors} />
              <Select id="gender" initialValue="Gênero" options={["Masculino", "Feminino", "Indiferente"]} register={register} errors={errors} />
              <button className='bg-blue-700 p-1 w-[100px] rounded-md' type="submit">Buscar</button>
            </div>
          </form>
          <span className='mt-3 text-[14px] underline text-blue-main cursor-pointer' onClick={() => reset()}>Limpar formulário</span>
        </section>
        <section className='flex flex-col items-center gap-y-5'>
     

        {isFetchintPosts ? skeletonPosts.map((i: number) => <SkeletonPost key={i} />): <>
        {posts && posts.length > 1 ? 
          <>
            {posts.map((post: TPost, i) => <Post key={post.id} postData={post} />)}
            <Stack spacing={2}>
              <Pagination count={10} variant='outlined' color="primary" renderItem={(item) => <PaginationItem sx={{ color: "white" }} {...item} />} />
            </Stack>
          </>: <span className='mt-10'>No posts found for these filters </span>}

        </>}
        </section>
    </main>
    </>
  )
}


