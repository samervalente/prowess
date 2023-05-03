import { Baby, GenderNeuter, MapPin, WhatsappLogo } from '@phosphor-icons/react'
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

export default function postData({ postData }: { postData: TPost }) {
  function calculateAge(birthDate: string) {
    const dateMS = new Date(birthDate).getTime()
    const nowMS = Date.now()
    const diffMS = nowMS - dateMS
    const age = Math.floor(diffMS / 31536000000) - 1
    return age
  }

  return (
    <div className='flex p-3 bg-white w-[60vw] mt-3 h-[300px] rounded-lg text-gray-700  text-[15px]'>
      <section className='w-[60%] flex flex-col '>
        <div className='flex'>
          <img className='mr-3 w-[120px] h-[120px] rounded-md' src={postData.author.imageUrl} />
          <ul>
            <text className=' text-[16px] font-medium'>{postData.author.name}</text>
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