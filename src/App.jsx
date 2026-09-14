import { useCallback, useState } from "react";
import Header from "./components/header";
import TeamGrid from "./components/TeamGrid";
import TeamDetail from "./components/TeamDetail";
import Loader from "./components/loader";
import EmptyState from "./components/EmptyState";
import { searchTeams } from "./services/sportsApi";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (term) => {
    const clean = term.trim();
    setQuery(clean);
    setSearched(true);

    if (!clean) {
      setTeams([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await searchTeams(clean);
      setTeams(results);
    } catch (err) {
      setError(err.message);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app">
      <Header onSearch={handleSearch} currentQuery={query} />

      <main className="app__content">
        {loading && <Loader />}

        {!loading && error && <EmptyState title="Algo salió del campo" message={error} />}

        {!loading && !error && searched && teams.length === 0 && (
          <EmptyState
            title="Sin resultados"
            message={`No encontramos equipos para "${query}". Revisa la ortografía o intenta con otro nombre.`}
          />
        )}

        {!loading && !error && !searched && (
          <EmptyState
            title="Aún no hay búsqueda"
            message="Escribe el nombre de un equipo o elige una sugerencia para ver su ficha."
          />
        )}

        {!loading && !error && teams.length > 0 && (
          <TeamGrid teams={teams} onSelect={setSelectedTeam} />
        )}
      </main>

      {selectedTeam && (
        <TeamDetail team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </div>
  );
}