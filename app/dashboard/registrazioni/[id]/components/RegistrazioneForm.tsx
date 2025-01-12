import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { CategoriaRAEE, CausaleOperazione, CodiceAttivita, PericoloRifiuto, ProvenienzaRifiuto, Registrazione, StatoFisicoRifiuto, TipoOperazione, TipoTrasportoFrontaliero, UnitaMisura } from '@prisma/client';
import { enumToName } from '../../../../../utils';
import codiciEER from "../../../../../codiceEERDb.json"
import InputCheckbox from '../../../../../components/InputCheckbox';

interface CodiceEER {
  codice: string,
  descrizione: string
}

const arrayToString = (arr?: string[]): string => {
  if (arr) {
    return arr.join(', ');
  }
  return "";
};

interface RegistrazioneFormProps {
  registrazione?: Partial<Registrazione>;
  integrazioneFIR?: boolean
  onChange: (updatedData: any) => void;
}

const RegistrazioneForm: React.FC<RegistrazioneFormProps> = ({ registrazione, integrazioneFIR, onChange }) => {
  const [formValues, setFormValues] = useState(registrazione || {});
  const [isIntegratoFIR, setIntegratoFIR] = useState<boolean>(integrazioneFIR || false)

  useEffect(() => {
    setFormValues(registrazione || {});
  }, [registrazione]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

  const handleChangeFIR = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIntegratoFIR(checked);
    onChange({ ...formValues, integrazioneFIR: checked });
  }

  return (
    <div>
      <Accordion accordionId='registrazione'>
        <AccordionItem parentId='registrazione' title='Riferimenti Operazione' isShown>
          <div className="row g-2 mt-3 mb-3">
            <div className='col-4 mt-0'>
              <InputFloating name="dataRegistrazione" label='Data Registrazione' type='date' required
                value={formValues.dataOraRegistrazione?.toDateString()} onChange={handleChange} />
            </div>
            <div className='col-4 mt-0'>
              <div className="form-floating">
                <select className="form-select" id="tipoAttivita" name='tipoAttivita' onChange={handleChange} defaultValue="">
                  <option value="" disabled>Seleziona</option>
                  {Object.values(TipoOperazione).map((operation) => (
                    <option key={operation} value={operation}>{enumToName(operation)}</option>
                  ))}
                </select>
                <label htmlFor="tipoAttivita">Tipo Operazione: </label>
              </div>
            </div>
            <div className='col-4 mt-0'>
              <div className="form-floating">
                <select className="form-select" id="causaleOperazione" name='causaleOperazione' onChange={handleChange} defaultValue="" value={formValues.causaleOperazione}>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(CausaleOperazione).map((operationCause) => (
                    <option key={operationCause} value={operationCause}>{enumToName(operationCause)}</option>
                  ))}
                </select>
                <label htmlFor="causaleOperazione">Causale Operazione: </label>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-12">
              <InputFloating name="riferimentoRegistrazione" label="Riferimento Registrazione (es '2024/00000001')" type='text' value={arrayToString(formValues.registrazioniFiglie)} onChange={handleChange} disabled={formValues.tipoOperazione === "CARICO"} />
            </div>
          </div>
        </AccordionItem>
        <AccordionItem parentId='registrazione' title='Identificazione del rifiuto' isShown>
          <div className="row g-2 mt-3 mb-3">
            <div className="col-8">
              <div className="form-floating">
                <select className="form-select" id="codiceEER" name='codiceEER' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.codiceEER} required>
                  <option value="" disabled>Seleziona</option>
                  {codiciEER.map((codice: CodiceEER) => (
                    <option key={codice.codice} value={codice.codice}>{codice.codice + " - " + codice.descrizione}</option>
                  ))}
                </select>
                <label htmlFor="codiceEER">Codice EER (*) </label>
              </div>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="provenienzaRifiuto" name='provenienzaRifiuto' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.provenienzaRifiuto} required>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(ProvenienzaRifiuto).map((provenienza) => (
                    <option key={provenienza} value={provenienza}>{enumToName(provenienza)}</option>
                  ))}
                </select>
                <label htmlFor="provenienzaRifiuto">Provenienza Rifiuto (*)</label>
              </div>
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-8">
              <InputFloating name='descrizioneRifiuto' label='Descrizione' type='text' onChange={handleChange} value={formValues.rifiuto?.descrizione} />
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="pericoloRifiuto" name='pericoloRifiuto' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.pericoloRifiuto}>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(PericoloRifiuto).map((pericolo) => (
                    <option key={pericolo} value={pericolo}>{enumToName(pericolo)}</option>
                  ))}
                </select>
                <label htmlFor="pericoloRifiuto">Caratt. di pericolo (HP): </label>
              </div>
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="statoFisico" name='statoFisico' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.statoFisicoRifiuto} required>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(StatoFisicoRifiuto).map((statoFisico) => (
                    <option key={statoFisico} value={statoFisico}>{enumToName(statoFisico)}</option>
                  ))}
                </select>
                <label htmlFor="statoFisico">Stato Fisico (*) </label>
              </div>
            </div>
            <div className="col-3">
              <InputFloating label='Quantità (*)' type='number' name='quantita' onChange={handleChange} required value={formValues.rifiuto?.quantita?.toString()} />
            </div>
            <div className="col-1">
              <div className="form-floating">
                <select className="form-select" id="unitaMisura" name='unitaMisura' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.unitaDiMisura} required>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(UnitaMisura).map((unitaMisura) => (
                    <option key={unitaMisura} value={unitaMisura}>{enumToName(unitaMisura)}</option>
                  ))}
                </select>
                <label htmlFor="unitaMisura">Unita di Misura (*) </label>
              </div>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="destinazioneRifiuto" name='destinazioneRifiuto' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.unitaDiMisura} required>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(CodiceAttivita).map((destinazioneRifiuto) => (
                    <option key={destinazioneRifiuto} value={destinazioneRifiuto}>{enumToName(destinazioneRifiuto)}</option>
                  ))}
                </select>
                <label htmlFor="destinazioneRifiuto">Destinato a (*) </label>
              </div>
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-6">
              <div className="form-floating">
                <select className="form-select" id="categoriaRAEE" name='categoriaRAEE' onChange={handleChange} defaultValue="" value={formValues.rifiuto?.categoriaRAAE ?? undefined}>
                  <option value="" disabled>Seleziona</option>
                  {Object.values(CategoriaRAEE).map((categoriaRAAE) => (
                    <option key={categoriaRAAE} value={categoriaRAAE}>{enumToName(categoriaRAAE)}</option>
                  ))}
                </select>
                <label htmlFor="categoriaRAEE">Categoria AEE</label>
              </div>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem parentId='registrazione' title='Integrazione FIR' >
          <div className="row g-2 mt-3">
            <div className="col-12">
              <InputCheckbox label='Inserisci Integrazione FIR' name='integrazioneFIR' checked onChange={handleChangeFIR} />
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-6">
              <InputFloating label='Numero FIR (*)' type='text' name='numerofir' required onChange={handleChange} value={formValues.numeroFIR ?? undefined} disabled={!isIntegratoFIR}/>
            </div>
            <div className="col-2">
              <InputCheckbox label='Trasporto Transfrontaliero' name='trasportoTransfrontaliero' checked={formValues.trasportoFrontaliero} onChange={handleChange} disabled={!isIntegratoFIR}/>
            </div>
            {formValues.trasportoFrontaliero && (
              <div className="col-2">
                <div className="form-floating">
                  <select className="form-select" id="tipoTrasporto" name='tipoTrasporto' onChange={handleChange} defaultValue="" value={formValues.tipoTrasportoFrontaliero ?? undefined} disabled={!isIntegratoFIR}>
                    <option value="" disabled>Seleziona</option>
                    {Object.values(TipoTrasportoFrontaliero).map((tipoTrasporto) => (
                      <option key={tipoTrasporto} value={tipoTrasporto}>{enumToName(tipoTrasporto)}</option>
                    ))}
                  </select>
                  <label htmlFor="tipoTrasporto">Tipo trasporto</label>
                </div>
              </div>
            )}
            <div className="col-2">
              <InputFloating name="dataInizioTrasporto" label='Data Inizio Trasporto (*)' type='date' required
                value={formValues.dataOraRegistrazione?.toDateString()} onChange={handleChange} disabled={!isIntegratoFIR} />
            </div>
          </div>
        </AccordionItem>
        <AccordionItem parentId='registrazione' title='Esito conferimento'>
          <h1>tua madre esito conferimento</h1>
        </AccordionItem> 
        <AccordionItem parentId='registrazione' title='Annotazioni'>
          <h1>tua madre textarea</h1>
        </AccordionItem> 
      </Accordion>
    </div>
  )
}

export default RegistrazioneForm;
