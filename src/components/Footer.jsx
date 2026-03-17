function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Donald Gruda</p>
      <p className="footer__copyright">© {currentYear}</p>
    </footer>
  );
}

export default Footer;
