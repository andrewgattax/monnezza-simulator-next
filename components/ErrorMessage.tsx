"use client"
import React from 'react';
import IconB from './IconB';
import styles from "../styles/IconB.module.css"
import { useRouter } from 'next/navigation';

interface ErrorMessageProps {
  title: string;
  message: string;
  noBack?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, noBack }) => {
  const router = useRouter();

  const tornaIndietro = () => {
    router.back();
  };

  return (
    <div className="alert alert-danger" role="alert">
      <div className="row">
        <div className="col">
          <h4 className="alert-heading">
            <span className={styles.extraPadding}>
              <IconB iconName='exclamation-octagon' />
            </span>
            {title}
          </h4>
        </div>
        <div className="col col-auto">
          {!noBack && (
            <button className="btn btn-outline-danger" onClick={tornaIndietro}>
              <IconB iconName="arrow-left-square" />
              Torna indietro
            </button>
          )}
        </div>
      </div>
      <hr />
      <p className="mb-0">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;