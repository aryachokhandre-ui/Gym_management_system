import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Pricing from "./pricing";
import Contact from "./Contact";
import Footer from "./Footer"

function Home({ showTrial, setShowTrial }) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [trialData, setTrialData] = useState({
  ownerName: "",
  gymName: "",
  contact: "",
  plan: "",
});

  const handleTrialChange = (e) => {
  const { name, value } = e.target;

  setTrialData({
    ...trialData,
    [name]: value,
  });
};

const handleClaimTrial = async () => {

  if (
    !trialData.ownerName ||
    !trialData.gymName ||
    !trialData.contact ||
    !trialData.plan
  ) {
    alert("Please fill all required fields");
    return;
  }


  if (!agreed) {
    alert("Please agree to the Terms and Policies");
    return;
  }


  try {

    const response = await axios.post(
      "http://localhost:5000/api/trial",
      {
        ownerName: trialData.ownerName,
        gymName: trialData.gymName,
        contact: trialData.contact,
        plan: trialData.plan,
        agreed: agreed,
      }
    );


    alert(response.data.message);


    // Close popup
    setShowTrial(false);


    // Reset form
    setTrialData({
      ownerName: "",
      gymName: "",
      contact: "",
      plan: "",
    });

    setAgreed(false);

  } catch (error) {

    console.log(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server is not running");
    }

  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your gym email");
      return;
    }

    alert("Welcome to your gym management journey!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [stats, setStats] = useState({
    activeMembers: 0,
    monthlyRevenue: 0,
    todayCheckins: 0,
    pendingAmount: 0,
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/dashboard/stats"),
        axios.get("http://localhost:5000/api/dashboard/activity"),
      ]);

      setStats(statsResponse.data);
      setActivities(activityResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD DATA
  // ========================================

  useEffect(() => {
    const initialFetch = setTimeout(() => {
      fetchDashboardData();
    }, 0);

    // Refresh dashboard every 10 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000);

    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, []);

  // Store your data in an array for clean, scalable code
  const statsData = [
    {
      id: 1,
      value: "50,000+",
      label: "Check-ins processed"
    },
    {
      id: 2,
      value: "₹8.4M+",
      label: "Dues collected on time"
    },
    {
      id: 3,
      value: "2,400+",
      label: "Active members managed"
    },
    {
      id: 4,
      value: "99.9%",
      label: "Platform uptime"
    }
  ];
  const [activeDemo, setActiveDemo] = useState("whatsapp");

  const [memberName, setMemberName] = useState("Rahul Verma");
  const [amount, setAmount] = useState("999");

  const handleDemoChange = (demo) => {
    setActiveDemo(demo);
  };
const [members, setMembers] = useState(120);
  const [subscription, setSubscription] = useState(999);

  // Calculation
  const monthlyRevenue = members * subscription;

  // Example: 18% monthly dues are lost because of delays
  const lostRate = 0.18;

  // Example: 82% of the lost amount can be recovered
  const recoveryRate = 0.82;

  const monthlyDuesLost = monthlyRevenue * lostRate;
  const recovered = monthlyDuesLost * recoveryRate;

  const formatMoney = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const features = [
    {
      number: "01. ATTENDANCE",
      icon: "⌗",
      title: "QR Desk Check-in in under 1 second",
      description:
        "Members scan their digital pass QR at the desk. System logs the check-in, alerts the trainer, and updates attendance streaks instantly — 100% offline-ready.",
      content: (
        <div className="feature-box">
          <div className="box-title">LIVE CHECK-INS TODAY</div>

          <div className="member-row">
            <span>Rahul Verma</span>
            <span>07:02 AM · QR Pass ✓</span>
          </div>

          <div className="member-row">
            <span>Priya Nair</span>
            <span>07:11 AM · QR Pass ✓</span>
          </div>
        </div>
      ),
    },

    {
      number: "02. WORKOUTS",
      icon: "♧",
      title: "Workout programs with version history",
      description:
        "Build structured workout programs with sets, reps, rest intervals, and YouTube links per member. Plans are version-controlled automatically so progress is never lost.",
      content: (
        <div className="feature-box">
          <div className="workout-header">
            <span>Push Day - Week 4</span>
            <b>v3 Active</b>
          </div>

          <div className="exercise-row">
            <span>Bench Press</span>
            <strong>4 × 10</strong>
          </div>

          <div className="exercise-row">
            <span>Cable Fly</span>
            <strong>3 × 15</strong>
          </div>

          <div className="exercise-row">
            <span>Shoulder Press</span>
            <strong>3 × 12</strong>
          </div>
        </div>
      ),
    },

    {
      number: "03. RETENTION",
      icon: "▢",
      title: "WhatsApp dues alerts that get paid",
      description:
        "Automated WhatsApp messages go out 7 days, 3 days, and 1 day before expiry. Members click a direct pre-filled link to pay. No awkward phone calls.",
      content: (
        <div className="feature-box whatsapp-box">
          <div className="whatsapp-icon">WA</div>

          <div className="whatsapp-message">
            Hi Rahul Verma 👋 Your membership expires in
            <strong> 7 days.</strong> Tap to renew:
            <span> gymsakti.app/pay</span>
          </div>
        </div>
      ),
    },

    {
      number: "04. ONLINE RENEWALS",
      icon: "₹",
      title: "Razorpay checkout on every phone",
      description:
        "Members renew subscriptions via UPI, card, or net banking directly from their portal. Funds settle to your bank account. Zero friction.",
      content: (
        <div className="feature-box payment-box">
          <div>
            <small>MEMBERSHIP RENEWAL</small>
            <h4>Premium Plan</h4>
          </div>

          <div className="payment-price">₹1,499</div>

          <button>Pay Now</button>
        </div>
      ),
    },

    {
      number: "05. AUTOMATION",
      icon: "⚡",
      title: "Automated member lifecycle",
      description:
        "Automate reminders, membership follow-ups, attendance alerts and important member communication without manual work.",
      content: (
        <div className="feature-box automation-box">
          <div className="automation-item">
            <span>Membership reminder</span>
            <b>Sent ✓</b>
          </div>

          <div className="automation-item">
            <span>Birthday message</span>
            <b>Scheduled</b>
          </div>

          <div className="automation-item">
            <span>Expiry notification</span>
            <b>Tomorrow</b>
          </div>
        </div>
      ),
    },

    {
      number: "06. MEMBER PWA APP",
      icon: "⌁",
      title: "Install-free Member App",
      description:
        "Members add your branded PWA to their home screen in two taps. Offline-ready QR check-in pass, workout plans, check-in history, and receipts in one place.",
      content: (
        <div className="feature-box app-box">
          <span className="phone-icon">📱</span>
          <strong>Add “GymShakti” to Home Screen</strong>
          <span className="install-arrow">→</span>
        </div>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does setup actually take?",
      answer:
        "Setup is quick and simple. Once your gym details and member information are ready, GymSakti can be configured and ready to use within a short time."
    },
    {
      question: "Can we bring in our existing member list?",
      answer:
        "Yes. You can import your existing member information so you don't have to enter every member manually. Your existing data can be organized inside the GymSakti system."
    },
    {
      question: "How does the Razorpay integration work exactly?",
      answer:
        "GymSakti connects your membership payments with Razorpay. Members can pay using UPI, cards or net banking, while payment information is recorded in your gym management system."
    },
    {
      question: "What's in the Member PWA — is it actually useful?",
      answer:
        "Yes. Members can access their digital QR check-in pass, workout plans, attendance history, membership information and payment receipts directly from their phone."
    },
    {
      question:
        "We have 3 trainers and 1 receptionist. How does staff access work?",
      answer:
        "You can provide staff members with separate access according to their responsibilities. This helps trainers, receptionists and administrators work without sharing the same account."
    },
    {
      question: "Is there a contract or setup fee?",
      answer:
        "GymSakti is designed to keep the setup simple and transparent. You can choose the plan that fits your gym without unnecessary setup complexity."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [alertSent, setAlertSent] = useState(false);

  // QR check-in state
  const [checkIns, setCheckIns] = useState([
    { id: 1, name: "Arjun Mehta", time: "07:02 AM", mode: "QR" },
    { id: 2, name: "Priya Nair", time: "07:11 AM", mode: "QR" },
    { id: 3, name: "Karan Bose", time: "07:24 AM", mode: "Manual" },
  ]);

  // Invoice states
  const [invoiceData, setInvoiceData] = useState({
    name: "Priya Nair",
    phone: "",
    plan: "Monthly Basic Plan",
    amount: "999",
    payment: "UPI",
  });

  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");


  const handleSendAlert = () => {
    if (!memberName.trim() || Number(amount) <= 0) {
      alert("Please enter the member name and a valid amount.");
      return;
    }

    setAlertSent(true);
    alert("WhatsApp alert demo generated successfully!");
  };

  const simulateCheckIn = () => {
    const names = [
      "Rahul Verma",
      "Sneha Patil",
      "Aarav Sharma",
      "Neha Joshi",
      "Rohan Deshmukh",
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];

    const time = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCheckIns((previous) => [
      { id: Date.now(), name: randomName, time, mode: "QR" },
      ...previous,
    ].slice(0, 6));
  };

  const updateInvoice = (e) => {
    setInvoiceData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setInvoiceGenerated(false);
  };

  const generateInvoice = (e) => {
    e.preventDefault();

    if (
      !invoiceData.name.trim() ||
      !Number.isFinite(Number(invoiceData.amount)) ||
      Number(invoiceData.amount) <= 0
    ) {
      alert("Enter a valid member name and amount.");
      return;
    }

    setInvoiceNumber(String(Date.now()).slice(-6));
    setInvoiceGenerated(true);
  };

  
const printInvoice = () => {
  const invoice = document.querySelector(".invoice-paper");

  if (!invoice) {
    alert("Please generate the invoice first.");
    return;
  }

  const printWindow = window.open("", "_blank", "width=800,height=700");

  if (!printWindow) {
    alert("Please allow pop-ups to print your invoice.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GymShakti Invoice</title>
        <meta charset="UTF-8" />
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 35px;
            font-family: Arial, sans-serif;
            color: #10172f;
            background: #fff;
          }

          .invoice-paper {
            width: 100%;
            max-width: 650px;
            margin: 0 auto;
            padding: 35px;
            border: 1px solid #dce4ef;
            border-radius: 14px;
          }

          .invoice-paper-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
          }

          .invoice-small-label {
            color: #00966e;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .invoice-paper-header h3 {
            margin-top: 10px;
            font-size: 25px;
          }

          .paid-stamp {
            padding: 7px 12px;
            border: 1px solid #00966e;
            color: #00966e;
            font-weight: bold;
          }

          .invoice-number {
            margin-top: 25px;
            color: #64748b;
            font-size: 13px;
          }

          .invoice-divider {
            height: 1px;
            margin: 22px 0;
            background: #dce4ef;
          }

          .invoice-detail {
            display: flex;
            flex-direction: column;
            gap: 7px;
            margin-bottom: 22px;
          }

          .invoice-detail span {
            color: #64748b;
            font-size: 13px;
          }

          .invoice-detail strong {
            overflow-wrap: anywhere;
            font-size: 15px;
          }

          .invoice-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 22px 0;
            margin-top: 15px;
            border-top: 1px solid #dce4ef;
          }

          .invoice-total strong {
            color: #008d67;
            font-size: 25px;
          }

          .invoice-print-btn {
            display: none !important;
          }

          @page {
            size: A4;
            margin: 15mm;
          }

          @media print {
            body {
              padding: 0;
            }

            .invoice-paper {
              border: 1px solid #dce4ef;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        ${invoice.outerHTML}
        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
          window.onafterprint = function() {
            window.close();
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};


  return (
    <div className="home-page-root">
      <div className="home-page">

        {/* ================= HERO SECTION ================= */}

        <section className="home-hero">

          <div className="home-glow home-glow-1"></div>
          <div className="home-glow home-glow-2"></div>

          <div className="home-content">

            <h1>
              Run your gym.
              <br />
              Not your registers.
            </h1>

            <div className="home-tagline">
              <span>Less chaos. More gains.</span>
              <div className="home-underline"></div>
            </div>

            <p className="home-description">
              Built for Indian gym owners who are done chasing fees on WhatsApp
              and marking attendance in registers. Auto-collect dues. QR
              check-ins. See everything on one screen. Start free today.
            </p>

            <form
              className="home-form"
              onSubmit={handleSubmit}
            >

              <div className="home-input-box">

                <span className="home-mail-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="What's your gym email?"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <button type="submit">
                Get Started
              </button>

            </form>

            <div className="home-features">

              <span>
                ✓ No credit card
              </span>

              <span>
                ✓ 5-minute setup
              </span>

              <span>
                ✓ Cancel any time
              </span>

            </div>

          </div>

        </section>


        {/* ================= WHATSAPP ================= */}

        <a
          href="https://wa.me/919067978761"
          target="_blank"
          rel="noreferrer"
          className="home-whatsapp"
        >
          <span>◔</span>
        </a>


        {/* ================= TOP BUTTON ================= */}

        <button
          className="home-top-button"
          onClick={scrollToTop}
        >
          ↑
        </button>

      </div>


      {/* =================================================
          FREE TRIAL MODAL
      ================================================= */}

      {showTrial && (

        <div
          className="trial-overlay"
          onClick={() => setShowTrial(false)}
        >

          <div
            className="trial-form"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ================= HEADER ================= */}

            <div className="trial-form-header">

              <p className="trial-badge">
                7 Days Free Trial
              </p>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowTrial(false)}
              >
                ×
              </button>

            </div>


            {/* ================= TITLE ================= */}

            <h2>
              Start GymShakti Trial
            </h2>

            <p className="subtitle">
              Setup takes under 5 minutes. No credit card required.
            </p>


            {/* ================= OWNER NAME ================= */}

            <label htmlFor="owner-name">
              OWNER NAME *
            </label>

            <input
              id="owner-name"
              type="text"
              name="ownerName"
              placeholder="Rahul Verma"
              value={trialData.ownerName}
              onChange={handleTrialChange}
            />


            {/* ================= GYM NAME ================= */}

            <label htmlFor="gym-name">
              GYM NAME *
            </label>

            <input
              id="gym-name"
              type="text"
              name="gymName"
              placeholder="GymShakti Fitness"
              value={trialData.gymName}
              onChange={handleTrialChange}
            />


            {/* ================= EMAIL / WHATSAPP ================= */}

            <label htmlFor="contact">
              EMAIL / WHATSAPP NUMBER *
            </label>

            <input
              id="contact"
              type="text"
              name="contact"
              placeholder="e.g. name@gym.in or +91 98765 43210"
              value={trialData.contact}
              onChange={handleTrialChange}
            />


            {/* ================= PLAN ================= */}

            <label htmlFor="plan">
              SELECT PLAN *
            </label>

            <select
              id="plan"
              name="plan"
              value={trialData.plan}
              onChange={handleTrialChange}
            >

           <option value="" disabled>
           Select Plan
           </option>

           <option value="Pay-as-you-Go">
           Pay-as-you-Go (₹8 / member / mo - Up to 25 members)
            </option>

           <option value="Per Week">
           Per Week (₹350)
           </option>

          <option value="Per Month">
           Per Month (₹1,400)
           </option>

          <option value="Per Year">
            Per Year (₹16,800)
          </option>

          </select>


            {/* ================= TERMS ================= */}

            <div className="terms">

              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={agreed}
                onChange={(e) =>
                  setAgreed(e.target.checked)
                }
              />

              <label htmlFor="terms">

                I have read and agree to the{" "}

                <a href="/terms">
                  Terms of Service
                </a>

                ,{" "}

                <a href="/privacy">
                  Privacy Policy
                </a>

                , and{" "}

                <a href="/refund">
                  Cancellation & Refund Policy
                </a>

                .

              </label>

            </div>


            {/* ================= CLAIM BUTTON ================= */}

            <button
              type="button"
              className="claim-btn"
              onClick={handleClaimTrial}
            >
              Claim My 7-Day Free Trial
            </button>

          </div>

        </div>

      )}
       <section
      className="dashboard-page"
      id="home"
    >

      {/* Background grid */}

      <div className="dashboard-grid"></div>


      {/* Browser */}

      <div className="browser-window">


        {/* ==================================
            BROWSER HEADER
        ================================== */}

        <div className="browser-header">

          <div className="browser-dots">

            <span className="dot red"></span>

            <span className="dot yellow"></span>

            <span className="dot green"></span>

          </div>


          <div className="browser-address">

            gymsakhti.app/dashboard

          </div>

        </div>


        {/* ==================================
            DASHBOARD BODY
        ================================== */}

        <div className="dashboard-body">


          {/* ==================================
              SIDEBAR
          ================================== */}

          <aside className="dashboard-sidebar">


            <div className="sidebar-logo">

              GymShakti

            </div>

<nav className="dashboard-menu">

  <button
    className={`menu-item ${
      activeMenu === "dashboard" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("dashboard")}
  >
    <span className="menu-icon">▥</span>
    <span>Dashboard</span>
  </button>


  <button
    className={`menu-item ${
      activeMenu === "members" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("members")}
  >
    <span className="menu-icon">♧</span>
    <span>Members</span>
  </button>


  <button
    className={`menu-item ${
      activeMenu === "plans" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("plans")}
  >
    <span className="menu-icon">□</span>
    <span>Plans</span>
  </button>


  <button
    className={`menu-item ${
      activeMenu === "attendance" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("attendance")}
  >
    <span className="menu-icon">⌘</span>
    <span>Attendance</span>
  </button>


  <button
    className={`menu-item ${
      activeMenu === "billing" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("billing")}
  >
    <span className="menu-icon">▭</span>
    <span>Billing</span>
  </button>


  <button
    className={`menu-item ${
      activeMenu === "staff" ? "active" : ""
    }`}
    onClick={() => setActiveMenu("staff")}
  >
    <span className="menu-icon">♢</span>
    <span>Staff</span>
  </button>

</nav>


            <div className="sidebar-owner">

              <div className="owner-label">
                OWNER
              </div>

              <div className="owner-email">
                owner@gymsakhti.in
              </div>

            </div>


          </aside>


          {/* ==================================
              MAIN
          ================================== */}

         <main className="dashboard-main">

  {/* =================================
      DASHBOARD
  ================================= */}

  {activeMenu === "dashboard" && (
    <>
      
      {/* YOUR STATS */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-title">
            ACTIVE MEMBERS
          </div>

          <div className="stat-number">
            {loading
              ? "..."
              : stats.activeMembers}
          </div>

          <div className="stat-sub">
            Members currently active
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-title">
            MONTHLY REVENUE
          </div>

          <div className="stat-number revenue">
            {loading
              ? "..."
              : `₹${formatMoney(stats.monthlyRevenue)}`}
          </div>

          <div className="stat-sub">
            ₹{formatMoney(stats.pendingAmount)} pending
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-title">
            TODAY'S CHECK-INS
          </div>

          <div className="stat-number">
            {loading
              ? "..."
              : stats.todayCheckins}
          </div>

          <div className="stat-sub">
            Check-ins today
          </div>

        </div>

      </div>


      {/* ACTIVITY */}

      <div className="activity-card">

        <div className="activity-header">

          <h2>
            Live Activity Feed
          </h2>

          <div className="live-status">

            <span></span>

            Live

          </div>

        </div>


        <div className="activity-content">

          {loading ? (

            <div className="empty-activity">
              Loading activity...
            </div>

          ) : activities.length === 0 ? (

            <div className="empty-activity">
              No activity yet
            </div>

          ) : (

            activities.map((activity) => (

              <div
                className="activity-row"
                key={activity._id}
              >

                <div className="activity-person">

                  <div className="qr-icon">
                    ⠿
                  </div>

                  <span>
                    {activity.memberName}
                  </span>

                </div>


                <div className="activity-details">

                  <span className="checked-text">
                    checked in ({activity.plan})
                  </span>

                  <span className="activity-time">
                    {activity.time}
                  </span>

                  <span
                    className={
                      activity.type === "QR"
                        ? "check-type qr"
                        : "check-type manual"
                    }
                  >
                    {activity.type}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </>
  )}


  {/* =================================
      MEMBERS
  ================================= */}

  {activeMenu === "members" && (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Members
        </h2>

      </div>

      <div className="empty-activity">

        Members section

      </div>

    </div>

  )}


  {/* =================================
      PLANS
  ================================= */}

  {activeMenu === "plans" && (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Plans
        </h2>

      </div>

      <div className="empty-activity">

        Plans section

      </div>

    </div>

  )}


  {/* =================================
      ATTENDANCE
  ================================= */}

  {activeMenu === "attendance" && (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Attendance
        </h2>

      </div>

      <div className="empty-activity">

        Attendance section

      </div>

    </div>

  )}


  {/* =================================
      BILLING
  ================================= */}

  {activeMenu === "billing" && (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Billing
        </h2>

      </div>

      <div className="empty-activity">

        Billing section

      </div>

    </div>

  )}


  {/* =================================
      STAFF
  ================================= */}

  {activeMenu === "staff" && (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Staff
        </h2>

      </div>

      <div className="empty-activity">

        Staff section

      </div>

    </div>

  )}

</main>

        </div>

      </div>

    </section>

    <section className="calculations">
      <div className="row">
        {statsData.map((stat) => (
          <div className="col-3" key={stat.id}>
            <h1>{stat.value}</h1>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>


     <section id="product-demo">
      <div className="container product-demo-container">

        {/* TOP HEADING */}
        <div className="demo-heading">
          <span className="demo-badge">INTERACTIVE DEMO</span>

          <h1>
            Try the real software.
            <br />
            Right here.
          </h1>

          <p>
            No sign-up. Click through the four core workflows your front desk
            and trainers use every day.
          </p>
        </div>

        {/* DEMO TABS */}
        <nav className="demo-tabs">
          <div className="demo-buttons">

            <button
              className={
                activeDemo === "whatsapp" ? "demo-btn active" : "demo-btn"
              }
              onClick={() => handleDemoChange("whatsapp")}
            >
              <span className="demo-icon">▢</span>
              WhatsApp Alert
            </button>

            <button
              className={activeDemo === "qr" ? "demo-btn active" : "demo-btn"}
              onClick={() => handleDemoChange("qr")}
            >
              <span className="demo-icon">⌗</span>
              QR Check-In
            </button>

            <button
              className={
                activeDemo === "invoice" ? "demo-btn active" : "demo-btn"
              }
              onClick={() => handleDemoChange("invoice")}
            >
              <span className="demo-icon">▤</span>
              Invoice Generator
            </button>

            <button
              className={activeDemo === "pwa" ? "demo-btn active" : "demo-btn"}
              onClick={() => handleDemoChange("pwa")}
            >
              <span className="demo-icon">▯</span>
              Member PWA
            </button>

          </div>
        </nav>

        {/* DEMO CONTENT */}
        <div className="pro-demo">

          {/* ================= WHATSAPP ================= */}
          {activeDemo === "whatsapp" && (
            <div className="whatsapp-demo">

              <div className="whatsapp-form">
                <h4>Automatic dues alerts via WhatsApp</h4>

                <p>
                  Enter a member's name and plan amount. Preview the WhatsApp
                  message sent seven days before membership expiry.
                </p>

                <div className="input-group">
                  <label>MEMBER NAME</label>

                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => {
                      setMemberName(e.target.value);
                      setAlertSent(false);
                    }}
                    placeholder="Rahul Verma"
                  />
                </div>

                <div className="input-group">
                  <label>SUBSCRIPTION AMOUNT (₹)</label>

                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAlertSent(false);
                    }}
                    placeholder="999"
                  />
                </div>

                <button
                  className="send-alert-btn"
                  onClick={handleSendAlert}
                >
                  ▢ {alertSent ? "Alert Generated ✓" : "Send WhatsApp Alert"}
                </button>
              </div>

              <div className="whatsapp-preview">
                <div className="phone">

                  <div className="phone-top">
                    <div className="phone-camera"></div>
                    <div className="phone-speaker"></div>
                  </div>

                  <div className="whatsapp-header">
                    <div className="gym-avatar">GS</div>

                    <div className="gym-details">
                      <strong>GymShakti</strong>
                      <small>Business Account</small>
                    </div>
                  </div>

                  <div className="whatsapp-chat">
                    <div className="message-card">
                      <p>Hi {memberName || "Rahul Verma"} 👋</p>

                      <p>
                        Your GymShakti membership expires in 7 days.
                      </p>

                      <p>
                        Renew now for ₹{amount || "999"} to keep your access
                        uninterrupted.
                      </p>

                      <p className="renew-link">👉 Renew Here</p>

                      <div className="message-time">
                        10:42 AM ✓✓
                      </div>
                    </div>
                  </div>

                  <div className="phone-bottom"></div>
                </div>
              </div>
            </div>
          )}

          {/* ================= QR CHECK-IN ================= */}
          {activeDemo === "qr" && (
            <div className="workflow-demo qr-demo">

              <div className="workflow-left">
                <h4>Check-in takes under 1 second</h4>

                <p>
                  Members hold their QR code up to any camera at the desk.
                  The system logs them instantly — no app, no typing, no card
                  swipe. Try it:
                </p>

                <button
                  className="workflow-action"
                  onClick={simulateCheckIn}
                >
                  ⌗ Simulate QR Check-In
                </button>

                <ul className="workflow-features">
                  <li>Desk scan logs member name, time, and plan</li>
                  <li>Manual check-in for phones without QR</li>
                  <li>Attendance chart auto-updates for reporting</li>
                </ul>
              </div>

              <div className="workflow-right">
                <div className="feed-title">LIVE FEED</div>

                <div className="attendance-feed">
                  {checkIns.map((item) => (
                    <div className="attendance-row" key={item.id}>
                      <strong>{item.name}</strong>

                      <div className="attendance-meta">
                        <span className="feed-time">{item.time}</span>

                        <span
                          className={
                            item.mode === "QR"
                              ? "feed-tag qr-tag"
                              : "feed-tag"
                          }
                        >
                          {item.mode}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= INVOICE GENERATOR ================= */}
          {activeDemo === "invoice" && (
            <div className="workflow-demo invoice-demo">

              <div className="workflow-left invoice-form-side">
                <h4>Generate a billing receipt instantly</h4>

                <p>
                  Fill in the member name, plan, amount, and payment mode.
                  Get a professional invoice preview.
                </p>

                <form className="invoice-form" onSubmit={generateInvoice}>

                  <div className="invoice-field">
                    <label>MEMBER NAME</label>

                    <input
                      name="name"
                      value={invoiceData.name}
                      onChange={updateInvoice}
                      placeholder="Priya Nair"
                      required
                    />
                  </div>

                  <div className="invoice-field">
                    <label>WHATSAPP NUMBER (OPTIONAL)</label>

                    <input
                      name="phone"
                      type="tel"
                      value={invoiceData.phone}
                      onChange={updateInvoice}
                      placeholder="e.g. 919876543210"
                    />
                  </div>

                  <div className="invoice-field">
                    <label>PLAN</label>

                    <select
                      name="plan"
                      value={invoiceData.plan}
                      onChange={updateInvoice}
                    >
                      <option>Monthly Basic Plan</option>
                      <option>3-Month Standard Plan</option>
                      <option>6-Month Pro Plan</option>
                      <option>12-Month Premium Plan</option>
                    </select>
                  </div>

                  <div className="invoice-two-fields">
                    <div className="invoice-field">
                      <label>AMOUNT (₹)</label>

                      <input
                        name="amount"
                        type="number"
                        min="1"
                        value={invoiceData.amount}
                        onChange={updateInvoice}
                        required
                      />
                    </div>

                    <div className="invoice-field">
                      <label>PAYMENT MODE</label>

                      <select
                        name="payment"
                        value={invoiceData.payment}
                        onChange={updateInvoice}
                      >
                        <option>UPI</option>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                  <button className="workflow-action" type="submit">
                    ▤ Generate Invoice
                  </button>

                </form>
              </div>

              <div className="workflow-right invoice-preview-side">
                {invoiceGenerated ? (
                  <div className="invoice-paper">

                    <div className="invoice-paper-header">
                      <div>
                        <span className="invoice-small-label">
                          GYMSHAKTI
                        </span>
                        <h3>Payment Receipt</h3>
                      </div>

                      <span className="paid-stamp">DEMO</span>
                    </div>

                    <p className="invoice-number">
                      Invoice #{invoiceNumber}
                    </p>

                    <div className="invoice-divider"></div>

                    <div className="invoice-detail">
                      <span>Member</span>
                      <strong>{invoiceData.name}</strong>
                    </div>

                    {invoiceData.phone && (
                      <div className="invoice-detail">
                        <span>WhatsApp</span>
                        <strong>{invoiceData.phone}</strong>
                      </div>
                    )}

                    <div className="invoice-detail">
                      <span>Membership plan</span>
                      <strong>{invoiceData.plan}</strong>
                    </div>

                    <div className="invoice-detail">
                      <span>Payment mode</span>
                      <strong>{invoiceData.payment}</strong>
                    </div>

                    <div className="invoice-total">
                      <span>Amount</span>
                      <strong>
                        ₹{Number(invoiceData.amount).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <button
                       type="button"
                       className="invoice-print-btn"
                       onClick={printInvoice}
                    >
                    Print / Save PDF
                    </button>

                  </div>
                ) : (
                  <div className="invoice-empty">
                    <span className="invoice-empty-icon">▤</span>
                    <p>
                      Fill the form and click
                      <br />
                      “Generate Invoice”
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ================= MEMBER PWA ================= */}
          {activeDemo === "pwa" && (
            <div className="workflow-demo pwa-demo">

              <div className="workflow-left">
                <h4>A digital gym pass for every member</h4>

                <p>
                  Members add the Progressive Web App to their home screen in
                  two taps — no App Store, no APK. They get a QR check-in pass,
                  membership countdown, trainer workouts, and a renewal button.
                </p>

                <ul className="workflow-features pwa-features">
                  <li>Unique QR pass for every member</li>
                  <li>Trainer-assigned workout calendar</li>
                  <li>Attendance history and last check-in time</li>
                  <li>One-tap membership renewal</li>
                  <li>Designed for mobile screens</li>
                </ul>
              </div>

              <div className="workflow-right pwa-visual">
                <div className="member-phone">

                  <div className="member-phone-inner">
                    <div className="member-phone-header">
                      <strong>GymShakti</strong>
                      <span>♧</span>
                    </div>

                    <div className="member-phone-content">

                      <div className="member-pass">
                        <small>ACTIVE PASS</small>
                        <h3>Rahul Verma</h3>
                        <p>12-Month Pro · 222 days left</p>

                        <button
                          type="button"
                          onClick={() =>
                            alert(
                              "Demo only. Connect your payment gateway to enable renewals."
                            )
                          }
                        >
                          Renew Plan →
                        </button>
                      </div>

                      <div className="member-qr-card">
                        <small>CHECK-IN QR</small>

                        <div className="member-qr">
                          <span>▦</span>
                        </div>

                        <small>MBR-2849-A4X</small>
                      </div>

                      <div className="member-workout">
                        <small>TODAY'S WORKOUT</small>
                        <strong>Push Day — Chest &amp; Triceps</strong>
                        <p>Bench Press · 4×10 · Cable Fly · 3×12</p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>

      {/* ================= REVENUE RECOVERY ================= */}
      <section className="revenue-section" id="revenue">

        <div className="revenue-container">

          {/* LEFT SIDE */}
          <div className="revenue-content">

            <p className="revenue-small-title">
              REVENUE RECOVERY
            </p>

            <h1>
              How much revenue
              <br />
              are you leaving
              <br />
              uncollected?
            </h1>

          </div>

          {/* RIGHT SIDE */}
          <div className="revenue-card">

            {/* Active Members */}
            <div className="revenue-item">

              <div className="revenue-label">
                <span>Active Members</span>
                <strong>{members}</strong>
              </div>

              <input
                type="range"
                min="10"
                max="1000"
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
              />

            </div>

            {/* Subscription */}
            <div className="revenue-item subscription-item">

              <div className="revenue-label">
                <span>Avg. Monthly Subscription (₹)</span>
                <strong>₹{subscription}</strong>
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={subscription}
                onChange={(e) => setSubscription(Number(e.target.value))}
              />

            </div>

            {/* Divider */}
            <div className="revenue-divider"></div>

            {/* Lost Revenue */}
            <div className="revenue-result">
              <span>Monthly dues lost to delays</span>
              <strong className="revenue-loss">
                -₹{formatMoney(monthlyDuesLost)}
              </strong>
            </div>

            {/* Recovered Revenue */}
            <div className="revenue-result">
              <span>Recovered with GymShakti</span>
              <strong className="revenue-recovered">
                +₹{formatMoney(recovered)}/mo
              </strong>
            </div>

          </div>

        </div>

      </section>

     <section className="features-section" id="features">

      {/* LEFT SIDE */}
      <div className="features-left">

        <div className="left-sticky">

          <span className="section-label">
            WHAT'S INSIDE
          </span>

          <h1>
            Gym Attendance
            <br />
            Software.
            <br />
            Built deep.
          </h1>

          <p>
            No bloat, no complex plugins. Every feature
            connects in a single automated member
            lifecycle, saving you up to 18 hours of admin
            work every week.
          </p>

          <div className="impact-card">

            <div className="impact-top">
              <span>AUTOMATED LIFECYCLE IMPACT</span>
              <b>PERFORMANCE</b>
            </div>

            <h2>90%</h2>

            <p>
              Reduction in manual front-desk entry &
              bills tracking
            </p>

            <div className="impact-row">
              <span>Manual Reminders Time</span>
              <strong>12h/week</strong>
            </div>

            <div className="progress">
              <span></span>
            </div>

            <div className="impact-row green">
              <span>With GymShakti Automation</span>
              <strong>0.5h/week</strong>
            </div>

            <div className="progress green-progress">
              <span></span>
            </div>

          </div>

        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className="features-right">

        <div className="feature-scroll">

          {features.map((feature, index) => (
            <div
              className="feature-row"
              key={index}
            >

              {/* TIMELINE ICON */}
              <div className="timeline">

                <div className="timeline-icon">
                  {feature.icon}
                </div>

                {index !== features.length - 1 && (
                  <div className="timeline-line"></div>
                )}

              </div>


              {/* CARD */}
              <div className="feature-card">

                <span className="feature-number">
                  {feature.number}
                </span>

                <h2>
                  {feature.title}
                </h2>

                <p>
                  {feature.description}
                </p>

                {feature.content}

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
    
    <Pricing />

    <section className="faq-section" id="faq">

      {/* Small label */}
      <div className="faq-label">
        FAQ
      </div>

      {/* Heading */}
      <h2 className="faq-title">
        Honest answers.
      </h2>

      {/* FAQ LIST */}
      <div className="faq-container">

        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? "faq-active" : ""
            }`}
            key={index}
          >

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <span>{faq.question}</span>

              <span className="faq-arrow">
               ⌄
              </span>

            </button>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>

          </div>
        ))}

      </div>

    </section>

    <Contact />

    <Footer />
  </div>
  );
}

export default Home;