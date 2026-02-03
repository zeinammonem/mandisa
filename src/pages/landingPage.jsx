import { useState, useEffect } from "react";
import {
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import logo from "../assets/logo.png";
import img1 from "../assets/img.png";
import img2 from "../assets/img1.jpg";
import img3 from "../assets/img3.png";
import "./landingPage.css";

const GALLERY_IMAGES = [img1, img2, img3];

// Set launch date - update this to your desired launch date
const LAUNCH_DATE = new Date("2026-02-18T00:00:00");

// Calculate initial countdown values
const calculateCountdown = () => {
  const now = new Date().getTime();
  const target = LAUNCH_DATE.getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

function LandingPage() {
  const [countdown, setCountdown] = useState(calculateCountdown);

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="landing">
      <div className="landing__top">
        <header className="header">
          <div className="header__logo">
            <img src={logo} alt="Mandisa" className="header__logo-icon" />
            <span className="header__logo-text">Mandisa</span>
          </div>
          <div className="header__actions">
            <div className="header__social">
              <a href="#" className="header__social-link" aria-label="YouTube">
                <FaYoutube style={{ color: "#FF0000" }} />
              </a>
              <a href="#" className="header__social-link" aria-label="LinkedIn">
                <FaLinkedin style={{ color: "#0A66C2" }} />
              </a>
              <a
                href="#"
                className="header__social-link"
                aria-label="X (Twitter)"
              >
                <FaXTwitter style={{ color: "#000000" }} />
              </a>
              <a href="#" className="header__social-link" aria-label="Facebook">
                <FaFacebook style={{ color: "#1877F2" }} />
              </a>
              <a
                href="#"
                className="header__social-link"
                aria-label="Instagram"
              >
                <FaInstagram style={{ color: "#C13584" }} />
              </a>
            </div>
            <button type="button" className="header__cta">
              Register
            </button>
          </div>
        </header>

        <section className="hero">
          <h1 className="hero__title">We are Launching Soon</h1>
          <p className="hero__description">
            Mandisa Naturals offers premium Egyptian natural products crafted
            from pure, sustainable ingredients, combining ancient wellness
            traditions with modern quality standards for global markets.
          </p>
        </section>
      </div>

      <section className="gallery-section">
        <div className="countdown countdown--overlay">
          <div className="countdown__item">
            <span className="countdown__value countdown__value--days">
              {String(countdown.days).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">Days</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--hours">
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">Hours</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--minutes">
              {String(countdown.minutes).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">Minutes</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--seconds">
              {String(countdown.seconds).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">Seconds</span>
          </div>
        </div>
        <div className="gallery">
          {GALLERY_IMAGES.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Mandisa product ${index + 1}`}
              className={`gallery__image ${index === 1 ? "gallery__image--center" : ""}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
