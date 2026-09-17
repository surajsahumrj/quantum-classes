import { SiInstagram, SiFacebook, SiYoutube, SiWhatsapp } from "react-icons/si";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Sparkles,
  X,
  Search,
  Atom,
  ClipboardCheck,
  FlaskConical,
  Library,
  Lightbulb,
  Snowflake,
  Target,
  UsersRound,
  Calculator,
  ChevronUp,
} from "lucide-react";

import { Analytics } from "@vercel/analytics/react";

import "./App.css";

type Batch = {
  name: string;
  level: string;
  detail: string;
  tag: string;
  color: string;
  timings: { label?: string; time: string; subjects?: string }[];
};
const courses: Batch[] = [
  {
    name: "Art Classes",
    level: "Open for all ages",
    detail: "A creative Sunday session for every age group.",
    tag: "Art Classes",
    color: "sage",
    timings: [{ time: "Sunday · 9:00 AM – 11:00 AM" }],
  },
  {
    name: "Uprisers",
    level: "Classes KG – 5th",
    detail: "A steady, encouraging start to confident learning.",
    tag: "KG–5th",
    color: "sage",
    timings: [{ time: "4:00 PM – 5:00 PM" }],
  },
  {
    name: "Nova Leap",
    level: "Classes 6th – 8th",
    detail: "Build clear concepts before they become difficult.",
    tag: "6th–8th",
    color: "gold",
    timings: [{ time: "5:30 PM – 6:30 PM" }],
  },
  {
    name: "Ramanujan",
    level: "Class 9th",
    detail: "Focused subject groups for a strong academic foundation.",
    tag: "9th",
    color: "coral",
    timings: [
      { label: "Batch 1", time: "5:45 PM – 6:30 PM", subjects: "Bio/Chem" },
      {
        label: "Batch 2",
        time: "6:30 PM – 7:15 PM",
        subjects: "Maths/Physics",
      },
    ],
  },
  {
    name: "Vector",
    level: "Class 10th",
    detail: "Focused subject groups for confident Class 10 preparation.",
    tag: "10th",
    color: "blue",
    timings: [
      { label: "Batch 1", time: "6:30 PM – 7:15 PM", subjects: "Bio/Chem" },
      {
        label: "Batch 2",
        time: "7:15 PM – 8:00 PM",
        subjects: "Maths/Physics",
      },
    ],
  },
];
const batchFilters = [
  "All courses",
  "Art Classes",
  "KG–5th",
  "6th–8th",
  "9th",
  "10th",
];
const navItems = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["Fees", "/fees"],
  ["Study Material", "/study-material"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
];
const contactDetails = {
  email: "quantumclassesgkpup@gmail.com",
  phone: "+91 63934 51702",
  phoneHref: "tel:+916393451702",
  address:
    "Lane No. 8, Indraprasthapuram Colony, Padri Bazaar Gorakhpur, Gorakhpur, India, 273014",
  mapUrl: "https://share.google/E7VpfFX436QRHWCZn",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Lane+No.+8,+Indraprasthapuram+Colony,+Padri+Bazaar+Gorakhpur,+Gorakhpur,+India,+273014&output=embed",
  whatsappUrl:
    "https://wa.me/916393451702?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Quantum%20Classes%20courses.",
};
const socialLinks = {
  instagram: "https://www.instagram.com/quantumclassesgkp/",
  facebook: "https://www.facebook.com/share/14o78DaeYrq/?mibextid=wwXIfr",
  youtube: "https://youtube.com/@quantumclassesgkp",
  wachannel: "https://whatsapp.com/channel/0029Vb7imyTLdQeWf7hjFd40",
};

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Quantum Classes home">
      <img className="brand-logo" src="/logo.jpg" alt="Quantum Classes logo" />
      <strong className="brand-name">QUANTUM CLASSES</strong>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="announcement">
        <div className="container announcement-inner">
          <span>Admissions open for 2026–27</span>
          <Link to="/enquiry">
            Book a free counselling call <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <header
        className={scrolled ? "site-header header-scrolled" : "site-header"}
      >
        <div className="container site-header-inner">
          <Brand />
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            className={open ? "main-nav open" : "main-nav"}
            aria-label="Main navigation"
          >
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
            <Link className="nav-cta" to="/enquiry">
              Enquire now <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div className="footer-brand">
          <img
            className="footer-brand-logo"
            src="/logo.jpg"
            alt="Quantum Classes logo"
          />
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-section footer-explore">
            <strong>Explore</strong>
            <Link to="/courses">Courses</Link>
            <Link to="/fees">Fees</Link>
            <Link to="/study-material">Study Material</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>
        <div className="footer-section footer-visit">
          <strong>Visit</strong>
          <span>{contactDetails.address}</span>
          <span>Office Hours · 4:00 PM – 8:00 PM</span>
          <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
        </div>
        <div className="footer-section socials">
          <strong>Follow Us</strong>
          <div className="social-icons">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <SiInstagram size={20} />
            </a>

            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <SiFacebook size={20} />
            </a>

            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <SiYoutube size={20} />
            </a>

            <a
              href={socialLinks.wachannel}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
            >
              <SiWhatsapp size={20} />
            </a>
          </div>
        </div>
        <div className="footer-map">
          <iframe
            title="Quantum Classes on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.879!2d83.4027785!3d26.787296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914575a8c77589%3A0x492d0c31d836e486!2sQuantum%20Classes!5e0!3m2!1sen!2sin!4v1694000000000"
            width="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Quantum Classes. All rights reserved.</span>
        <span>
          <a
            href="https://surajsahumrj.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created with ❤️ by Suraj Sahu
          </a>
        </span>
      </div>
    </footer>
  );
}
function WhatsApp() {
  return (
    <a
      className="whatsapp"
      href={contactDetails.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Quantum Classes on WhatsApp"
    >
      <MessageCircle size={23} />
    </a>
  );
}
function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Quantum Classes`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
  return null;
}
function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <strong>{eyebrow}</strong>
        </div>
        <span className="kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
function EnquiryCTA() {
  return (
    <section className="compact-cta">
      <div className="container compact-cta-grid">
        <div>
          <span className="kicker light">Your next step</span>
          <h2>
            Find the right
            <br />
            <em>place to begin.</em>
          </h2>
        </div>
        <p>
          Tell us where you are headed. Our counsellor will help you find a
          clear, practical path.
        </p>
        <Link className="button button-light" to="/enquiry">
          Book a free counselling call <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
function AnimationSystem() {
  const location = useLocation();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("anim-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const timer = setTimeout(() => {
      // Block-level content — fade+slide in as a unit
      const blocks = [
        ".section-intro",
        ".fee-table-wrap",
        ".fee-benefits",
        ".about-copy",
        ".about-image",
        ".resource-library",
        ".compact-cta",
        ".contact-details",
        ".map-placeholder",
        ".form-card",
        ".enquire-copy",
        ".sm-layout",
        ".moments-header",
        ".gallery-state",
        ".pricing-table",
        ".mission-grid > div",
      ];
      blocks.forEach((sel) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (!el.classList.contains("anim-ready")) {
            el.classList.add("anim-ready");
            io.observe(el);
          }
        }),
      );

      // Card grids — children get staggered delays
      const cardGrids = [
        ".course-grid",
        ".teaser-cards",
        ".why-quantum-grid",
        ".infra-grid",
        ".social-feed-grid",
      ];
      cardGrids.forEach((sel) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((grid) =>
          Array.from(grid.children as HTMLCollectionOf<HTMLElement>).forEach(
            (child, i) => {
              if (!child.classList.contains("anim-ready")) {
                child.classList.add("anim-ready");
                child.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
                io.observe(child);
              }
            },
          ),
        ),
      );
    }, 80);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return null;
}
function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="site-shell">
      <Header />
      <main key={location.pathname} className="page-main">
        {children}
      </main>
      <Footer />
      <WhatsApp />
      <AnimationSystem />
    </div>
  );
}
function Stats({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className={`${compact ? "stats-strip compact" : "stats-strip"}${visible ? " stats-visible" : ""}`}
      ref={ref}
      aria-label="Quantum Classes statistics"
    >
      <div className="container stats-grid">
        {[
          ["50+", "students taught"],
          ["8+", "top exam selections"],
          ["1+", "years of excellence"],
          ["40%", "average improvement"],
        ].map(([n, label], i) => (
          <div className="stat" key={label}>
            <strong>{n}</strong>
            <span>{label}</span>
            <i>{i < 3 ? "↗" : "↑"}</i>
          </div>
        ))}
      </div>
    </section>
  );
}
function CourseCard({
  course,
  detailed = false,
  index = 0,
}: {
  course: Batch;
  detailed?: boolean;
  index?: number;
}) {
  return (
    <article
      className={`course-card ${course.color} ${detailed ? "detailed" : ""}`}
    >
      <div className="course-top">
        <span>0{index + 1}</span>
        <span className="course-tag">{course.tag}</span>
      </div>
      <div>
        <h3>{course.name}</h3>
        <p>{course.level}</p>
        <small className="course-detail">{course.detail}</small>
      </div>
      <div className="batch-timings">
        {course.timings.map((timing) => (
          <div
            className="batch-timing"
            key={`${timing.label ?? course.name}-${timing.time}`}
          >
            <span className="timing-copy">
              {timing.label && <strong>{timing.label}</strong>}
              <span>
                <Clock3 size={15} /> {timing.time}
              </span>
            </span>
            {timing.subjects && (
              <span className="subject-pill">{timing.subjects}</span>
            )}
          </div>
        ))}
      </div>
      {detailed && (
        <div className="course-syllabus">
          <strong>Office Hours</strong>
          <span>4:00 PM – 8:00 PM</span>
        </div>
      )}
      <Link to="/enquiry">
        {detailed ? "Enquire about this batch" : "View programme"}{" "}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") || "").trim();
    const normalizedPhone = phone.replace(/[\s-]/g, "");
    if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(normalizedPhone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }
    formData.set("phone", phone);
    formData.set("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");
    formData.set("subject", "New Enquiry — Quantum Classes");
    formData.set("from_name", "Quantum Classes Website");
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted)
    return (
      <div className="success-state">
        <span>
          <Check size={24} />
        </span>
        <h3>✓ Enquiry received!</h3>
        <p>
          Thank you for contacting Quantum Classes. Our counsellor will get in
          touch with you shortly.
        </p>
        <div
          style={{
            marginTop: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <a
            href={contactDetails.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            Chat on WhatsApp <MessageCircle size={16} />
          </a>
          <button className="under-link" onClick={() => setSubmitted(false)}>
            Send another enquiry <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="web3forms-honeypot"
        aria-hidden="true"
      />
      <div
        className="form-heading"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <strong>Find the right fit</strong>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#61736f",
            lineHeight: 1.5,
            fontFamily: "sans-serif",
          }}
        >
          Not sure which class or batch is right for you? Let's figure it out
          together.
        </p>
      </div>
      <div className="form-grid">
        <label>
          Parent / Student Name *
          <input required name="name" placeholder="Enter your name" />
        </label>
        <label>
          Phone / WhatsApp Number *
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+91 XXXXX XXXXX"
          />
        </label>
        <label>
          What are you interested in? *
          <select name="interest" defaultValue="" required>
            <option value="" disabled hidden>
              Select interest
            </option>
            <option>Regular Classes</option>
            <option>Subject Classes</option>
            <option>Exam Preparation</option>
            <option>Foundation / Concept Building</option>
            <option>Art Classes</option>
            <option>Not Sure — Need Guidance</option>
          </select>
          <ChevronDown size={15} />
        </label>
        <label>
          Preferred Batch / Course (Optional)
          <select name="preferred_batch" defaultValue="">
            <option value="" disabled hidden>
              Select batch
            </option>
            <option>Art Classes (All)</option>
            <option>Uprisers (KG -5th)</option>
            <option>Nova Leap (6th - 8th)</option>
            <option>Ramanujan (9th)</option>
            <option>Vector (10th)</option>
            <option>Not Sure</option>
          </select>
          <ChevronDown size={15} />
        </label>
        <label>
          Preferred Contact Method
          <select name="contact_method" defaultValue="WhatsApp">
            <option>WhatsApp</option>
            <option>Phone Call</option>
          </select>
          <ChevronDown size={15} />
        </label>
      </div>
      <label>
        Anything you'd like us to know? (Optional)
        <textarea
          name="message"
          placeholder="Tell us about your requirements, preferred timing, subjects, or anything you'd like to discuss..."
          rows={3}
        />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" value="Yes" required />{" "}
        <span>
          I agree to be contacted by Quantum Classes via phone or WhatsApp
          regarding my enquiry.
        </span>
      </label>
      {error && (
        <p className="form-status form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? (
          "Sending..."
        ) : (
          <>
            Get Free Counselling <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}

function GalleryStrip() {
  const [images, setImages] = useState<
    { id: string; name: string; src: string }[]
  >([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const touchScrollRef = useRef(0);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(
        (data: {
          categories: { images: { id: string; name: string; src: string }[] }[];
        }) => {
          const all = data.categories.flatMap((c) => c.images);
          if (all.length > 0) setImages(all);
        },
      )
      .catch(() => {
        /* silent — strip stays hidden */
      });
  }, []);

  const pauseAnim = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resumeAnim = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchScrollRef.current = trackRef.current?.parentElement?.scrollLeft ?? 0;
    pauseAnim();
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current?.parentElement) return;
    trackRef.current.parentElement.scrollLeft =
      touchScrollRef.current + (touchStartRef.current - e.touches[0].clientX);
  };
  const handleTouchEnd = () => resumeAnim();

  if (images.length === 0) return null;

  // Duplicate tiles so the strip loops seamlessly
  const tiles = [...images, ...images];
  const TILE_W = 260;
  const GAP = 12;
  const trackW = images.length * (TILE_W + GAP);

  return (
    <section
      className="moments-section"
      aria-label="Moments at Quantum Classes"
    >
      <div className="container moments-header">
        <div>
          <span className="kicker">Our community</span>
          <h2>
            Moments at
            <br />
            <em>Quantum Classes.</em>
          </h2>
        </div>
        <Link className="under-link moments-link" to="/gallery">
          View all photos <ArrowRight size={15} />
        </Link>
      </div>
      <div className="container">
        <div
          className="moments-viewport"
          onMouseEnter={pauseAnim}
          onMouseLeave={resumeAnim}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="moments-track"
            style={
              { "--moments-track-w": `${trackW}px` } as React.CSSProperties
            }
          >
            {tiles.map((img, i) => (
              <div className="moments-tile" key={`${img.id}-${i}`}>
                <img
                  src={img.src}
                  alt={img.name}
                  loading="lazy"
                  onError={(e) => {
                    const tile = e.currentTarget.closest(
                      ".moments-tile",
                    ) as HTMLElement | null;
                    if (tile) tile.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentTestimonials() {
  const testimonials = [
    {
      name: "Aagya Singh",
      imageId: "1B-JFc1BCI5QzLsJ5sLZd6hVywDeRL3NB",
      quote:
        "The lessons are easy to follow, and regular practice has made me feel much more confident.",
    },
    {
      name: "Abhinav Gupta",
      imageId: "1BmbbVbKdD9FY-5uhB81NmtcIGvvIp4X3",
      quote:
        "I like how every topic is explained clearly before we move on to more difficult questions.",
    },
    {
      name: "Aniket Gupta",
      imageId: "1w-CU2ozBTHlpoeTyEFvU_uPGjYOLKoEo",
      quote:
        "The classes have helped me practise consistently and understand my subjects better.",
    },
    {
      name: "Pratyush Narayan",
      imageId: "1BlDh34i20WKNILoQDzzhFpNBZPujaHft",
      quote:
        "Teachers make time for questions, which makes learning feel much more comfortable.",
    },
    {
      name: "Sanchita Yadav",
      imageId: "101fl0eR3vj9pTPXE755KijETk2svOk-3",
      quote:
        "The notes and practice material help me revise in a more organised way.",
    },
    {
      name: "Shivam Yadav",
      imageId: "1UPpa4A98ocNuRvbb2eq-756H6H6cOwC1",
      quote:
        "The regular tests help me see what I understand and what I need to work on.",
    },
    {
      name: "Sonali Yadav",
      imageId: "1BuNvN2JNtNCF_w5EdpC-WYoTGAxzU-pj",
      quote:
        "I feel encouraged to keep improving, one concept and one practice session at a time.",
    },
    {
      name: "Vaibhavi Pandey",
      imageId: "1DKF3Qr9Kj50EHfKFelB1ZzM04mBbTszC",
      quote:
        "Quantum gives me a focused place to learn and build confidence in every subject.",
    },
  ];
  const viewportRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const autoScrollPositionRef = useRef(0);
  const previousFrameTimeRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroll = (time: number) => {
      const viewport = viewportRef.current;
      if (viewport && !pausedRef.current) {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll > 0) {
          const elapsed = previousFrameTimeRef.current === null
            ? 16.67
            : time - previousFrameTimeRef.current;
          const nextPosition =
            autoScrollPositionRef.current + Math.min(elapsed, 50) * 0.03;
          if (nextPosition >= maxScroll) {
            autoScrollPositionRef.current = 0;
            viewport.scrollLeft = 0;
          } else {
            autoScrollPositionRef.current = nextPosition;
            viewport.scrollLeft = Math.round(autoScrollPositionRef.current);
          }
        }
      }
      previousFrameTimeRef.current = time;
      animationFrameRef.current = window.requestAnimationFrame(scroll);
    };

    animationFrameRef.current = window.requestAnimationFrame(scroll);
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;
    previousFrameTimeRef.current = null;
  };
  const resume = () => {
    if (!draggingRef.current) pausedRef.current = false;
  };
  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !viewportRef.current) return;
    draggingRef.current = true;
    pause();
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = viewportRef.current.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const drag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !viewportRef.current) return;
    viewportRef.current.scrollLeft =
      dragStartScrollRef.current - (event.clientX - dragStartXRef.current);
    autoScrollPositionRef.current = viewportRef.current.scrollLeft;
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    resume();
  };
  const syncManualScroll = () => {
    if (viewportRef.current && pausedRef.current) {
      autoScrollPositionRef.current = viewportRef.current.scrollLeft;
    }
  };

  return (
    <section className="section student-testimonials-section" aria-label="Student testimonials">
      <div className="container">
        <div className="section-intro student-testimonials-intro">
          <div>
            <span className="kicker">Student Voices</span>
            <h2>
              What our students
              <br />
              <em>say about Quantum.</em>
            </h2>
          </div>
          <p>
            Real experiences from students who have learned, practiced and grown
            with Quantum Classes.
          </p>
        </div>

        <div
          className="student-testimonials-viewport"
          ref={viewportRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onTouchStart={pause}
          onTouchEnd={resume}
          onScroll={syncManualScroll}
        >
          <div className="student-testimonials-track">
            {testimonials.map(({ name, imageId, quote }) => (
              <article className="student-testimonials-card" key={imageId}>
                <img
                  src={`/api/gallery/image/${imageId}`}
                  alt={`${name}, Quantum Classes student`}
                  loading="lazy"
                />
                <div className="student-testimonials-copy">
                  <Quote className="student-testimonials-quote" size={20} aria-hidden="true" />
                  <p>“{quote}”</p>
                  <strong>{name}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyQuantum() {
  const benefits = [
    {
      number: "01",
      title: "Clear Concept Building",
      description:
        "Strong fundamentals come first. We make difficult topics simple and understandable before moving to advanced problems.",
      icon: Lightbulb,
    },
    {
      number: "02",
      title: "Personal Attention & Separate Batches",
      description:
        "Separate batches for different class groups and learning levels allow teachers to give students focused attention and help them learn at the right pace.",
      icon: UsersRound,
    },
    {
      number: "03",
      title: "Air-Conditioned Classrooms",
      description:
        "Comfortable, air-conditioned classrooms provide a cool, focused and distraction-free environment for better learning.",
      icon: Snowflake,
    },
    {
      number: "04",
      title: "Weekly & Monthly Tests",
      description:
        "Regular weekly and monthly tests help students evaluate their preparation, strengthen concepts and track their academic progress.",
      icon: ClipboardCheck,
    },
    {
      number: "05",
      title: "Complete Study Support",
      description:
        "Students get access to structured notes, PDFs, practice material and other resources through the Quantum Study Library.",
      icon: Library,
    },
    {
      number: "06",
      title: "Exam-Focused Preparation",
      description:
        "Focused preparation helps students build strong concepts, practice consistently and develop the confidence needed for school and competitive examinations.",
      icon: Target,
    },
  ];

  return (
    <section className="section why-quantum-section">
      <div className="container">
        <div className="section-intro why-quantum-intro">
          <div>
            <span className="kicker">Why Quantum Classes</span>
            <h2>
              More than classes.
              <br />
              <em>A place to learn with confidence.</em>
            </h2>
          </div>
          <p>
            At Quantum Classes, we focus on clear concepts, consistent practice
            and personal attention — so students learn how to think, not just
            what to remember.
          </p>
        </div>

        <div className="why-quantum-grid">
          {benefits.map(({ number, title, description, icon: Icon }) => (
            <article className="why-quantum-card" key={number}>
              <div className="why-quantum-card-top">
                <span className="why-quantum-number">{number}</span>
                <span className="why-quantum-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="why-quantum-closing">
          <p>
            Understand better.
            <br />
            Practice consistently.
            <br />
            Grow confidently.
          </p>
          <span>That’s the Quantum approach.</span>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Meta
        title="Home"
        description="Quantum Classes helps students build clear concepts, confidence and strong exam results."
      />
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> Trusted by 100+ families since
              2025
            </div>
            <h1>
              Learning that
              <br />
              <em>moves you forward.</em>
            </h1>
            <p className="hero-lede">
              A focused, thoughtful approach to school and competitive exam
              preparation. Where strong fundamentals become confident futures.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/enquiry">
                Book a free demo <ArrowRight size={17} />
              </Link>
              <Link className="button button-text" to="/courses">
                <span className="play-icon">
                  <Play size={12} fill="currentColor" />
                </span>{" "}
                Explore programmes
              </Link>
            </div>
            <div className="hero-proof">
              <div className="avatars">
                <span>AK</span>
                <span>SR</span>
                <span>PM</span>
                <span>+</span>
              </div>
              <p>
                <strong>92% of students</strong>
                <br />
                improve by 2+ grades
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="/home.png"
                alt="Students studying together in a bright classroom"
              />
              <div className="image-wash" />
            </div>
            <div className="hero-note">
              <span className="note-icon">
                <Sparkles size={16} />
              </span>
              <span>
                <b>Small courses.</b>
                <br />
                Real attention.
              </span>
            </div>
            <div className="hero-stamp">
              <strong>1+</strong>
              <span>
                years of
                <br />
                excellence
              </span>
            </div>
          </div>
        </div>
      </section>
      <Stats />
      <WhyQuantum />
      <section className="section teaser-grid">
        <div className="container">
          <div className="section-intro">
            <div>
              <span className="kicker">Our batch structure</span>
              <h2>
                Find the batch that
                <br />
                <em>fits your stage.</em>
              </h2>
            </div>
            <p>
              Four focused batch names, clear class ranges and timings that keep
              learning consistent.
            </p>
          </div>
          <div className="teaser-cards batch-teaser-cards">
            {courses.map((course, index) => (
              <Link className="teaser-card" to="/courses" key={course.name}>
                <span>0{index + 1}</span>
                <h3>{course.name}</h3>
                <p>{course.level}</p>
                <div className="teaser-timings">
                  {course.timings.map((timing) => (
                    <small key={`${course.name}-${timing.time}`}>
                      <Clock3 size={13} /> {timing.time}
                    </small>
                  ))}
                </div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <GalleryStrip />
      <StudentTestimonials />
      <EnquiryCTA />
    </>
  );
}
function Courses() {
  const [filter, setFilter] = useState("All courses");
  const filtered =
    filter === "All courses"
      ? courses
      : courses.filter((c) => c.tag === filter);
  return (
    <>
      <Meta
        title="Courses & Batches"
        description="Explore Art Classes, Uprisers, Nova Leap, Ramanujan and Vector batches at Quantum Classes."
      />
      <PageHero
        eyebrow="Courses & batches"
        title={
          <>
            Courses built
            <br />
            <em>around your stage.</em>
          </>
        }
        description="Clear class ranges, focused subject groups and consistent timings for every learner."
      />
      <div className="container sticky-enquire-row">
        <Link className="sticky-enquire" to="/enquiry">
          Enquire now <ArrowRight size={15} />
        </Link>
      </div>
      <section className="section courses-page">
        <div className="container">
          <div
            className="filter-row"
            role="tablist"
            aria-label="Filter by Class"
          >
            <span className="filter-label">Filter by Class</span>
            {batchFilters.map((item) => (
              <button
                key={item}
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="course-grid">
            {filtered.map((course, i) => (
              <CourseCard
                course={course}
                detailed
                key={course.name}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
function Fees() {
  const fees = [
    [
      "Art Classes (All age)",
      "₹500",
      "₹2,600",
      "13.33% off",
      "₹4,600",
      "16.36% off",
    ],
    [
      "Uprisers (KG - 5th)",
      "₹600",
      "₹3,200",
      "10% off",
      "₹5,900",
      "10.61% off",
    ],
    [
      "Nova Leap (6th - 8th)",
      "₹800",
      "₹4,100",
      "14.58% off",
      "₹7,300",
      "17.05% off",
    ],
    [
      "Ramanujan (9th)",
      "₹1,200",
      "₹6,200",
      "13.89% off",
      "₹11,100",
      "15.91% off",
    ],
    [
      "Vector (10th)",
      "₹1,300",
      "₹6,800",
      "12.82% off",
      "₹12,200",
      "14.69% off",
    ],
  ];
  return (
    <>
      <Meta
        title="Fee Structure"
        description="Compare Quantum Classes batch fees across monthly, half-yearly, and yearly plans."
      />
      <PageHero
        eyebrow="Fee structure"
        title={
          <>
            Investment in
            <br />
            <em>what comes next.</em>
          </>
        }
        description="Straightforward plans for every Quantum Classes batch, with savings for longer commitments."
      />
      <section className="section fee-page">
        <div className="container">
          <div className="fee-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Monthly</th>
                  <th>Half-Yearly (6 Months)</th>
                  <th>Yearly (11 Months)</th>
                </tr>
              </thead>
              <tbody>
                {fees.map(
                  ([
                    batch,
                    monthly,
                    halfYearly,
                    halfDiscount,
                    yearly,
                    yearlyDiscount,
                  ]) => (
                    <tr key={batch}>
                      <td className="fee-name">{batch}</td>
                      <td className="fee-amount" data-th="Monthly">
                        {monthly}
                      </td>
                      <td
                        className="fee-amount"
                        data-th="Half-Yearly (6 Months)"
                      >
                        <span>{halfYearly}</span>
                        <small className="discount-badge">{halfDiscount}</small>
                      </td>
                      <td className="fee-amount" data-th="Yearly (11 Months)">
                        <span>{yearly}</span>
                        <small className="discount-badge">
                          {yearlyDiscount}
                        </small>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <section className="fee-benefits">
            <h2>Additional Fee Benefits</h2>
            <div className="benefit-list">
              <p>
                <Check size={16} /> 10% extra discount for siblings (same
                parents)
              </p>
              <p>
                <Check size={16} /> 15% extra discount for batch toppers
              </p>
              <p>
                <Check size={16} /> Free study material — PDFs, Notes, DPP, etc.
              </p>
            </div>
            <div className="policy-list">
              <p>
                <span className="info-icon">i</span> Monthly fee should be
                submitted between the 1st and 5th of the respective month, in
                advance
              </p>
              <p>
                <span className="info-icon">i</span> Refund policy available
              </p>
            </div>
            <Link className="under-link" to="/contact">
              Have questions about fees or refunds? Contact us{" "}
              <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
type StudyFile = { id: string; name: string; size: string };
type StudyChapter = { id: string; name: string; files: StudyFile[] };
type StudySubject = { id: string; name: string; chapters: StudyChapter[] };
type StudyClass = { id: string; name: string; subjects: StudySubject[] };
type StudySearchResult = StudyChapter & {
  className: string;
  subjectName: string;
};

const normalizeSearchText = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

function StudyMaterial() {
  const [classes, setClasses] = useState<StudyClass[]>([]);
  const [activeClass, setActiveClass] = useState("");
  const [activeSubject, setActiveSubject] = useState("");
  const [expandedChapter, setExpandedChapter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/study-material", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data: { classes: StudyClass[] }) => {
        // Normalize the API response at ONE appropriate boundary
        const normalizedClasses = (data.classes || []).map((c) => ({
          ...c,
          subjects: (c.subjects || []).map((s) => ({
            ...s,
            chapters: (s.chapters || []).map((ch) => ({
              ...ch,
              files: ch.files || [],
            })),
          })),
        }));

        setClasses(normalizedClasses);
        const first = normalizedClasses[0];
        if (first) {
          setActiveClass(first.id);
          setActiveSubject(first.subjects[0]?.id || "");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const currentClass = classes.find((c) => c.id === activeClass);

  const getSubjectIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("physics")) return <Atom size={24} />;
    if (n.includes("chemistry")) return <FlaskConical size={24} />;
    if (n.includes("math")) return <Calculator size={24} />;
    return <BookOpen size={24} />;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const normalizedQuery = normalizeSearchText(searchQuery);
  const isSearching = normalizedQuery.length > 0;

  // Search dynamically across every already-loaded class → subject → chapter →
  // file, not just the currently selected class. A match at a higher level
  // (class/subject/chapter name) pulls in everything nested under it; a match
  // on a file name alone only pulls in that file.
  const searchResults: StudySearchResult[] = isSearching
    ? classes.flatMap((cls) => {
        const classMatches = normalizeSearchText(cls.name).includes(
          normalizedQuery,
        );
        return (cls.subjects ?? []).flatMap((subject) => {
          const subjectMatches =
            classMatches ||
            normalizeSearchText(subject.name).includes(normalizedQuery);
          return (subject.chapters ?? []).flatMap((chapter) => {
            const chapterMatches =
              subjectMatches ||
              normalizeSearchText(chapter.name).includes(normalizedQuery);
            const files = chapter.files ?? [];
            const matchedFiles = chapterMatches
              ? files
              : files.filter((file) =>
                  normalizeSearchText(file.name).includes(normalizedQuery),
                );
            if (!chapterMatches && matchedFiles.length === 0) return [];
            return [
              {
                ...chapter,
                files: matchedFiles,
                className: cls.name,
                subjectName: subject.name,
              },
            ];
          });
        });
      })
    : [];

  const displaySubjects = currentClass?.subjects;
  const activeDisplaySubject =
    displaySubjects?.find((s) => s.id === activeSubject) ||
    displaySubjects?.[0];

  return (
    <>
      <Meta
        title="Study Material"
        description="Browse Quantum Classes notes, practice sets and exam guides by class and subject."
      />

      <div className="sm-hero">
        <div className="container sm-hero-content">
          <h1>
            QUANTUM
            <br />
            STUDY LIBRARY
          </h1>
          <p>Notes, chapters and study material — all in one place.</p>

          <div className="sm-search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search study materials..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <section className="section sm-main">
        <div className="container">
          {loading && (
            <div className="sm-skeleton-container">
              <div className="sm-skeleton-classes">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="sm-skeleton sm-skel-pill"></span>
                ))}
              </div>
              <div className="sm-skeleton-subjects">
                <div className="sm-skeleton sm-skel-card"></div>
                <div className="sm-skeleton sm-skel-card"></div>
              </div>
            </div>
          )}
          {!loading && error && (
            <div className="sm-empty-state">
              <strong>Unable to load study material. Please try again.</strong>
              <span>Please try refreshing the page in a moment.</span>
            </div>
          )}
          {!loading && !error && classes.length === 0 && (
            <div className="sm-empty-state">
              <strong>No study material available yet.</strong>
              <span>
                PDFs added to the shared Drive folder will appear here
                automatically.
              </span>
            </div>
          )}

          {!loading && !error && classes.length > 0 && (
            <div className="sm-layout">
              <div className="sm-class-selector">
                {classes.map((c) => {
                  const match = c.name.match(/\d+/);
                  const classNum = match ? match[0].padStart(2, "0") : "ALL";
                  return (
                    <button
                      key={c.id}
                      className={`sm-class-pill ${activeClass === c.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveClass(c.id);
                        setActiveSubject(c.subjects[0]?.id || "");
                        setSearchQuery("");
                      }}
                    >
                      <strong>{classNum}</strong>
                      <span>CLASS</span>
                    </button>
                  );
                })}
              </div>

              {currentClass && (
                <div className="sm-content-area">
                  <div className="sm-breadcrumb">
                    {isSearching
                      ? "HOME / SEARCH RESULTS"
                      : `HOME / ${currentClass.name.toUpperCase()}${activeDisplaySubject ? ` / ${activeDisplaySubject.name.toUpperCase()}` : ""}`}
                  </div>

                  {isSearching ? (
                    <div className="sm-chapters-list">
                      <h3 className="sm-chapters-title">
                        Search Results
                        {searchResults.length > 0
                          ? ` (${searchResults.length})`
                          : ""}
                      </h3>
                      {searchResults.length === 0 ? (
                        <div className="sm-empty-state">
                          <strong>No study materials found.</strong>
                          <span>
                            Try a different class, subject, chapter or file
                            name.
                          </span>
                        </div>
                      ) : (
                        searchResults.map((result, idx) => (
                          <ChapterCard
                            key={result.id}
                            chapter={result}
                            index={idx}
                            expanded
                            onToggle={() => {}}
                            subjectName={`${result.className} · ${result.subjectName}`}
                          />
                        ))
                      )}
                    </div>
                  ) : !displaySubjects || displaySubjects.length === 0 ? (
                    <div className="sm-empty-state">
                      <strong>No subjects available for this class yet.</strong>
                    </div>
                  ) : (
                    <>
                      <div className="sm-subject-cards">
                        {displaySubjects.map((s) => (
                          <button
                            key={s.id}
                            className={`sm-subject-card ${activeSubject === s.id ? "active" : ""}`}
                            onClick={() => setActiveSubject(s.id)}
                          >
                            <div className="sm-subject-icon">
                              {getSubjectIcon(s.name)}
                            </div>
                            <div className="sm-subject-info">
                              <h3>{s.name.toUpperCase()}</h3>
                              <span>
                                {(s.chapters?.length || 0) === 1
                                  ? "1 CHAPTER"
                                  : (s.chapters?.length || 0) + " CHAPTERS"}
                              </span>
                            </div>
                            <div className="sm-subject-action">
                              OPEN SUBJECT &rarr;
                            </div>
                          </button>
                        ))}
                      </div>

                      {activeDisplaySubject && (
                        <div className="sm-chapters-list">
                          <h3 className="sm-chapters-title">
                            {activeDisplaySubject.name.toUpperCase()} CHAPTERS
                          </h3>
                          {(activeDisplaySubject.chapters?.length || 0) ===
                          0 ? (
                            <div className="sm-empty-state">
                              <strong>No chapters available yet.</strong>
                            </div>
                          ) : (
                            (activeDisplaySubject.chapters || []).map(
                              (ch, idx) => (
                                <ChapterCard
                                  key={ch.id}
                                  chapter={ch}
                                  index={idx}
                                  expanded={expandedChapter === ch.id}
                                  onToggle={() =>
                                    setExpandedChapter(
                                      expandedChapter === ch.id ? "" : ch.id,
                                    )
                                  }
                                />
                              ),
                            )
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}

function ChapterCard({
  chapter,
  index,
  expanded,
  onToggle,
  subjectName,
}: {
  chapter: StudyChapter;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  subjectName?: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className={`sm-chapter-card ${expanded ? "expanded" : ""}`}>
      <button className="sm-chapter-header" onClick={onToggle}>
        <div className="sm-chapter-number">{num}</div>
        <div className="sm-chapter-info">
          <span className="sm-chapter-label">
            {subjectName
              ? `${subjectName.toUpperCase()} - CHAPTER ${index + 1}`
              : `CHAPTER ${index + 1}`}
          </span>
          <h4>{chapter.name}</h4>
        </div>
        <div className="sm-chapter-meta">
          <span>{chapter.files?.length || 0} STUDY MATERIALS</span>
          <span className="sm-chapter-toggle">
            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <span className="sm-chapter-view">VIEW &rarr;</span>
            )}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="sm-chapter-body">
          {(chapter.files?.length || 0) === 0 ? (
            <div className="sm-empty-state small">
              No PDFs available in this chapter yet.
            </div>
          ) : (
            <div className="sm-pdf-list">
              {(chapter.files || []).map((file) => (
                <div className="sm-pdf-card" key={file.id}>
                  <div className="sm-pdf-icon">
                    <FileText size={22} />
                  </div>
                  <div className="sm-pdf-info">
                    <strong title={file.name}>{file.name}</strong>
                    {file.size && <span>PDF &middot; {file.size}</span>}
                  </div>
                  <div className="sm-pdf-actions">
                    <a
                      href={`/api/study-material/file/${file.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-btn sm-btn-view"
                    >
                      <ExternalLink size={14} /> VIEW
                    </a>
                    <a
                      href={`/api/study-material/file/${file.id}?download=1`}
                      download
                      className="sm-btn sm-btn-download"
                    >
                      <Download size={14} /> DOWNLOAD
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function About() {
  return (
    <>
      <Meta
        title="About"
        description="Learn about Quantum Classes, our story, teaching method and learning spaces."
      />
      <PageHero
        eyebrow="About Quantum"
        title={
          <>
            A place to feel
            <br />
            <em>capable.</em>
          </>
        }
        description="Education should make you more curious, not just more prepared."
      />
      <section className="section about-page">
        <div className="container about-grid">
          <div className="about-copy">
            <span className="kicker">Our story</span>
            <h2>
              Started small.
              <br />
              <em>Still personal.</em>
            </h2>
            <p>
              Quantum began with one teacher, twelve students and a belief that
              the right kind of attention can change a learner’s relationship
              with a subject.
            </p>
            <p>
              Today, our rooms are fuller, but the belief has stayed the same.
              Small courses, honest feedback and teachers who remain interested
              in how each student thinks.
            </p>
            <div className="mission-grid">
              <div>
                <strong>Mission</strong>
                <p>
                  Make difficult learning feel possible through clarity and
                  care.
                </p>
              </div>
              <div>
                <strong>Vision</strong>
                <p>Build independent, curious learners for the long term.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/about.png" />
            <div className="about-note">
              <span>Since</span>
              <strong>2025</strong>
              <span>Gorakhpur</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section infrastructure">
        <div className="container">
          <span className="kicker">Built for attention</span>
          <h2>
            Spaces that support
            <br />
            <em>good study habits.</em>
          </h2>
          <div className="infra-grid">
            <div>
              <strong>01</strong>
              <h3>Air Conditioned Classrooms</h3>
              <p>
                Comfortable, cool and distraction-free classrooms designed to
                support focused learning.
              </p>
            </div>
            <div>
              <strong>02</strong>

              <h3>Separate Batches</h3>
              <p>
                Dedicated batches for different student groups, ensuring focused
                teaching and better individual attention.
              </p>
            </div>
            <div>
              <strong>03</strong>

              <h3>Weekly/Monthly Tests</h3>
              <p>
                Regular tests to evaluate progress, strengthen concepts and help
                students prepare confidently for exams.
              </p>
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
function SocialFeed() {
  return (
    <section className="section social-feed">
      <div className="container">
        <div className="section-intro">
          <div>
            <span className="kicker">Stay connected</span>
            <h2>
              Classroom moments,
              <br />
              <em>shared with you.</em>
            </h2>
          </div>
          <p>
            Follow Quantum Classes Gorakhpur for updates, student moments and
            announcements.
          </p>
        </div>
        <div className="social-feed-grid">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-feed-icon">
              <MessageCircle size={20} />
            </span>
            <strong>Instagram</strong>
            <small>@quantumclassesgkp</small>
            <ExternalLink size={16} />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-feed-icon">
              <BookOpen size={20} />
            </span>
            <strong>Facebook</strong>
            <small>Quantum Classes Gorakhpur</small>
            <ExternalLink size={16} />
          </a>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-feed-icon">
              <Play size={20} />
            </span>
            <strong>YouTube</strong>
            <small>@quantumclassesgkp</small>
            <ExternalLink size={16} />
          </a>
          <a
            href={socialLinks.wachannel}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-feed-icon">
              <MessageCircle size={20} />
            </span>
            <strong>WhatsApp Channel</strong>
            <small>@quantumclassesgkp</small>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <>
      <Meta
        title="Contact"
        description="Visit, call or message Quantum Classes in Gorakhpur."
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Come say
            <br />
            <em>hello.</em>
          </>
        }
        description="Questions about courses, fees or the right starting point? We are here to help."
      />
      <section className="section contact-page">
        <div className="container contact-grid">
          <div className="contact-details">
            <div>
              <MapPin />
              <span>
                <strong>Visit us</strong>
                {contactDetails.address}
                <br />
                <strong>Office Hours</strong>4:00 PM – 8:00 PM
              </span>
            </div>
            <div>
              <Phone />
              <span>
                <strong>Call us</strong>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </span>
            </div>
            <div>
              <Mail />
              <span>
                <strong>Email us</strong>
                <a href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </span>
            </div>
            <a
              className="button button-primary directions-button"
              href={contactDetails.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions <ArrowRight size={16} />
            </a>
            <div className="contact-socials">
              <strong>Follow us</strong>
              <div>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <BookOpen size={18} />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Play size={18} />
                </a>
                <a
                  href={socialLinks.wachannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="map-placeholder">
            <iframe
              src={contactDetails.mapEmbedUrl}
              title="Quantum Classes location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-overlay">
              <MapPin size={22} />
              <strong>Quantum Classes</strong>
              <span>Padri Bazaar, Gorakhpur</span>
            </div>
          </div>
        </div>
      </section>
      <SocialFeed />
      <EnquiryCTA />
    </>
  );
}
const ALL_CATEGORY_ID = "__all__";
type GalleryImage = {
  id: string;
  name: string;
  src: string;
  viewLink?: string | null;
};
type GalleryCategory = { id: string; name: string; images: GalleryImage[] };
function Gallery() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY_ID);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ALL combines every image across every category; individual categories show only their own
  const allImages: GalleryImage[] = categories.flatMap((c) => c.images);
  const activeImages: GalleryImage[] =
    activeCategory === ALL_CATEGORY_ID
      ? allImages
      : (categories.find((c) => c.id === activeCategory)?.images ?? []);

  // For the lightbox caption: find which category the selected image belongs to
  const selectedImage =
    selectedIndex !== null ? (activeImages[selectedIndex] ?? null) : null;
  const selectedCategoryName =
    activeCategory === ALL_CATEGORY_ID && selectedImage
      ? (categories.find((c) =>
          c.images.some((img) => img.id === selectedImage.id),
        )?.name ?? "All")
      : (categories.find((c) => c.id === activeCategory)?.name ?? "All");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/gallery", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Gallery request failed");
        return response.json();
      })
      .then((data: { categories: GalleryCategory[] }) => {
        setCategories(data.categories);
        setActiveCategory(ALL_CATEGORY_ID);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (!activeImages.length) return;
      if (event.key === "ArrowRight")
        setSelectedIndex((index) =>
          index === null ? 0 : (index + 1) % activeImages.length,
        );
      if (event.key === "ArrowLeft")
        setSelectedIndex((index) =>
          index === null
            ? 0
            : (index - 1 + activeImages.length) % activeImages.length,
        );
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeImages, selectedIndex]);

  return (
    <>
      <Meta
        title="Gallery"
        description="See Quantum Classes classroom, event, student, result, and campus photos."
      />
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            A closer look at
            <br />
            <em>Quantum Classes.</em>
          </>
        }
        description="Explore our gallery and experience the vibrant life of our institute through memorable moments captured across classrooms, academic events, student activities, celebrations, and campus experiences."
      />
      <section className="section gallery-page">
        <div className="container">
          <div
            className="filter-row gallery-tabs"
            role="tablist"
            aria-label="Gallery categories"
          >
            {loading ? (
              <>
                <span className="gallery-tab-skeleton" />
                <span className="gallery-tab-skeleton" />
                <span className="gallery-tab-skeleton" />
              </>
            ) : (
              <>
                <button
                  className={
                    activeCategory === ALL_CATEGORY_ID
                      ? "filter active"
                      : "filter"
                  }
                  onClick={() => {
                    setActiveCategory(ALL_CATEGORY_ID);
                    setSelectedIndex(null);
                  }}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={
                      activeCategory === category.id
                        ? "filter active"
                        : "filter"
                    }
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSelectedIndex(null);
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </>
            )}
          </div>
          {loading && (
            <div className="gallery-skeleton-grid">
              {Array.from({ length: 6 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          )}
          {!loading && error && (
            <div className="gallery-state">
              <strong>We could not load the gallery right now.</strong>
              <span>Please try refreshing the page in a moment.</span>
            </div>
          )}
          {!loading &&
            !error &&
            activeImages.length === 0 &&
            categories.length > 0 && (
              <div className="gallery-state">
                <strong>No photos yet in this category.</strong>
                <span>New uploads will appear here automatically.</span>
              </div>
            )}
          {!loading && !error && activeImages.length > 0 && (
            <div className="gallery-grid">
              {activeImages.map((image, index) => (
                <button
                  className="gallery-tile"
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img src={image.src} alt={image.name} loading="lazy" />
                  <span>{image.name}</span>
                </button>
              ))}
            </div>
          )}
          {!loading && !error && categories.length === 0 && (
            <div className="gallery-state">
              <strong>No gallery categories yet.</strong>
              <span>
                Create a subfolder in the shared Drive folder to get started.
              </span>
            </div>
          )}
        </div>
      </section>
      {selectedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCategoryName} photo viewer`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="lightbox-close"
            aria-label="Close photo viewer"
            onClick={() => setSelectedIndex(null)}
          >
            <X />
          </button>
          <button
            className="lightbox-nav previous"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex((index) =>
                index === null
                  ? 0
                  : (index - 1 + activeImages.length) % activeImages.length,
              );
            }}
          >
            <ChevronLeft />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.name}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="lightbox-nav next"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex((index) =>
                index === null ? 0 : (index + 1) % activeImages.length,
              );
            }}
          >
            <ChevronRight />
          </button>
          <span className="lightbox-caption">
            {selectedImage.name} · {selectedCategoryName}
          </span>
        </div>
      )}
    </>
  );
}
function Enquiry() {
  return (
    <>
      <Meta
        title="Enquiry"
        description="Book a free counselling call with Quantum Classes."
      />
      <PageHero
        eyebrow="Enquiry"
        title={
          <>
            Let’s make a<br />
            <em>plan together.</em>
          </>
        }
        description="Tell us a little about where you are. A counsellor will call within 24 hours to help you find the right fit."
      />
      <section className="enquiry-page">
        <div className="container enquiry-grid">
          <div className="enquire-copy">
            <span className="kicker light">Free counselling call</span>
            <h2>
              Find your
              <br />
              <em>fit.</em>
            </h2>
            <p>
              We will help you compare programmes, batch timings and the best
              next step for your goals.
            </p>
            <div className="contact-line">
              <Phone size={17} />
              <span>
                <strong>Prefer to call or WhatsApp us instead?</strong>
                <br />
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
                <br />
                <a href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </span>
            </div>
          </div>
          <div className="form-card">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
