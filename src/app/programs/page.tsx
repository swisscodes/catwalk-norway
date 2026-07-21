import styles from "./programs.module.css";
import Link from "next/link";

export default function Programs() {
  const programsList = [
    {
      icon: "🛡️",
      title: "Safe Houses & Protective Sanctuary",
      text: "For girls facing immediate, high-risk child marriage threats, we offer a safe, confidential sanctuary. We provide full-time protection, clinical medical support, dietary nutrition, and professional trauma therapy, creating a nurturing space where girls can heal and rebuild their lives.",
      features: [
        "24/7 guarded, confidential emergency shelters",
        "Comprehensive pediatric medical and dental screenings",
        "Trauma-informed cognitive behavioral therapy (CBT)",
        "Daily nutritious meals and recreational physical activities"
      ],
      visualClass: styles.grad1,
      visualTitle: "Safety & Shelter",
      visualText: "Providing secure sanctuaries where rescued girls can recover, heal, and learn in absolute peace."
    },
    {
      icon: "⚖️",
      title: "Legal Rights & Case Dissolution",
      text: "Our dedicated legal team actively intervenes to dissolve child marriage contracts. We work side-by-side with local law enforcement, supply court-room representation, and secure formal safety protection orders, holding perpetrators accountable under child protection statutes.",
      features: [
        "Courtroom representation and legal filing services",
        "Dissolution of illegal childhood marriage contracts",
        "Partnership training with local judges and police officers",
        "Filing for government child protection subsidies"
      ],
      visualClass: styles.grad2,
      visualTitle: "Advocacy & Justice",
      visualText: "Dismantling illegal child marriage arrangements using local laws, courts, and human rights statutes."
    },
    {
      icon: "🎓",
      title: "Girls' Academic Sponsorships",
      text: "We believe keeping girls in school is the most sustainable antidote to child marriage. We finance the complete cost of secondary education, providing enrollment fees, school uniforms, learning materials, and transport, ensuring financial barriers never disrupt their classroom learning.",
      features: [
        "Full high school tuition and school registration fees",
        "Annual supplies: uniforms, textbooks, shoes, and bags",
        "Laptops and internet connection for digital literacy",
        "Safe transit passes to prevent long, risky walks to school"
      ],
      visualClass: styles.grad3,
      visualTitle: "Education & Growth",
      visualText: "Covering 100% of educational costs to keep young girls in the classroom, learning and thriving."
    },
    {
      icon: "🗣️",
      title: "Community Outreach & Mediation",
      text: "To create lasting change, we engage local leaders, village elders, and families. Through collaborative workshops and dialogue, we educate communities on the health, economic, and moral benefits of delaying marriage, turning traditional leaders into advocates for girls' rights.",
      features: [
        "Led-by-elders community advocacy circles",
        "Parent-teacher workshops on reproductive health",
        "School-based awareness clubs for girls and boys",
        "Public campaigns to change local marriage traditions"
      ],
      visualClass: styles.grad4,
      visualTitle: "Dialogue & Change",
      visualText: "Partnering with village leaders, elders, and families to rewrite traditional beliefs and secure girls' futures."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Our Core Programs</h1>
          <p className={styles.headerTagline}>
            We deploy a combination of immediate rescue, legal protection, education funding, and community dialogue to build a shield around vulnerable girls.
          </p>
        </div>
      </section>

      {/* Programs List Section */}
      <section className="section">
        <div className="container">
          <div className={styles.programList}>
            {programsList.map((prog, idx) => (
              <div key={idx} className={styles.programRow}>
                <div className={styles.infoColumn}>
                  <span className={styles.icon}>{prog.icon}</span>
                  <h2 className={styles.title}>{prog.title}</h2>
                  <p className={styles.text}>{prog.text}</p>
                  <ul className={styles.featuresList}>
                    {prog.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${styles.visualColumn} ${prog.visualClass}`}>
                  <div className={styles.gradBlob}></div>
                  <h3 className={styles.visualTitle}>{prog.visualTitle}</h3>
                  <p className={styles.visualText}>{prog.visualText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="section section-bg-alt" style={{ textAlign: "center" }}>
        <div className="container">
          <h2 className="section-heading center">Help Us Fund These Programs</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Every program we run depends on the generosity of global supporters like you. Help us rescue and empower more young girls today.
          </p>
          <Link href="/action" className="btn btn-primary">
            Sponsor A Program Now
          </Link>
        </div>
      </section>
    </div>
  );
}
