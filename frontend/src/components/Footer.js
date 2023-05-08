import React from "react";

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__author">© {new Date().getFullYear()} Максименко Михаил</p>
    </footer>
  );
}

export default Footer;