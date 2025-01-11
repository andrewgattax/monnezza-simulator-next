"use client"
import React, { useState, ChangeEvent } from 'react';
import data from '../comuniDb.json';
import countryData from "../countryDb.json";
import InputFloating from './InputFloating';

interface Comune {
  nome: string;
  cap: string[];
}

interface Provincia {
  sigla: string;
  comuni: Comune[];
}

interface Regione {
  nome: string;
  province: Provincia[];
}

interface Country {
  name: string;
  code: string;
}

const SelettoreComuni: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>({
    name: "Italia",
    code: "IT"
  });
  const [selectedRegion, setSelectedRegion] = useState<Regione | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Provincia | null>(null);
  const [selectedComune, setSelectedComune] = useState<Comune | null>(null);
  const [capList, setCapList] = useState<string[]>([]);

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const country = countryData.find((c: Country) => c.name === e.target.value);
    setSelectedCountry(country || null)
    setSelectedRegion(null);
    setSelectedProvince(null);
    setSelectedComune(null);
    setCapList([]);
  };

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const region = data.find((r: Regione) => r.nome === e.target.value);
    setSelectedRegion(region || null);
    setSelectedProvince(null);
    setSelectedComune(null);
    setCapList([]);
  };

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (selectedRegion) {
      const province = selectedRegion.province.find((p: Provincia) => p.sigla === e.target.value);
      setSelectedProvince(province || null);
      setSelectedComune(null);
      setCapList([]);
    }
  };

  const handleComuneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (selectedProvince) {
      const comune = selectedProvince.comuni.find((c: Comune) => c.nome === e.target.value);
      setSelectedComune(comune || null);
      setCapList(comune ? comune.cap : []);
    }
  };

  return (
    <div className="row g-2">
      <div className='col-3'>
        <div className="form-floating">
          <select className="form-select" id="country" name='nazione' onChange={handleCountryChange} defaultValue="Italia">
            {countryData.map((country: Country) => (
              <option key={country.code} value={country.name}>{country.name}</option>
            ))}
          </select>
          <label htmlFor="region">Stato: </label>
        </div>
      </div>
      {selectedCountry?.code == "IT" ? (
        <div className='col-9'>
          <div className="row g-2">
            <div className='col-3'>
              <div className="form-floating">
                <select className="form-select" id="region" onChange={handleRegionChange} defaultValue="">
                  <option value="" disabled>Seleziona...</option>
                  {data.map((region: Regione) => (
                    <option key={region.nome} value={region.nome}>{region.nome}</option>
                  ))}
                </select>
                <label htmlFor="region">Regione: </label>
              </div>
            </div>

            <div className='col-2'>
              {selectedRegion && (
                <div className="form-floating">
                  <select className="form-select" id="province" name="provincia" onChange={handleProvinceChange} defaultValue="">
                    <option value="">Seleziona...</option>
                    {selectedRegion.province.map((province: Provincia) => (
                      <option key={province.sigla} value={province.sigla}>{province.sigla}</option>
                    ))}
                  </select>
                  <label htmlFor="province">Provincia: </label>
                </div>
              )}

              {!selectedRegion && (
                <div className="form-floating">
                  <select className="form-select" id="provinceNO" name="provincia" disabled defaultValue="">
                    <option value="">Seleziona...</option>
                  </select>
                  <label htmlFor="province">Provincia: </label>
                </div>
              )}
            </div>

            <div className='col-5'>
              {selectedProvince && (
                <div className="form-floating">
                  <select className="form-select" id="comune" name="comune" onChange={handleComuneChange} defaultValue="">
                    <option value="">Seleziona...</option>
                    {selectedProvince.comuni.map((comune: Comune) => (
                      <option key={comune.nome} value={comune.nome}>{comune.nome}</option>
                    ))}
                  </select>
                  <label htmlFor="comune">Comune: </label>
                </div>
              )}

              {!selectedProvince && (
                <div className="form-floating">
                  <select className="form-select" id="comuneNO" name="comune" disabled defaultValue="">
                    <option value="">Seleziona...</option>
                  </select>
                  <label htmlFor="comune">Comune: </label>
                </div>
              )}
            </div>

            <div className='col-2'>
              {capList.length > 0 && (
                <div className="form-floating">
                  <select className="form-select" id="cap" name="cap" defaultValue="">
                    <option value="">Seleziona...</option>
                    {capList.map((cap, index) => (
                      <option key={index} value={cap}>{cap}</option>
                    ))}
                  </select>
                  <label htmlFor="cap">CAP: </label>
                </div>
              )}

              {!(capList.length > 0) && (
                <div className="form-floating">
                  <select className="form-select" id="capNO" name="cap" disabled defaultValue="">
                    <option value="">Seleziona...</option>
                  </select>
                  <label htmlFor="cap">CAP: </label>
                </div>
              )}
            </div >
          </div>
        </div>
      ) : (
        <div className='col-9'>
          <div className="row g-2">
            <div className='col-3'>
              <InputFloating label="Regione" name='regione' type='text' required />
            </div>
            <div className='col-2'>
              <InputFloating label="Provincia" name='provincia' type='text' required />
            </div>
            <div className='col-5'>
              <InputFloating label="Comune" name='comune' type='text' required />
            </div>
            <div className='col-2'>
              <InputFloating label="CAP" name='cap' type='text' required />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SelettoreComuni;
