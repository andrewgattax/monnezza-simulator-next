import React, { use } from 'react';
import IconB from '../../../components/IconB';
import { UnitaLocale } from '@prisma/client';

interface RegNonTrasmesseCounterProps {
  count: Promise<number>;
  unitaLocali: UnitaLocale[];
  selectedId?: string
}

const RegNonTrasmesseCounter: React.FC<RegNonTrasmesseCounterProps> = ({ count, unitaLocali, selectedId }) => {
  const c = use(count);
  const currentUnitaLocale = unitaLocali.find((unita) => unita.id === selectedId)?.nome || "";
  let parteDopo = "";

  if (currentUnitaLocale) {
    parteDopo = `l'unità locale`;
  } else {
    parteDopo = "le unità locali cercate";
  }


  if (c == 1)
    return (
      <div className="alert alert-warning d-flex align-items-center mt-3" role="alert">
        <IconB iconName="exclamation-triangle-fill" />
        <span>
          Attenzione! C'è <strong>una</strong> registrazione non trasmessa per {parteDopo} <b>{currentUnitaLocale}</b>.
        </span>
      </div>
    );
  else if (c > 1)
    return (
      <div className="alert alert-warning d-flex align-items-center mt-3" role="alert">
        <IconB iconName="exclamation-triangle-fill" />
        <span>
          Attenzione! Ci sono <strong>{c}</strong> registrazioni non trasmesse per {parteDopo} <b>{currentUnitaLocale}</b>.
        </span>
      </div>
    );
  else
    return (
      <div className="alert alert-success d-flex align-items-center mt-3" role="alert">
        <IconB iconName="check-circle-fill" />
        <span>
          Tutte le registrazioni sono state trasmesse correttamente per {parteDopo} <b>{currentUnitaLocale}</b>.
        </span>
      </div>
    );
};

export default RegNonTrasmesseCounter;