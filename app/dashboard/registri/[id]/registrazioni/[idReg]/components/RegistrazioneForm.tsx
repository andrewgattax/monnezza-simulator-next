import React, { useEffect, useState } from 'react';
import { Registrazione, TipoAttivita } from '@prisma/client';
import Accordion from '../../../../../../../components/Accordion';
import AccordionItem from '../../../../../../../components/AccordionItem';
import InputCheckbox from '../../../../../../../components/InputCheckbox';
import InputFloating from '../../../../../../../components/InputFloating';
import { enumToName } from '../../../../../../../utils';
import EERSelectorFormComponent from '../../../../../../../components/EERSelectorFormComponent';
import { CodiceEER } from '../../../../../../../components/EERSelectorModal';
import MultiSelectDropdown from '../../../../../../../components/MultiSelectDropdown';
import { CodificheAttivitaDestinazione, CodificheCategorieAEE, CodificheCausaleRespingimento, CodifichePericoloRifiuto, CodificheProvenienzaRifiuto, CodificheStatoFisico, CodificheTipologiaRespingimento, CodificheTrans, CodificheUnitaMisura } from '../../../../../../../rentri';



interface CausaleOperazione {
  codice: string,
  descrizione: string
}



let causali: CausaleOperazione[] = []

const arrayToString = (arr?: string[]): string => {
  if (arr) {
    return arr.join(', ');
  }
  return "";
};

interface RegistrazioneFormProps {
  causaliRespingimento: CodificheCausaleRespingimento[],
  pericoliRifiuto: CodifichePericoloRifiuto[],
  provenienzaRifiuto: CodificheProvenienzaRifiuto[],
  statiFisiciRifiuto: CodificheStatoFisico[],
  tipiRespingimento: CodificheTipologiaRespingimento[],
  tipiTrasportoTrans: CodificheTrans[],
  unitaDiMisura: CodificheUnitaMisura[],
  categorieAEE: CodificheCategorieAEE[],
  attivitaADestinazione: CodificheAttivitaDestinazione[],
  tipiAttività: TipoAttivita[]
  registrazione?: Partial<Registrazione>;
  progressivi?: String[]
  integrazioneFIR?: boolean
  onChange: (updatedData: any) => void;
}

