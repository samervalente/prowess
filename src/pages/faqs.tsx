import SimpleAccordion from "@/components/Accordion";
import Link from "next/link";

export default function FAQS(){
    return (
        <>
            
       <div className='p-3 min-h-[100vh] flex flex-col items-center  gap-y-1'>
       <label className='font-bold text-blue-main mt-10'>FAQS</label>
       <SimpleAccordion title="O que é a Prowess?">
          A <span className="text-blue-main font-bold">Prowess</span> é uma plataforma online que tem como objetivo conectar estudantes que desejam dividir os custos de moradia e vida em uma determinada cidade ou estado. A ideia é que os estudantes possam encontrar companheiros de quarto ou colegas de apartamento que estejam estudando na mesma região, o que pode resultar em economias significativas para todos os envolvidos.
        </SimpleAccordion>
        <SimpleAccordion title="Como funciona?">
          A plataforma funciona de forma simples e intuitiva. Os usuários podem fazer a busca por colegas de quarto com base em alguns filtros como estado, cidade e gênero. Além disso, é possivel registrar-se na plataforma para criar suas próprias publicações. A partir daí, a Prowess sugere possíveis colegas de quarto com base em preferências de gênero, interesses e outros critérios. Os usuários podem então se conectar com essas pessoas e decidir se desejam morar juntos.
        </SimpleAccordion>

        <SimpleAccordion title="Como crio minha própria publicação?">
          Para criar sua própria publicação, <Link href="/auth/signup" className='text-blue-main underline'>registre-se na plataforma </Link> com sua conta google, github ou seus dados pessoais. Em seguida, na aba superior direita, clique em <span className='text-gray-300'>Perfil</span> e depois em <span className='text-gray-300'> Criar Publicação</span>.
        </SimpleAccordion>

        <SimpleAccordion title="Quais recursos são oferecidos?">
        Além de facilitar a busca por colegas de quarto, a Prowess também oferece recursos úteis para os usuários, como informações sobre os preços médios de aluguel na região e dicas sobre como economizar dinheiro enquanto estudam. Com a Prowess, os estudantes podem encontrar um lugar para morar de forma mais fácil, econômica e socialmente conectada.
        </SimpleAccordion>

       </div>
        </>
    )
}