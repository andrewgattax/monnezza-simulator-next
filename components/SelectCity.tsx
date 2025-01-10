import React, { useState } from "react";

export default function CityInput() {
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Lista delle città disponibili
  const cities = [
    "Milano",
    "Roma",
    "Torino",
    "Napoli",
    "Firenze",
    "Bologna",
    "Venezia",
    "Palermo",
    "Cagliari",
    "Verona",
  ];

  // Aggiorna la lista filtrata mentre l'utente digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtra le città in base al valore inserito
    const filtered = cities.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // Gestisce la selezione di una città
  const handleCitySelect = (city: string) => {
    setInputValue(city); // Aggiorna il valore dell'input
    setFilteredCities([]); // Nasconde il dropdown
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <label htmlFor="city-input">Seleziona la città</label>
      <input
        type="text"
        id="city-input"
        className="form-control"
        placeholder="Digita il nome di una città..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* Dropdown dei suggerimenti */}
      {filteredCities.length > 0 && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          {filteredCities.map((city) => (
            <li key={city}>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
