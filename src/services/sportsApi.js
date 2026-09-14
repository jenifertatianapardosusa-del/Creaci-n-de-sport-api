const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export async function searchTeams(query) {
  const clean = query.trim();

  if (!clean) return [];

  const res = await fetch(
    `${BASE_URL}/searchteams.php?t=${encodeURIComponent(clean)}`
  );

  if (!res.ok) {
    throw new Error("No se pudo conectar con la API de deportes.");
  }

  const data = await res.json();

  console.log("RESPUESTA COMPLETA DE LA API:", data);
  console.log("EQUIPOS COMPLETOS:", JSON.stringify(data.teams, null, 2));

  return data.teams ?? [];
}

export async function getLastEvents(teamId) {
  const res = await fetch(`${BASE_URL}/eventslast.php?id=${teamId}`);

  if (!res.ok) {
    throw new Error("No se pudieron cargar los últimos partidos.");
  }

  const data = await res.json();

  return data.results ?? [];
}