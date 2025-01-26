"use client"
import React, { useState, ChangeEvent } from 'react';
import InputFloating from './InputFloating';
import { CodificheStatiResponse, CodificheComuniResponse } from '../rentri';
import Select, { ActionMeta, SingleValue } from 'react-select';
import InputWithIcon from './InputWithIcon';

export interface SelettoreComuniData {
  country: string | null;
  region: string | null;
  province: string | null;
  comune: string | null;
  cap: string | null;
}

interface FormatoState {
  value: CodificheComuniResponse;
  label: string;
}

interface SelettoreComuniProps {
  onChange: (data: SelettoreComuniData) => void;
  comuni: CodificheComuniResponse[];
  stati: CodificheStatiResponse[];
}

const SelettoreComuniNuovo: React.FC<SelettoreComuniProps> = ({ onChange, comuni, stati }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>("ITALIA");
  const [selectedRegion, setSelectedRegionText] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvinceText] = useState<string | null>(null);
  const [selectedComune, setSelectedComuneText] = useState<string | null>(null);
  const [cap, setCap] = useState<string>("");

  const [comuniFiltered, setComuniFiltered] = useState<FormatoState[]>([]);

  const notifyChange = () => {
    onChange({
      country: selectedCountry,
      region: selectedRegion,
      province: selectedProvince,
      comune: selectedComune,
      cap: cap
    });
  };

  const formattedStati = stati.map(stato => ({
    value: stato.name,
    label: stato.name
  }));

  const handleCountryChange = (selectedOption: SingleValue<any>, action: ActionMeta<any>) => {
    setSelectedCountry(selectedOption.value);
    notifyChange();
  };

  const handleComuneChange = (selectedOption: SingleValue<any>, action: ActionMeta<any>) => {
    setSelectedRegionText("N/A");
    setSelectedProvinceText(selectedOption.value.properties.cciaa);
    setSelectedComuneText(selectedOption.value.name);
    notifyChange();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = comuni.filter(comune =>
      comune.name.toLowerCase().includes(searchTerm)
    );
    setComuniFiltered(filtered.map(comune => ({
      value: comune,
      label: `${comune.name} (${comune.properties.cciaa})`
    })));
  };

  React.useEffect(() => {
    notifyChange();
  }, [
    cap,
    selectedComune,
    selectedProvince,
    selectedRegion,
    selectedCountry
  ]);

  return (
    <div className="row g-2">
      <div className='col-12'>
        <div className="form-floating">
          <Select
            className='z-10'
            options={formattedStati}
            placeholder="Seleziona stato"
            value={{ value: selectedCountry, label: selectedCountry }}
            onChange={handleCountryChange}
          />
        </div>
      </div>
      {selectedCountry == "ITALIA" ? (
        <section>
          <InputWithIcon 
            className='z-9 mb-2'
            placeholder="Ricerca comuni..." 
            type='text' name='search' 
            iconName='search' 
            onChange={handleSearch} 
            required 
          />
          <Select
            className='z-9 mb-2'
            options={comuniFiltered}
            placeholder="Seleziona comune dai risultati della ricerca..."
            onChange={handleComuneChange}
            isSearchable={false}
          />
          <InputWithIcon placeholder="Inserisci il CAP..." name='cap' type='text' iconName='geo' onChange={(e) => {
            setCap(e.target.value);
            notifyChange();
          }} required />
        </section>
      ) : (
        <div className='col-12'>
          <div className="row g-2">
            <div className='col-6'>
              <InputFloating label="Regione / Stato" name='regione' type='text' onChange={(e) => {
                setSelectedRegionText(e.target.value);
                notifyChange();
              }} required />
            </div>
            <div className='col-6'>
              <InputFloating label="Provincia" name='provincia' type='text' onChange={(e) => {
                setSelectedProvinceText(e.target.value);
                notifyChange();
              }} required />
            </div>
            <div className='col-9'>
              <InputFloating label="Comune" name='comune' type='text' onChange={(e) => {
                setSelectedComuneText(e.target.value);
                notifyChange();
              }} required />
            </div>
            <div className='col-3'>
              <InputFloating label="CAP" name='cap' type='text' onChange={(e) => {
                setCap(e.target.value);
                notifyChange();
              }} required />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SelettoreComuniNuovo;
