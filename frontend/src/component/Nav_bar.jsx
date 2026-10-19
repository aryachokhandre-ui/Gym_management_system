import { useState } from "react";
import "./Navbar.css";

function Nav_bar({ onTryFree }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <a href="#home">
          <span>GYM</span>SAKTI
        </a>
      </div>


      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <a
          href="#product-demo"
          onClick={() => setMenuOpen(false)}
        >
          Product Demo
        </a>

        <a
          href="#features"
          onClick={() => setMenuOpen(false)}
        >
          Features
        </a>

        <a
          href="#pricing"
          onClick={() => setMenuOpen(false)}
        >
          Pricing
        </a>

        <a
          href="#faq"
          onClick={() => setMenuOpen(false)}
        >
          FAQ
        </a>

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>

      </div>


      {/* Right Buttons */}
      <div className="navbar-buttons">

        {/* WhatsApp */}
        <a
          href="https://wa.me/919067978761"
          target="_blank"
          rel="noopener noreferrer"
          className="call-btn"
        >
          📞Call Us
        </a>


        {/* Try Free */}
        <button
          className="try-btn"
          onClick={onTryFree}
        >
          Try Free
        </button>

      </div>


      {/* Mobile Menu */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

    </nav>
  );
}

export default Nav_bar;