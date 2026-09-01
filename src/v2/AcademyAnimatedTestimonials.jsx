import React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AcademyAnimatedTestimonials({
  title = "What practitioners say.",
  subtitle = "From industry designers already shipping. Their reviews. Their ratings.",
  badgeText = "Popular courses on Maven",
  testimonials = [],
  logos = [],
  trustedCompaniesTitle = "Trusted by designers from",
  autoRotateInterval = 7000
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const sectionRef = React.useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion || paused || autoRotateInterval <= 0 || testimonials.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoRotateInterval, paused, reduceMotion, testimonials.length]);

  if (!testimonials.length) return null;

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="academy-reviews"
      aria-labelledby={title ? "academy-reviews-title" : undefined}
      aria-label={title ? undefined : "What practitioners say"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {logos.length ? (
        <div className="academy-reviews-trust">
          <p>{trustedCompaniesTitle}</p>
          <div className="academy-hero-logos">
            {logos.map((logo) => (
              <img key={logo.alt} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      ) : null}

      <motion.div
        className="academy-reviews-grid"
        initial={reduceMotion ? false : "hidden"}
        animate={inView || reduceMotion ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.08 }
          }
        }}
      >
        {title || badgeText ? (
        <motion.div
          className="academy-reviews-copy"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          {badgeText ? (
            <p className="academy-reviews-badge">
              <Star aria-hidden="true" />
              {badgeText}
            </p>
          ) : null}
          {title ? <h2 id="academy-reviews-title">{title}</h2> : null}
        </motion.div>
        ) : null}

        <motion.div
          className="academy-reviews-stage"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          <div className="academy-reviews-glow academy-reviews-glow--a" aria-hidden="true" />
          <div className="academy-reviews-glow academy-reviews-glow--b" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              className="academy-reviews-card"
              initial={reduceMotion ? false : { opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <div className="academy-reviews-stars" aria-label={`${active.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={index < active.rating ? "is-on" : undefined}
                  />
                ))}
              </div>
              <div className="academy-reviews-quote">
                <Quote aria-hidden="true" />
                <p>“{active.content}”</p>
              </div>
              <div className="academy-reviews-rule" />
              <div className="academy-reviews-person">
                <span className="academy-reviews-avatar" aria-hidden="true">
                  {initials(active.name)}
                </span>
                <span>
                  <strong>{active.name}</strong>
                  <small>
                    {active.role}
                    {active.company ? `, ${active.company}` : ""}
                  </small>
                </span>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="academy-reviews-dots" role="tablist" aria-label="Reviews">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Show review from ${item.name}`}
                className="academy-reviews-dot"
                data-active={activeIndex === index ? "true" : undefined}
                onClick={() => {
                  setPaused(true);
                  setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
