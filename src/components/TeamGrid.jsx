import TeamCard from "./TeamCard";

export default function TeamGrid({ teams, onSelect }) {
  return (
    <div className="team-grid">
      {teams.map((team) => (
        <TeamCard key={team.idTeam} team={team} onSelect={onSelect} />
      ))}
    </div>
  );
}