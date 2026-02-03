import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "../assets/logo.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.jpg";
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
  const { t, i18n } = useTranslation();
  const [countdown, setCountdown] = useState(calculateCountdown);
  const swiperRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let slideInterval = null;
    let step = 0;
    
    const startAutoPlay = () => {
      if (swiperRef.current) {
        slideInterval = setInterval(() => {
          if (swiperRef.current && typeof swiperRef.current.slideTo === 'function') {
            const pattern = [1, 0, 1, 2, 1, 0, 1, 2];
            const targetSlide = pattern[step % 8];
            swiperRef.current.slideTo(targetSlide);
            step++;
          }
        }, 3000); // 3 seconds
      }
    };

    // Start after a short delay to ensure swiper is initialized
    const timeout = setTimeout(startAutoPlay, 1000);

    return () => {
      clearTimeout(timeout);
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
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
            <div className="header__language-switcher">
              <button
                type="button"
                className={`header__lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`header__lang-btn ${i18n.language === 'ko' ? 'active' : ''}`}
                onClick={() => changeLanguage('ko')}
              >
                KO
              </button>
            </div>
            <button type="button" className="header__cta">
              {t('header.register')}
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-background">
            <span className="hero-circle c1"></span>
            <span className="hero-circle c2"></span>
            <span className="hero-circle c3"></span>
          </div>
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__description">
            {t('hero.description')}
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
            <span className="countdown__label">{t('countdown.days')}</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--hours">
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">{t('countdown.hours')}</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--minutes">
              {String(countdown.minutes).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">{t('countdown.minutes')}</span>
          </div>
          <div className="countdown__item">
            <span className="countdown__value countdown__value--seconds">
              {String(countdown.seconds).padStart(2, "0")}
            </span>
            <span className="countdown__divider" aria-hidden="true" />
            <span className="countdown__label">{t('countdown.seconds')}</span>
          </div>
        </div>
        <div className="gallery">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect={"coverflow"}
            grabCursor={false}
            centeredSlides={true}
            loop={false}
            slidesPerView={1.5}
            initialSlide={1}
            speed={1000}
            allowTouchMove={false}
            slideToClickedSlide={false}
            watchSlidesProgress={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ el: '.swiper-pagination', clickable: false }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="gallery-swiper"
          >
            {GALLERY_IMAGES.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-slide-inner">
                  <img
                    src={src}
                    alt={`${t('gallery.product')} ${index + 1}`}
                    className="gallery__image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
