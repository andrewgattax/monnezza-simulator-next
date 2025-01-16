"use client";
import React, { useActionState } from 'react';
import IconB from '../../../components/IconB';
import changePasswordAction from "./action";
import DbLoading from '../../../components/DbLoading';
import ErrorMessageCompact from '../../../components/ErrorMessageCompact';
import ConditionalHider from '../../../components/ConditionalHider';
import InputFloating from '../../../components/InputFloating';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const LuogoProduzioneCreateUI: React.FC = ({ }) => {
  const [state, formAction, pending] = useActionState(changePasswordAction, { message: '' });
  const { data: session } = useSession();

  if (!session?.user) {
    return <ErrorMessageCompact message='Sessione non valida' />;
  }
  
  return (
    <form action={formAction}>
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessageCompact message={state.message} />
      </ConditionalHider>

      {/* form direttamente inserito nella page per via della bassa complessita */}
      <div className='d-flex flex-column gap-3 mb-4'>
        <InputFloating type='password' name='old' label='Vecchia password' required />
        <InputFloating type='password' name='new' label='Nuova password' required />
        <InputFloating type='password' name='chk' label='Conferma nuova password' required />
      </div>

      <center className='d-flex flex-row gap-2 justify-content-center'>
        <Link href='/dashboard' className='btn btn-secondary'>
          <IconB iconName="arrow-left-square" />
          Annulla
        </Link>
        <ConditionalHider hidden={pending}>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            Aggiorna password
          </button>
        </ConditionalHider>
      </center>
    </form>
  );
};

export default LuogoProduzioneCreateUI;