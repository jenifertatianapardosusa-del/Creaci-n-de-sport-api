import { useState } from "react";

const SUGGESTIONS = ["Barcelona", "Lakers", "Yankees", "Real Madrid", "Warriors"];

export default function Header({ onSearch, currentQuery }) {
  const [value, setValue] = useState(currentQuery ?? "");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value);
  }

  function handleSuggestion(name) {
    setValue(name);
    onSearch(name);
  }

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__mark" aria-hidden="true" />
        <h1>Marcador</h1>
      </div>

      <p className="header__tagline">
        Busca cualquier equipo del mundo y revisa su ficha al instante.
      </p>

      <form className="header__search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escribe un equipo, ej. Boca Juniors"
          aria-label="Buscar equipo"
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="header__suggestions">
        <span>Prueba:</span>
        {SUGGESTIONS.map((name) => (
          <button key={name} type="button" onClick={() => handleSuggestion(name)}>
            {name}
          </button>
        ))}
      </div>
    </header>
  );
}