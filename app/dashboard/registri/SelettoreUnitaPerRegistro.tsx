"use client"

import { UnitaLocale } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import ConditionalHider from '../../../components/ConditionalHider';

interface SelettoreUnitaPerRegistroProps {
  unitaLocali: UnitaLocale[];
  selectedId?: string
}

const SelettoreUnitaPerRegistro: React.FC<SelettoreUnitaPerRegistroProps> = ({ unitaLocali, selectedId }) => {
  const router = useRouter();
  const handleUnitaLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/dashboard/registri?idUL=${e.target.value}`);
  }
  
  return (
    <div className="row">
      <div className="col-12">
        <div className="form-floating">
          <select className="form-select" aria-label="Seleziona Unità Locale" onChange={handleUnitaLocaleChange} defaultValue={selectedId}>
            {unitaLocali.map((unitaLocale: UnitaLocale) => (
              <option key={unitaLocale.id} value={unitaLocale.id}>
                {unitaLocale.nome}
              </option>
            ))}
            <ConditionalHider hidden={selectedId !== "!!search!!"}>
              <option key={selectedId} value={selectedId}>
                Stai utilizzando la ricerca...
              </option>
            </ConditionalHider>
          </select>
          <label htmlFor="unitaLocaleSelect">Seleziona Unità Locale</label>
        </div>
      </div>
    </div>
  );
};

export default SelettoreUnitaPerRegistro;