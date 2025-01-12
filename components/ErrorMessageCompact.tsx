"use client"
import React from 'react';
import IconB from './IconB';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageCompact: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="alert alert-danger">
      <IconB iconName="exclamation-triangle" />
      {message}
    </div>
  );
};

export default ErrorMessageCompact;