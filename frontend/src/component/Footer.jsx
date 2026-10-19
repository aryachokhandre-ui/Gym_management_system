
import "./Footer.css";

function Footer() {
  return (
    <footer className="gym-footer">
      <div className="gym-footer-container">

        <div className="gym-footer-grid">

          {/* BRAND */}
          <div className="gym-footer-brand">
            <a href="#home" className="gym-footer-logo">
              <span className="gym-footer-logo-icon">S</span>
              <span>GymShakti</span>
            </a>

            <p>
              Gym management software
              <br />
              built for Indian strength clubs.
              <br />
              CRM, billing, attendance, and
              <br />
              WhatsApp — one screen.
            </p>

            <div className="gym-footer-made">
              Made in India <span>IN</span>
            </div>
          </div>

          {/* SOLUTIONS */}
          <div className="gym-footer-column">
            <h4>SOLUTIONS</h4>
            <a href="#features">Gym Software India</a>
            <a href="#product-demo">Billing &amp; GST Invoicing</a>
            <a href="#product-demo">QR Attendance Logs</a>
            <a href="#product-demo">WhatsApp Reminders</a>
            <a href="#features">Membership Lifecycles</a>
            <a href="#features">Gym Sales CRM</a>
          </div>

          {/* CITIES */}
          <div className="gym-footer-column">
            <h4>CITIES</h4>
            <a href="#contact">Gym Software Mumbai</a>
            <a href="#contact">Gym Software Bangalore</a>
            <a href="#contact">Gym Software Nagpur</a>
            <a href="#contact">Gym Software Pune</a>
            <a href="#contact">Gym Software Hyderabad</a>
          </div>

          {/* COMPANY */}
          <div className="gym-footer-column">
            <h4>COMPANY</h4>
            <a href="#product-demo">Interactive Demo</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing Plans</a>
            <a href="#home">GymShakti Blog</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#refund">Refund Policy</a>
          </div>

          {/* SUPPORT */}
          <div className="gym-footer-column">
            <h4>SUPPORT</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:support@yourdomain.com">Email Support</a>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Support
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="gym-footer-bottom">
          <p>
            © {new Date().getFullYear()} GymShakti Studio. All rights reserved.
          </p>

          <div className="gym-footer-powered">
            Developed by{" "}
            <a href="#home">Arya Chokhandre</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
