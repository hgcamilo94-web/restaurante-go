import restauranteImg from "../assets/restaurante.jpg";

function HeroSection() {
  const titulo = "Sabores que llegan hasta ti";

  const descripcion =
    "Descubre nuestros productos y disfruta de una experiencia gastronómica sencilla y deliciosa.";

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">RestauranteGo</span>

        <h1>{titulo}</h1>

        <p>{descripcion}</p>

        <button className="primary-button">
          Ver nuestro menú
        </button>
      </div>

      <div className="hero-image">
        <img
          src={restauranteImg}
          alt="Comida del restaurante"
        />
      </div>
    </section>
  );
}

export default HeroSection;