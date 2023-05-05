import { Baby, GenderNeuter, MapPin, WhatsappLogo } from '@phosphor-icons/react'
import Image from 'next/image';
export type TPost = {
  id: string;
  partners: string;
  sharedCosts: number;
  createdAt: Date;
  contribution: number;
  city: string;
  state: string;
  about: string;
  author: {
    name: string;
    imageUrl: string;
    gender: string;
    birthDate: string;
    phone: string;
  }
}

export function Post({ postData }: { postData: TPost }) {
  function calculateAge(birthDate: string) {
    const dateMS = new Date(birthDate).getTime()
    const nowMS = Date.now()
    const diffMS = nowMS - dateMS
    const age = Math.floor(diffMS / 31536000000) - 1
    return age
  }

  return (
    <div className='flex p-3 bg-white w-[60vw] mt-3 h-[300px] rounded-lg text-gray-700 animate-fade-in  text-[15px]'>
      <section className='w-[60%] flex flex-col '>
        <div className='flex'>
          <Image className='mr-3 rounded-md' width={120} height={120} src={`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`} alt="user-profile" />
          <ul>
            <span className=' text-[16px] font-medium'>{postData.author.name}</span>
            <li className='flex items-center'><Baby size={16} weight='fill' color='#FDD136' />  Idade: {calculateAge(postData.author.birthDate)} </li>
            <li className='flex items-center'><GenderNeuter size={16} weight='fill' color='gray' /> Gênero: {postData.author.gender}</li>
            <li className='flex items-center'> <MapPin size={16} weight='fill' color='red' />  Destino: {postData.city} - {postData.state}</li>
            <li className='flex items-center' > <WhatsappLogo size={16} weight='fill' color='#09C253' /> Telefone: {postData.author.phone}</li>
          </ul>
        </div>
        <span className='mt-3 text-blue-main  font-medium'>Informações Complementares</span>
        <ul>
          <li>Somente colegas do gênero: {postData.partners}</li>
          <li>Contribuição: R$ {postData.contribution}/mês</li>
          <li>Custos compartilhados: {postData.sharedCosts}</li>
        </ul>
      </section>
      <div className='w-[50%] flex flex-col justify-between'>
        <p>{postData.about} </p>
        <span className='text-end text-gray-500'>Publicado em: </span>
      </div>
    </div>
  )
}   