import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(savedFavorites);
  }, []);

  // Eliminar un equipo de favoritos
  const removeFavorite = (idTeam) => {
    const updatedFavorites = favorites.filter(
      (team) => team.idTeam !== idTeam
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  };

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h1>Mis favoritos</h1>

        <p>
          {favorites.length === 0
            ? "No tienes equipos favoritos."
            : `${favorites.length} ${
                favorites.length === 1
                  ? "equipo favorito"
                  : "equipos favoritos"
              }`}
        </p>
      </div>

      {/* No hay favoritos */}
      {favorites.length === 0 && (
        <div className="favorites-empty">
          <div className="favorites-empty__icon">
            ☆
          </div>

          <h2>No tienes favoritos todavía</h2>

          <p>
            Agrega equipos a favoritos desde su ficha
            para verlos aquí.
          </p>
        </div>
      )}

      {/* Lista de favoritos */}
      {favorites.length > 0 && (
        <div className="favorites-grid">
          {favorites.map((team) => (
            <article
              className="favorite-card"
              key={team.idTeam}
            >
              {/* Escudo */}
              {team.strBadge && (
                <img
                  src={team.strBadge}
                  alt={`Escudo de ${team.strTeam}`}
                  className="favorite-card__badge"
                />
              )}

              {/* Información */}
              <div className="favorite-card__info">
                <h2>{team.strTeam}</h2>

                <p>
                  {[team.strLeague, team.strCountry]
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                {team.strStadium && (
                  <span>
                    🏟️ {team.strStadium}
                  </span>
                )}
              </div>

              {/* Eliminar */}
              <button
                className="favorite-card__remove"
                onClick={() =>
                  removeFavorite(team.idTeam)
                }
              >
                ★ Quitar
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
