export default function Matches() {
  return (
    <main className="page">
      <section className="page__header">
        <span className="page__eyebrow">
          RESULTADOS
        </span>

        <h1>Partidos</h1>

        <p>
          Consulta partidos recientes y próximos eventos deportivos.
        </p>
      </section>

      <section className="matches-section">
        <div className="matches-section__empty">
          <span>⚽</span>

          <h2>Partidos próximamente</h2>

          <p>
            Aquí mostraremos los partidos obtenidos desde la API.
          </p>
        </div>
      </section>
    </main>
  );
}
