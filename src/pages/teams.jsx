import { useCallback, useState } from "react";
import TeamGrid from "../components/TeamGrid";
import TeamDetail from "../components/TeamDetail";
import Loader from "../components/loader";
import EmptyState from "../components/EmptyState";
import { searchTeams } from "../services/sportsApi";

export default function Teams() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (event) => {
    event.preventDefault();

    const clean = query.trim();

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
  }, [query]);

  return (
    <main className="page">
      <section className="page__header">
        <span className="page__eyebrow">
          EXPLORAR
        </span>

        <h1>Equipos</h1>

        <p>
          Busca equipos deportivos y consulta su información.
        </p>

        <form
          className="page__search"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar equipo..."
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </section>

      <section className="app__content">
        {loading && <Loader />}

        {!loading && error && (
          <EmptyState
            title="Algo salió del campo"
            message={error}
          />
        )}

        {!loading &&
          !error &&
          searched &&
          teams.length === 0 && (
            <EmptyState
              title="Sin resultados"
              message={`No encontramos equipos para "${query}".`}
            />
          )}

        {!loading &&
          !error &&
          !searched && (
            <EmptyState
              title="Busca un equipo"
              message="Escribe el nombre de un equipo para comenzar."
            />
          )}

        {!loading &&
          !error &&
          teams.length > 0 && (
            <TeamGrid
              teams={teams}
              onSelect={setSelectedTeam}
            />
          )}
      </section>

      {selectedTeam && (
        <TeamDetail
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </main>
  );
}
