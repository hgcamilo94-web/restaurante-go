import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <>
      <HeroSection />

      <section className="features">
        <div className="feature-card">
          <h2>Menú variado</h2>
          <p>
            Encuentra diferentes opciones preparadas para disfrutar.
          </p>
        </div>

        <div className="feature-card">
          <h2>Pedidos sencillos</h2>
          <p>
            Consulta tus productos y organiza tus pedidos fácilmente.
          </p>
        </div>

        <div className="feature-card">
          <h2>Experiencia digital</h2>
          <p>
            Una plataforma moderna para mejorar la experiencia del cliente.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;