const RegistrazioneForm: React.FC<RegistrazioneFormProps> = ({ tipiAttività, registrazione, integrazioneFIR, progressivi, onChange, causaliRespingimento, pericoliRifiuto,
  provenienzaRifiuto, statiFisiciRifiuto, tipiRespingimento, tipiTrasportoTrans, attivitaADestinazione, unitaDiMisura, categorieAEE }) => {
  const [formValues, setFormValues] = useState(registrazione || {});
  const [isIntegratoFIR, setIntegratoFIR] = useState<boolean>(integrazioneFIR || false)

  useEffect(() => {
    setFormValues(registrazione || {});
  }, [registrazione]);

  const opzioniAEE = categorieAEE.map((c) => {
    return {
      value: c.code,
      label: c.code + " - " + c.name
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
    console.log(formValues)
  };

  const handleChangeTipoOperazione = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "CARICO") {
      causali = [
        { codice: "NP", descrizione: "Nuovo Produttore" },
        { codice: "T", descrizione: "Ricevuto da terzi" },
      ];
      formValues.causaleOperazione = "NP";
    } else {
      causali = [
        { codice: "aT", descrizione: "Scarico a terzi" },
        { codice: "I", descrizione: "Scarico Interno" },
        { codice: "M", descrizione: "Scarico per produzione di materiali" },
      ];
      formValues.causaleOperazione = "aT";
    }
    handleChange(e);
  }

  const handleRifiutoChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRifiuto = { ...formValues.rifiuto, [name]: value ? value : "" };
    const updatedData = { ...formValues, rifiuto: updatedRifiuto };
    //TODO: GRANDE PORCATA ma FUNZIONA CAZZO
    // @ts-ignore
    setFormValues(updatedData);
    onChange(updatedData);
  }

  const handleCategoriaAEEChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedCategoriaRAEE = formValues.rifiuto?.categoriaRAAE ? [...formValues.rifiuto.categoriaRAAE] : [];

    if (checked) {
      updatedCategoriaRAEE.push(value);
    } else {
      updatedCategoriaRAEE = updatedCategoriaRAEE.filter((categoria) => categoria !== value);
    }

    const updatedRifiuto = { ...formValues.rifiuto, categoriaRAAE: updatedCategoriaRAEE };
    const updatedData = { ...formValues, rifiuto: updatedRifiuto };

    // @ts-ignore
    setFormValues(updatedData);
    onChange(updatedData);
    console.log(formValues)
  }


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updatedData = { ...formValues, [name]: checked };
    setFormValues(updatedData);
    onChange(updatedData);
  };

  const handleConferitoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!checked) {
      formValues.isRespinto = false;
    }
    handleCheckboxChange(e);
  }

  const handleTipoAttivitaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != "INTERMEDIAZIONE" && e.target.value != "TRASPORTO") {
      formValues.tipoOperazione = "CARICO";
      causali = [
        { codice: "NP", descrizione: "Nuovo Produttore" },
        { codice: "T", descrizione: "Ricevuto da terzi" },
      ];
      formValues.causaleOperazione = "NP";
    } else if (e.target.value === "INTERMEDIAZIONE") {
      formValues.tipoOperazione = "SCARICO";
      formValues.causaleOperazione = "TR";
    } else if (e.target.value === "TRASPORTO") {
      formValues.tipoOperazione = "CARICOSCARICO";
      formValues.causaleOperazione = "T_AT";
    }
    handleChange(e);
  }

  const handleEERChange = (d: CodiceEER) => {
    let updatedData = formValues;
    if (updatedData.rifiuto) {
      updatedData.rifiuto.codiceEER = d.codice ?? '';
      setFormValues(updatedData);
      onChange(updatedData);
    }
  }

  if (formValues.tipoOperazione === "CARICO") {
    causali = [
      { codice: "NP", descrizione: "Nuovo Produttore" },
      { codice: "T", descrizione: "Ricevuto da terzi" },
    ];
  } else {
    causali = [
      { codice: "aT", descrizione: "Scarico a terzi" },
      { codice: "I", descrizione: "Scarico Interno" },
      { codice: "M", descrizione: "Scarico per produzione di materiali" },
    ];
  }

  if (tipiAttività.length == 1) {
    formValues.tipoAttivita = tipiAttività[0].attivita;
  }

  attivitaADestinazione.sort((a, b) => a.code.localeCompare(b.code));

  return (
    <div>
      <Accordion accordionId='registrazione'>
        <AccordionItem parentId='registrazione' title='Riferimenti Operazione' isShown>
          <div className="row g-2 mt-3">
            <div className="col-12">
              <div className="form-floating">
                <select className="form-select" id="tipoAttivita" name='tipoAttivita' onChange={handleTipoAttivitaChange} value={formValues.tipoAttivita ?? ""} required disabled={tipiAttività.length == 1}>
                  <option value="" disabled>Seleziona</option>
                  {tipiAttività.map((tipo) => (
                    <option key={tipo.attivita} value={tipo.attivita}>{enumToName(tipo.attivita)}</option>
                  ))}
                </select>
                <label htmlFor="tipoAttivita">Tipo Attività (*)</label>
                <input type='hidden' name='tipoAttivita' value={formValues.tipoAttivita} disabled={tipiAttività.length > 1} />
              </div>
            </div>
          </div>
          {!(formValues.tipoAttivita === "TRASPORTO" || formValues.tipoAttivita === "INTERMEDIAZIONE") && (
            <div className="row g-2 mt-2">
              <div className="col-12">
                <InputCheckbox label='Stoccaggio Instantaneo' name='isStoccaggioInstant' checked={formValues.isStoccaggioInstant} onChange={handleCheckboxChange} />
              </div>
            </div>
          )}
          <div className="row g-2 mt-2">
            <div className='col-4'>
              <InputFloating name="dataOraRegistrazione" label='Data Registrazione' type='date' required
                value={formValues.dataOraRegistrazione ? new Date(formValues.dataOraRegistrazione).toISOString().split('T')[0] : ''} onChange={handleChange} />
            </div>
            {!formValues.isStoccaggioInstant && (
              <div className='col-4'>
                <div className="form-floating">
                  <select className="form-select" id="tipoOperazione" name='tipoOperazione' onChange={handleChangeTipoOperazione}
                    value={formValues.tipoAttivita === "TRASPORTO" ? "CaricoEScarico" : formValues.tipoAttivita === "INTERMEDIAZIONE" ? "SCARICO" : formValues.tipoOperazione ? formValues.tipoOperazione : ""}
                    disabled={formValues.tipoAttivita === "TRASPORTO" || formValues.tipoAttivita === "INTERMEDIAZIONE"}>

                    <option value="CaricoEScarico" hidden>Carico & Scarico</option>
                    <option value="" disabled>Seleziona</option>
                    <option key="carico" value="CARICO">Carico</option>
                    <option key="scarico" value="SCARICO">Scarico</option>
                  </select>
                  <label htmlFor="tipoOperazione">Tipo Operazione: </label>
                </div>
                <input type='hidden' value={formValues.tipoOperazione ? formValues.tipoOperazione : undefined} name='tipoOperazione' disabled={(formValues.tipoAttivita != "TRASPORTO") && (formValues.tipoAttivita != "INTERMEDIAZIONE")} />
              </div>
            )}
            {!formValues.isStoccaggioInstant && (
              <div className='col-4'>
                <div className="form-floating">
                  <select className="form-select" id="causaleOperazione" name='causaleOperazione' onChange={handleChange}
                    value={formValues.tipoAttivita === "TRASPORTO" ? "tAT" : formValues.tipoAttivita === "INTERMEDIAZIONE" ? "TRI" : formValues.causaleOperazione ? formValues.causaleOperazione : ""}
                    disabled={formValues.tipoAttivita === "TRASPORTO" || formValues.tipoAttivita === "INTERMEDIAZIONE"}>
                    <option value="" disabled>Seleziona</option>
                    <option value="TRI" hidden>TR - Intermediario</option>
                    <option value="tAT" hidden>T*aT - Trasporto</option>
                    {causali.map((causale) => (
                      <option key={causale.codice} value={causale.codice}>{causale.codice + " - " + causale.descrizione}</option>
                    ))}
                  </select>
                  <label htmlFor="causaleOperazione">Causale Operazione: </label>
                </div>
                <input type='hidden' value={formValues.causaleOperazione ? formValues.causaleOperazione : undefined} name='causaleOperazione' disabled={(formValues.tipoAttivita != "TRASPORTO") && (formValues.tipoAttivita != "INTERMEDIAZIONE")} />
              </div>
            )}
            {formValues.isStoccaggioInstant && (
              <div className='col-4'>
                <InputFloating name="dataCalcoloStoccaggio" label='Data Calcolo Stoccaggio' type='date' required
                  value={formValues.dataCalcoloStoccaggio ? new Date(formValues.dataCalcoloStoccaggio).toISOString().split('T')[0] : ''} onChange={handleChange} />
              </div>
            )}
          </div>
          {!formValues.isStoccaggioInstant && (
            <div className="row g-2 mt-2">
              <div className="col-12">
                <InputFloating name="riferimentoRegistrazione" label="Riferimento Registrazione (es '2024/1-2024/2...')" type='text' defaultValue={progressivi ? progressivi.join("-") : ""} onChange={handleChange} disabled={formValues.tipoOperazione === "CARICO"} />
              </div>
            </div>
          )}

        </AccordionItem>
        <AccordionItem parentId='registrazione' title='Identificazione del rifiuto'>
          <div className="row g-2 mt-2">
            <div className="col-8">
              <EERSelectorFormComponent data={formValues.rifiuto?.codiceEER} onChange={handleEERChange} />
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="provenienzaRifiuto" name='provenienzaRifiuto' onChange={handleRifiutoChange} value={formValues.rifiuto?.provenienzaRifiuto ?? ""} required disabled={formValues.tipoAttivita === "INTERMEDIAZIONE"}>
                  <option value="" disabled>Seleziona</option>
                  {provenienzaRifiuto.map((provenienza) => (
                    <option key={provenienza.code} value={provenienza.code}>{provenienza.name}</option>
                  ))}
                </select>
                <label htmlFor="provenienzaRifiuto">Provenienza Rifiuto (*)</label>
              </div>
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-8">
              <InputFloating name='descrizioneRifiuto' label='Descrizione' type='text' onChange={handleRifiutoChange} value={formValues.rifiuto?.descrizione ?? undefined} disabled />
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="pericoloRifiuto" name='pericoloRifiuto' onChange={handleRifiutoChange} value={formValues.rifiuto?.pericoloRifiuto ?? ""} disabled >
                  <option value="">Seleziona</option>
                  {pericoliRifiuto.map((pericolo) => (
                    <option key={pericolo.code} value={pericolo.code}>{pericolo.name}</option>
                  ))}
                </select>
                <label htmlFor="pericoloRifiuto">Caratt. di pericolo (HP): </label>
              </div>
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="statoFisico" name='statoFisico' onChange={handleRifiutoChange} value={formValues.rifiuto?.statoFisicoRifiuto} required>
                  <option value="" disabled>Seleziona</option>
                  {statiFisiciRifiuto.map((stato) => (
                    <option key={stato.code} value={stato.code}>{stato.name}</option>
                  ))}
                </select>
                <label htmlFor="statoFisico">Stato Fisico (*) </label>
              </div>
            </div>
            <div className="col-3">
              <InputFloating label='Quantità (*)' type='number' name='quantita' onChange={handleRifiutoChange} required value={formValues.rifiuto?.quantita?.toString() ?? ""} />
            </div>
            <div className="col-1">
              <div className="form-floating">
                <select className="form-select" id="unitaMisura" name='unitaMisura' onChange={handleRifiutoChange} value={formValues.rifiuto?.unitaDiMisura} required>
                  <option value="" disabled>Seleziona</option>
                  {unitaDiMisura.map((unita) => (
                    <option key={unita.code} value={unita.code}>{unita.code.toUpperCase()}</option>
                  ))}
                </select>
                <label htmlFor="unitaMisura">Unita di Misura (*) </label>
              </div>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select className="form-select" id="destinazioneRifiuto" name='destinazioneRifiuto' onChange={handleRifiutoChange} value={formValues.rifiuto?.destinazioneRifiuto ?? ""} required
                        disabled={formValues.tipoOperazione === "CARICO" && (formValues.tipoAttivita !== "SMALTIMENTO" || formValues.tipoAttivita !== "RECUPERO"}>
                  <option value="" disabled>Seleziona</option>
                  {attivitaADestinazione.map((attivita) => (
                    <option key={attivita.code} value={attivita.code}>{attivita.code}</option>
                  ))}
                </select>
                <label htmlFor="destinazioneRifiuto">Destinato a (*) </label>
              </div>
            </div>
          </div>
          {(formValues.causaleOperazione === "aT" || formValues.causaleOperazione === "T") && (
            <div className="row g-2 mt-2">
              <div className="col-4">
                <div className="form-floating">
                  <MultiSelectDropdown label='Categoria AEE' name='categoriaRAEE' options={opzioniAEE} value={formValues.rifiuto?.categoriaRAAE ? formValues.rifiuto.categoriaRAAE : []} onChange={handleCategoriaAEEChange} />
                </div>
              </div>
              <input type="hidden" name="categorieAEEJSON" defaultValue={JSON.stringify(formValues.rifiuto?.categoriaRAAE || [])} />
            </div>

          )}

          {(formValues.tipoOperazione == "CARICO" && formValues.causaleOperazione === "T") && (
            <div className='row g-2 mt-3'>
              <div className="col-2">
                <InputCheckbox label='Veicolo fuori uso' name='isVeicoloFuoriUso' onChange={handleCheckboxChange} checked={formValues.isVeicoloFuoriUso ?? false} />
              </div>
              <div className="col-3">
                <InputFloating label='Numero Registrazione Pubblica Sicurezza' name='numeroRegistrazionePubblicaSicurezza' onChange={handleChange} type='text' value={formValues.numeroRegistrazionePubblicaSicurezza ?? undefined} disabled={!formValues.isVeicoloFuoriUso} />
              </div>
              <div className="col-3">
                <InputFloating label='Data Registrazione Pubblica Sicurezza' name='dataRegistrazionePubblicaSicurezza' onChange={handleChange} type='date' value={formValues.dataRegistrazionePubblicaSicurezza ? new Date(formValues.dataRegistrazionePubblicaSicurezza).toISOString().split('T')[0] : ''} disabled={!formValues.isVeicoloFuoriUso} />
              </div>
            </div>
          )}

        </AccordionItem>
        {!(formValues.causaleOperazione === 'NP' || formValues.causaleOperazione === "I" || formValues.causaleOperazione === "M") && (
          <AccordionItem parentId='registrazione' title='Integrazione FIR' >
            <div className="row g-2 mt-3">
              <div className="col-12">
                <InputCheckbox label='Inserisci Integrazione FIR' name='isIntegratoFIR' onChange={handleCheckboxChange} checked={formValues.isIntegratoFIR ?? false} />
              </div>
            </div>
            <div className="row g-2 mt-3">
              <div className="col-6">
                <InputFloating label='Numero FIR (*)' type='text' name='numeroFIR' required onChange={handleChange} value={formValues.numeroFIR ?? undefined} disabled={!formValues.isIntegratoFIR} />
              </div>
              <div className="col-2">
                <InputCheckbox label='Trasporto Transfrontaliero' name='trasportoFrontaliero' onChange={handleCheckboxChange} disabled={!formValues.isIntegratoFIR} checked={formValues.trasportoFrontaliero ?? false} />
              </div>
              {formValues.trasportoFrontaliero && (
                <div className="col-2">
                  <div className="form-floating">
                    <select className="form-select" id="tipoTrasporto" name='tipoTrasporto' onChange={handleChange} value={formValues.tipoTrasportoFrontaliero ?? undefined} disabled={!formValues.isIntegratoFIR}>
                      <option value="" disabled>Seleziona</option>
                      {tipiTrasportoTrans.map((trasporto) => (
                        <option key={trasporto.code} value={trasporto.code}>{trasporto.name}</option>
                      ))}
                    </select>
                    <label htmlFor="tipoTrasporto">Tipo trasporto</label>
                  </div>
                </div>
              )}
              <div className="col-2">
                <InputFloating name="dataInizioTrasporto" label='Data Inizio Trasporto (*)' type='date' required
                  value={formValues.dataInizioTrasporto ? new Date(formValues.dataInizioTrasporto).toISOString().split('T')[0] : ''} onChange={handleChange} disabled={!formValues.isIntegratoFIR} />
              </div>
            </div>
          </AccordionItem>
        )}
        <AccordionItem parentId='registrazione' title='Esito conferimento'>
          <div className="row g-2 mt-3">
            <div className="col-12">
              <InputCheckbox label='Aggiungi esito conferimento' name='isConferito' onChange={handleConferitoChange} checked={formValues.isConferito ?? false} />
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-4">
              <InputFloating type='date' label='Data Fine Trasporto (*)' name='dataFineTrasporto' value={formValues.dataFineTrasporto ? new Date(formValues.dataFineTrasporto).toISOString().split('T')[0] : ''} onChange={handleChange} disabled={!formValues.isConferito} required />
            </div>
            <div className="col-4">
              <InputFloating type='text' label='Peso Verificato a Destino (*)' name='pesoADestino' value={formValues.pesoADestino?.toString() ?? undefined} onChange={handleChange} disabled={!formValues.isConferito} required />
            </div>
            <div className="col-4">
              <InputCheckbox label='Aggiungi Respingimento' name='isRespinto' disabled={!formValues.isConferito} onChange={handleCheckboxChange} checked={formValues.isRespinto ?? false} />
            </div>
          </div>
          {formValues.isRespinto && (
            <div>
              <div className="row g-2 mt-2">
                <div className="col-4">
                  <div className="form-floating">
                    <select className="form-select" id="tipologiaRespingimento" name='tipologiaRespingimento' onChange={handleChange} value={formValues.tipologiaRespingimento ?? undefined}>
                      <option value="" disabled>Seleziona</option>
                      {tipiRespingimento.map((tipo) => (
                        <option key={tipo.code} value={tipo.code}>{tipo.name}</option>
                      ))}
                    </select>
                    <label htmlFor="tipologiaRespingimento">Tipologia respingimento</label>
                  </div>
                </div>
                <div className="col-4">
                  <InputFloating type='number' label='Quantità (*)' name='quantitaRespingimento' onChange={handleChange} value={formValues.quantitaRespingimento?.toString()} />
                </div>
                <div className="col-4">
                  <div className="form-floating">
                    <select className="form-select" id="unitaDiMisuraRespingimento" name='unitaDiMisuraRespingimento' onChange={handleChange} value={formValues.unitaDiMisuraRespingimento ?? undefined}>
                      <option value="" disabled>Seleziona</option>
                      {unitaDiMisura.map((unita) => (
                        <option key={unita.code} value={unita.code}>{unita.code.toUpperCase()}</option>
                      ))}
                    </select>
                    <label htmlFor="unitaDiMisuraRespingimento">UM (*)</label>
                  </div>
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col-4">
                  <div className="form-floating">
                    <select className="form-select" id="causaleRespingimento" name='causaleRespingimento' onChange={handleChange} value={formValues.causaleRespingimento ?? undefined}>
                      <option value="" disabled>Seleziona</option>
                      {causaliRespingimento.map((causale) => (
                        <option key={causale.code} value={causale.code}>{causale.name}</option>
                      ))}
                    </select>
                    <label htmlFor="causaleRespingimento">Causale (*)</label>
                  </div>
                </div>
                <div className="col-8">
                  <InputFloating type='text' name='causaleRespingimentoDesc' label='Causale (altro)' onChange={handleChange} value={formValues.causaleRespingimentoDesc ?? undefined} disabled={!(formValues.causaleRespingimento === "ALTRO")} />
                </div>
              </div>
            </div>
          )}
        </AccordionItem>
        <AccordionItem parentId='registrazione' title='Annotazioni'>
          <div className="row g-2 mt-3">
            <div className="col-12">
              <div className="form-floating">
                <textarea className="form-control textarea-custom" placeholder="Annotazioni" id="annotazioni" name='annotazioni' value={formValues.annotazioni} onChange={handleChange}></textarea>
                <label htmlFor="annotazioni">Annotazioni Registrazione</label>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default RegistrazioneForm;
