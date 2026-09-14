
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

/**
 * Busca equipos por nombre (fútbol, básquet, béisbol, etc. — cualquier
 * deporte que exista en la base de TheSportsDB).
 * @param {string} query
 * @returns {Promise<object[]>}
 */
export async function searchTeams(query) {
  const clean = query.trim();
  if (!clean) return [];

  const res = await fetch(`${BASE_URL}/searchteams.php?t=${encodeURIComponent(clean)}`);
  if (!res.ok) {
    throw new Error("No se pudo conectar con la API de deportes. Intenta de nuevo.");
  }

  const data = await res.json();
  return data.teams ?? [];
}

/**
 * Devuelve los últimos partidos jugados por un equipo, dado su id.
 * @param {string} teamId
 * @returns {Promise<object[]>}
 */
export async function getLastEvents(teamId) {
  const res = await fetch(`${BASE_URL}/eventslast.php?id=${teamId}`);
  if (!res.ok) {
    throw new Error("No se pudieron cargar los últimos partidos.");
  }

  const data = await res.json();
  return data.results ?? [];
}