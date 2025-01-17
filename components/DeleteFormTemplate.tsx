"use client";
import React, { useActionState } from 'react';
import styles from "../styles/IconB.module.css"
import IconB from './IconB';
import FormAction from './FormAction';
import ObjectId from './ObjectId';
import Link from 'next/link';
import ConditionalHider from './ConditionalHider';
import DbLoading from './DbLoading';
import ErrorMessage from './ErrorMessage';
import CustomObjectId from './CustomObjectId';

interface DeleteFormTemplateProps {
  serverAction: (prevState: any, formData: FormData) => Promise<{ message: string }>;
  objectId: string;
  itemFormalName: string;
  hrefBack: string;
}

const DeleteFormTemplate: React.FC<DeleteFormTemplateProps> = ({ serverAction, objectId, itemFormalName, hrefBack }) => {
  const [state, formAction, pending] = useActionState(serverAction, { message: '' });

  return (
    <form action={formAction}>
      <FormAction remove />
      <ObjectId objectId={objectId} />
      <CustomObjectId nome="hrefBack" objectId={hrefBack} />
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessage title='Errore nella cancellazione' message={state.message} noBack />
      </ConditionalHider>
      <ConditionalHider hidden={pending}>
        <div className="alert alert-secondary" role="alert">
          <div className="row g-2">
            <div className="col">
              <h4 className="alert-heading mt-1">
                <span className={styles.extraPadding}>
                  <IconB iconName='exclamation-octagon' />
                </span>
                Conferma eliminazione: {itemFormalName}?
              </h4>
            </div>
            <div className="col col-auto">
              <Link className="btn btn-outline-secondary" href={hrefBack}>
                <IconB iconName="arrow-left-square" />
                Torna indietro
              </Link>
            </div>
            <div className="col col-auto">
              <button type="submit" className="btn btn-danger">
                <IconB iconName="trash" />
                Elimina
              </button>
            </div>
          </div>
        </div>
      </ConditionalHider>
    </form>
  );
};

export default DeleteFormTemplate;