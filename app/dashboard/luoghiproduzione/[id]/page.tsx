import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React from 'react'
import ErrorMessage from '../../../../components/ErrorMessage'
import Accordion from '../../../../components/Accordion'
import AccordionItem from '../../../../components/AccordionItem'
import SelettoreComuni from '../../../../components/SelettoreComuni'
import InputFloating from '../../../../components/InputFloating'
import IconB from '../../../../components/IconB'

// PAGINA
export default async function LuoghiProduzioneContainer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  ////// DEFINIZIONE DELLE SERVER ACTION //////
  const creaLuogoProduzione = async (formData: FormData) => {
    "use server"
    
  }

  
  const modificaLuogoProduzione = async (formData: FormData) => {
    "use server"
  }

  const paramId = (await params).id
  const prisma = new PrismaClient()

  if (paramId == "new") {
    return (
      <form action={creaLuogoProduzione}>
        <LuogoProduzioneForm />
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            Salva
          </button>
        </center>
      </form>
    );
  } else {
    let luogoProduzione = null;

    try {
      luogoProduzione = await prisma.luogoProduzione.findUnique({
        where: { id: paramId },
      })
    } catch { }

    if (!luogoProduzione) {
      return (
        <ErrorMessage
          title="Luogo non trovato"
          message="Il luogo di produzione selezionato non esiste nel database" />
      );
    }

    return (
      <form action={modificaLuogoProduzione}>
        <LuogoProduzioneForm />
        <center>
          <button className='btn btn-primary btn-overcolor'>
            Salva
          </button>
        </center>
      </form>
    );
  }

}

interface LuogoProduzioneFormProps {
  luogoProduzione?: Partial<LuogoProduzione>;
}

const LuogoProduzioneForm: React.FC<LuogoProduzioneFormProps> = ({ luogoProduzione }) => {
  return (
    <div>
      <Accordion accordionId='luogoProduzione'>
        <AccordionItem parentId='luogoProduzione' title='Luogo di produzione' isShown>
          <div className="row g-2 mt-4">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Nome Luogo' type='text' required />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required />
            </div>
            <div className='col-2 mt-0'>
              <InputFloating name='civico' label='Civico' type='text' required />
            </div>
          </div>
          <SelettoreComuni />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

