import { useState } from "react";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", gymName: "", contact: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    try {
      setSending(true);
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send message.");

      setStatus({ type: "success", message: "Message sent successfully. We will get back to you soon." });
      setFormData({ name: "", gymName: "", contact: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Server is not running." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-overlay" />
      <div className="contact-container">
        <div className="contact-left">
          <span className="contact-badge">GET IN TOUCH</span>
          <h2>Let&apos;s automate<br />with<br />WhatsApp<br />reminders for<br />your gym.</h2>
          <p className="contact-description">
            Have questions about our CRM, pricing, custom setups, or importing your existing sheet?
            Let&apos;s chat. We reply within 2 hours.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-card">
              <div className="contact-icon"><Mail size={25} /></div>
              <div><span>EMAIL US</span><strong>support@gymshakti.in</strong></div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><MessageSquare size={25} /></div>
              <div><span>WHATSAPP SUPPORT</span><strong>+91 72490 45485</strong></div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Phone size={25} /></div>
              <div><span>CALL US</span><strong>+91 72490 45485</strong></div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><MapPin size={25} /></div>
              <div><span>OUR HQ</span><strong>Nagpur, Maharashtra, India</strong></div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label>YOUR NAME *</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Rahul Verma" required />
              </div>
              <div className="contact-field">
                <label>GYM NAME</label>
                <input name="gymName" value={formData.gymName} onChange={handleChange} placeholder="GymShakti Fitness" />
              </div>
            </div>

            <div className="contact-field">
              <label>EMAIL / PHONE *</label>
              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="rahul@gym.in or +91 98765 43210" required />
            </div>

            <div className="contact-field">
              <label>HOW CAN WE HELP? *</label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder="Tell us about your gym, how many members you manage, and any specific questions you have..."
                rows="5" required />
            </div>

            {status.message && <p className={`contact-status ${status.type}`}>{status.message}</p>}

            <button className="contact-submit" type="submit" disabled={sending}>
              <Send size={19} />
              <span>{sending ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
