function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {año} RestauranteGo. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;