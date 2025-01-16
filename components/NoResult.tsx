import React from 'react';
import IconB from './IconB';

interface NoResultProps {
  formalItemName: string;
  sesso: string
}

const NoResult: React.FC<NoResultProps> = ({ formalItemName, sesso }) => {


  return (
    <section>
      <div className="alert alert-secondary">
        <IconB iconName="database-down" />
        Non è stat{sesso=="m" ? "o" : "a"} trovat{sesso=="m" ? "o" : "a"} nessun{sesso=="m" ? "" : "a"} {formalItemName}
        {
          //TODO: Tasto aggiungi per formalItemName
        }
      </div>
    </section>
  );
};

export default NoResult;