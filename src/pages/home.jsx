import { useCallback, useState } from "react";
import Header from "../components/header";
import TeamGrid from "../components/TeamGrid";
import TeamDetail from "../components/TeamDetail";
import Loader from "../components/loader";
import EmptyState from "../components/EmptyState";
import { searchTeams } from "../services/sportsApi";

export default function Home() {
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
    <>
      <Header
        onSearch={handleSearch}
        currentQuery={query}
      />

      <main className="app__content">
        {searched && teams.length > 0 && !loading && !error && (
          <section className="results-header">
            <div className="results-header__info">
              <span className="results-header__eyebrow">
                RESULTADOS
              </span>

              <h2>Equipos encontrados</h2>

              <p>
                Resultados para "{query}"
              </p>
            </div>

            <div className="results-header__count">
              {teams.length}
              <span> equipos</span>
            </div>
          </section>
        )}

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
              message={`No encontramos equipos para "${query}". Revisa la ortografía o intenta con otro nombre.`}
            />
          )}

        {!loading &&
          !error &&
          !searched && (
            <EmptyState
              title="Explora el mundo deportivo"
              message="Busca el nombre de un equipo para conocer su información, liga, país y últimos partidos."
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
      </main>

      {selectedTeam && (
        <TeamDetail
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </>
  );
}
