export default function TeamCard({ team, onSelect }) {
  return (
    <button className="team-card" onClick={() => onSelect(team)}>
      <div className="team-card__badge">
        {team.strTeamBadge ? (
          <img src={team.strTeamBadge} alt={`Escudo de ${team.strTeam}`} loading="lazy" />
        ) : (
          <span className="team-card__initial">{team.strTeam?.[0] ?? "?"}</span>
        )}
      </div>

      <div className="team-card__body">
        <h3>{team.strTeam}</h3>
        <p className="team-card__league">{team.strLeague || team.strSport}</p>
        <p className="team-card__meta">{team.strStadium || team.strCountry}</p>
      </div>
    </button>
  );
}