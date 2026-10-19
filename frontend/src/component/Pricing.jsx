import { useState } from "react";
import "./Pricing.css";

function Pricing() {
  const [mode, setMode] = useState("payg");

  const payg = [
    ["Micro-gyms", "1–25 members", "₹8", "/member/month", "15 members = ₹120/mo", "Starter-tier features only. Perfect for personal trainers and new studios."],
    ["Growing gyms", "26–50 members", "₹6", "/member/month", "50 members = ₹300/mo", "Starter-tier features only. Scales with your active member list."],
    ["Starter Fixed Recommended", "51+ members", "STARTER FIXED", "Unlimited members", "₹333/mo unlimited", "Force upgrade to Starter Fixed plan. Unlimited members, best price-point."]
  ];
  const fixed = [
    ["Starter", "Up to 50 members", "₹499", "/month", "Perfect for growing gyms", "Core gym management tools for memberships, billing, check-ins and reporting."],
    ["Growth", "51–200 members", "₹999", "/month", "Most popular", "Advanced automation, payment tracking and member engagement for growing gyms."],
    ["Pro", "201+ members", "₹1,999", "/month", "Built for scale", "Powerful controls, advanced reporting and priority support for larger gyms."]
  ];
  const plans = mode === "payg" ? payg : fixed;
  const features = ["Member CRM", "Membership plans & pricing", "Manual check-in records", "GST billing & invoicing", "Expense tracker", "P&L dashboard", "1 branch included", "Email support"];

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-wrapper">
        <div className="pricing-trial-badge"><span>♔</span> 7-day free trial on all plans <b>•</b> Full features <b>•</b> No credit card required</div>

        <div className="pricing-heading">
          <h2>Choose Your <span>Gym Billing Software</span><br /><span>Plan</span></h2>
        </div>

        <div className="pricing-toggle">
          <button type="button" className={mode === "payg" ? "active" : ""} onClick={() => setMode("payg")}>PAY-AS-YOU-GO</button>
          <button type="button" className={mode === "fixed" ? "active" : ""} onClick={() => setMode("fixed")}>FIXED PLANS</button>
        </div>

        <p className="pricing-intro">Choose the billing structure that scales with your gym. Pay yearly to save<br className="pricing-desktop-break" /> 15%+ on premium gym management.</p>

        <div className="pricing-panel">
          <div className="pricing-panel-top">
            <div>
              <h3>{mode === "payg" ? "Pay-as-you-Go" : "Fixed Monthly Plans"}</h3>
              <p>{mode === "payg" ? "No commitment. Pay only per active member each month. Starter-tier features only. Up to 50 members maximum." : "Simple monthly pricing with predictable costs, advanced features and no per-member billing."}</p>
            </div>
            <div className="pricing-free-pill">♔ &nbsp;7 days free trial</div>
          </div>

          <div className="pricing-cards">
            {plans.map((p) => (
              <div className="pricing-card" key={p[0]}>
                <span className="pricing-card-tag">{p[0]}</span>
                <p className="pricing-members">{p[1]}</p>
                <div className={p[2].includes("FIXED") ? "pricing-fixed-price" : "pricing-price"}>{p[2]}</div>
                <p className="pricing-unit">{p[3]}</p>
                <strong className="pricing-highlight">{p[4]}</strong>
                <p className="pricing-description">{p[5]}</p>
              </div>
            ))}
          </div>

          <button className="pricing-main-button" type="button">Get Started — {mode === "payg" ? "Pay-as-you-Go" : "Choose Your Plan"}</button>

          <div className="pricing-features">
            <h4>STARTER FEATURES INCLUDED:</h4>
            <div className="pricing-feature-grid">
              {features.map((feature) => <div className="pricing-feature" key={feature}><span>✓</span><p>{feature}</p></div>)}
            </div>
          </div>
        </div>

        <p className="pricing-note">* Looking for custom integrations, POS inventory, biometric gate systems, or custom domain setups? Add-on features are available on request and billed separately on top of fixed plans.</p>

        <div className="enterprise-card">
          <div className="enterprise-content">
            <h3>Enterprise — Chains &amp; Franchises</h3>
            <p>5+ locations, franchise dashboard, volume pricing, dedicated account manager</p>
            <div className="enterprise-tags"><span>Custom pricing</span><span>White-label</span><span>Data migration</span><span>Custom SLA</span></div>
          </div>
          <button className="enterprise-button" type="button">Contact sales <span>→</span></button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
