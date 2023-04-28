import React from "react";
import "../style/footer.css";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return <footer className="footer">© Copyright Daniel Heredia {year}</footer>;
};

export default Footer;
