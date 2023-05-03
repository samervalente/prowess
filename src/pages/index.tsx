import Select from '@/components/Select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { states } from '@/constants/states'
import { useEffect, useState, useRef } from 'react'
import Header from '@/components/Header'
import { TPost } from '@/components/Post'
import Post from '@/components/Post'
import { Pagination, PaginationItem, Stack } from '@mui/material'
import SkeletonPost from '@/components/SkeletonPost'
import { useYupValidationResolver } from '@/hooks/yupValidationResolver'
import { filterPostSchema } from '@/schemas/filterPosts'
import {toast} from 'react-toastify'

type filterFields = {
  state?: string;
  city?: string;
  gender?: string;
}

type District = {
  nome: string;
}

export default function Home() {
  const resolver = useYupValidationResolver(filterPostSchema)
  const { register, watch, reset, getValues, handleSubmit, formState: { errors } } = useForm<filterFields>({ resolver });
  const [districts, setDistricts] = useState([])
  const [posts, setPosts] = useState<TPost[]>()
  const [skip, setSkip] = useState(0)
  const [count, setCount] = useState(0)
  const [isFetchintPosts, setIsFetchingPosts] = useState(false)
  const ref = useRef(skip)

  const onSubmit: SubmitHandler<filterFields> = async (data: filterFields) => {
    if(data.state !== "none"){
      setIsFetchingPosts(true)
      const clause = data.city !== "none" ? `&city=${data.city}` : ''
      const genderClause = data.gender !== "none" && data.gender !== "Indiferente" ? `&gender=${data.gender}` : ''
      const req = `http://localhost:4000/posts?state=${data.state}${clause}${genderClause}&skip=${skip}`
      const res = await fetch(req)
  
  
      const { posts, count } = await res.json()
      if (posts) {
        setTimeout(() => {
          setIsFetchingPosts(false)
  
        }, 3000)
      }
      setCount(count)
      setSkip(0)
      setPosts(posts)
    }else{
      toast.error("Selecione ao menos o estado")
    }
  }

  
  useEffect(() => {
    async function fetchData() {
      if (ref.current !== skip) {
        const data = getValues();
        setIsFetchingPosts(true)
        const clause = data.city !== "none" ? `&city=${data.city}` : ""
        const req = `http://localhost:4000/posts?state=${data.state}${clause}&skip=${skip}`
        const res = await fetch(req)


        const { posts } = await res.json()
        if (posts) {
          setTimeout(() => {
            setIsFetchingPosts(false)
          }, 1000)
        }

        setPosts(posts)
      }
    }
    fetchData()
  }, [getValues, skip])

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


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSkip(value - 1);
  };

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
              <Select id="city" initialValue="Cidade" disabled={getValues("state") === "none"} options={districts.map((district: District) => district.nome)} register={register} errors={errors} />
              <Select id="gender" initialValue="Gênero" options={["Masculino", "Feminino", "Indiferente"]} register={register} errors={errors} />
              <button className='bg-blue-700 p-1 w-[100px] rounded-md' type="submit">Buscar</button>
            </div>
          </form>
          <span className='mt-3 text-[14px] underline text-blue-main cursor-pointer' onClick={() => reset()}>Limpar formulário</span>
        </section>
        <section className='flex flex-col items-center gap-y-5'>


          {isFetchintPosts ? Array(1,2,3).fill(4,1,1).map((i: number) => <SkeletonPost key={i} />) : <>
            {posts && posts.length > 1 ?
              <>
                {posts.map((post: TPost, i) => <Post key={post.id} postData={post} />)}
                <Stack spacing={2}>
                  <Pagination count={count / 3} page={skip + 1} variant='outlined' onChange={handleChange} color="primary" renderItem={(item) => <PaginationItem sx={{ color: "white" }} {...item} />} />
                </Stack>
              </> : posts? <span className='mt-10'>Nenhuma publicação encontrada para estes filtros</span>: ''}

          </>}
        </section>
      </main>
    </>
  )
}


