import { useEffect, useState } from "react";
import { getLastEvents } from "../services/sportsApi";
import Loader from "./loader";

export default function TeamDetail({ team, onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getLastEvents(team.idTeam)
      .then((data) => {
        if (active) setEvents(data);
      })
      .catch(() => {
        if (active) setError("No se encontraron partidos recientes para este equipo.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [team.idTeam]);

  const description = team.strDescriptionEN
    ? team.strDescriptionEN.slice(0, 420) + (team.strDescriptionEN.length > 420 ? "…" : "")
    : null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(event) => event.stopPropagation()}>
        <button className="detail-panel__close" onClick={onClose} aria-label="Cerrar ficha del equipo">
          ✕
        </button>

        <div className="detail-panel__header">
          {team.strTeamBadge && (
            <img src={team.strTeamBadge} alt="" className="detail-panel__badge" />
          )}
          <div>
            <h2>{team.strTeam}</h2>
            <p>{[team.strLeague, team.strCountry].filter(Boolean).join(" · ")}</p>
          </div>
        </div>

        <dl className="detail-panel__facts">
          <div>
            <dt>Estadio</dt>
            <dd>{team.strStadium || "Sin datos"}</dd>
          </div>
          <div>
            <dt>Capacidad</dt>
            <dd>{team.intStadiumCapacity || "Sin datos"}</dd>
          </div>
          <div>
            <dt>Fundado</dt>
            <dd>{team.intFormedYear || "Sin datos"}</dd>
          </div>
        </dl>

        {description && <p className="detail-panel__description">{description}</p>}

        <h3 className="detail-panel__subtitle">Últimos partidos</h3>

        {loading && <Loader />}
        {error && <p className="detail-panel__error">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="detail-panel__empty">Sin partidos recientes registrados.</p>
        )}

        <ul className="events-list">
          {events.slice(0, 5).map((event) => (
            <li key={event.idEvent}>
              <span className="events-list__date">{event.dateEvent}</span>
              <span className="events-list__match">
                {event.strHomeTeam} {event.intHomeScore ?? "–"} : {event.intAwayScore ?? "–"} {event.strAwayTeam}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}