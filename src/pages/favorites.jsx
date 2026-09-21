export default function Favorites() {
  return (
    <main className="page">
      <section className="page__header">
        <span className="page__eyebrow">
          TU COLECCIÓN
        </span>

        <h1>Favoritos</h1>

        <p>
          Guarda tus equipos y partidos favoritos para encontrarlos rápidamente.
        </p>
      </section>

      <section className="favorites-section">
        <div className="favorites-section__empty">
          <span>♡</span>

          <h2>Aún no tienes favoritos</h2>

          <p>
            Explora equipos y partidos y guarda los que quieras consultar después.
          </p>
        </div>
      </section>
    </main>
  );
}
