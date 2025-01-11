import React from 'react';
import IconB from './IconB';

const DbLoading: React.FC = () => {
  return (
    <section>
      <div className="alert alert-secondary">
        <IconB iconName="database-down" />
        Caricamento in corso...
      </div>
    </section>
  );
};

export default DbLoading;