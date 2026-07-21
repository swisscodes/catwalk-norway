import Link from "next/link";
import styles from "./page.module.css";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} container animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>
            Every Girl Deserves <span>A Childhood.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Every year, 12 million girls are married before the age of 18. We believe in a world where girls are free to learn, grow, and define their own futures. Join us in providing safety, education, and legal protection.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/action" className="btn btn-accent">
              Protect a Girl
            </Link>
            <Link href="/programs" className="btn btn-secondary">
              Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={`${styles.statsGrid} container`}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>12M</div>
            <div className={styles.statLabel}>Girls married under 18 annually</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1 in 5</div>
            <div className={styles.statLabel}>Girls married globally before 18</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>85%</div>
            <div className={styles.statLabel}>Decrease in local child marriage rate</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>4,200+</div>
            <div className={styles.statLabel}>Girls supported in schools & shelters</div>
          </div>
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-heading center">Our Core Interventions</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              We address the root causes of child marriage by providing immediate protection, promoting schooling, and changing community perceptions.
            </p>
          </div>

          <div className={styles.programsGrid}>
            <div className={`${styles.programCard} glass-panel`}>
              <div className={styles.programIcon}>🛡️</div>
              <h3 className={styles.programCardTitle}>Safe Houses & Counseling</h3>
              <p className={styles.programCardDescription}>
                Providing secure, emergency shelter, health screenings, nutritious meals, and specialized trauma counseling for rescued girls.
              </p>
              <Link href="/programs" className={styles.programLink}>
                Learn more &rarr;
              </Link>
            </div>

            <div className={`${styles.programCard} glass-panel`}>
              <div className={styles.programIcon}>⚖️</div>
              <h3 className={styles.programCardTitle}>Legal Rights & Advocacy</h3>
              <p className={styles.programCardDescription}>
                Providing legal assistance, court advocacy, and police protection to cancel child marriage arrangements and secure girls&apos; safety.
              </p>
              <Link href="/programs" className={styles.programLink}>
                Learn more &rarr;
              </Link>
            </div>

            <div className={`${styles.programCard} glass-panel`}>
              <div className={styles.programIcon}>🎓</div>
              <h3 className={styles.programCardTitle}>Educational Sponsorship</h3>
              <p className={styles.programCardDescription}>
                Covering complete tuition fees, school uniforms, text books, laptops, and transit fees to keep girls in classrooms.
              </p>
              <Link href="/programs" className={styles.programLink}>
                Learn more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Theory of Action Timeline Section */}
      <section className="section section-bg-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-heading center">The Journey to Empowerment</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Our model provides comprehensive support at every stage, walking alongside each girl from crisis rescue to academic graduation.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* High Impact CTA Banner */}
      <section className="section">
        <div className="container">
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>You Can Change a Girl&apos;s Story</h2>
            <p className={styles.ctaText}>
              Every contribution, large or small, helps us provide a safe haven, legal protection, and educational opportunities. Join us in ending child marriage.
            </p>
            <Link href="/action" className="btn btn-outline-white">
              Sponsor a Child&apos;s Future
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
