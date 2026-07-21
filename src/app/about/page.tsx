import styles from "./about.module.css";

export default function About() {
  const values = [
    {
      icon: "🤝",
      title: "Human Dignity",
      desc: "We believe every girl has the fundamental right to safety, personal autonomy, and a free childhood. Dignity is non-negotiable."
    },
    {
      icon: "🎓",
      title: "Empowerment",
      desc: "Education is the primary catalyst for change. We empower girls by helping them build knowledge, confidence, and career pathways."
    },
    {
      icon: "⚖️",
      title: "Integrity & Justice",
      desc: "We hold ourselves to the highest standards of financial transparency, legal compliance, and moral responsibility in advocacy."
    }
  ];

  const team = [
    {
      initials: "HM",
      name: "Dr. Helen Mwangi",
      role: "Executive Director",
      bio: "A passionate human rights advocate with 15+ years of experience in gender equity and child protection campaigns throughout East Africa."
    },
    {
      initials: "SJ",
      name: "Sarah Jenkins, JD",
      role: "Director of Legal Advocacy",
      bio: "Former human rights attorney specializing in child protection laws, forced marriage dissolutions, and court representation."
    },
    {
      initials: "AY",
      name: "Amina Yusuf",
      role: "Head of Community Mediation",
      bio: "A seasoned community organizer and local elder mediator specializing in parent advocacy, social outreach, and tribal engagement."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Our Mission & Vision</h1>
          <p className={styles.headerTagline}>
            Protecting young girls from child marriage, keeping them in classrooms, and ensuring their voice is heard in their families and communities.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section">
        <div className="container">
          <div className={styles.missionVision}>
            <div className={`${styles.box} glass-panel`}>
              <h3 className={styles.boxTitle}>Our Mission</h3>
              <p className={styles.boxText}>
                To dismantle the systemic causes of child marriage by delivering immediate legal protection, secure sanctuary, educational sponsorship, and strategic community mediation that empowers young girls to choose their own destinies.
              </p>
            </div>
            <div className={`${styles.box} glass-panel`}>
              <h3 className={styles.boxTitle}>Our Vision</h3>
              <p className={styles.boxText}>
                We envision a world where every girl completes her education, has full sovereignty over her body and life choices, and grows up in a community that actively values her rights, safety, and potential.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "4rem 0 2rem" }}>
            <h2 className="section-heading center">Our Core Values</h2>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((val, idx) => (
              <div key={idx} className={`${styles.valueCard} glass-panel`}>
                <span className={styles.valueIcon}>{val.icon}</span>
                <h4 className={styles.valueTitle}>{val.title}</h4>
                <p className={styles.description}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theory of Change Section */}
      <section className="section section-bg-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-heading center">Our Theory of Change</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              How we construct sustainable solutions to stop child marriage and empower generations of young women.
            </p>
          </div>

          <div className={styles.tocBox}>
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              Ending child marriage requires a holistic approach that bridges immediate safety with long-term systemic support.
            </p>
            <div className={styles.tocGrid}>
              <div className={styles.tocStep}>
                <div className={styles.tocStepNum}>1</div>
                <h4 className={styles.tocStepTitle}>Identify & Secure</h4>
                <p className={styles.description} style={{ fontSize: "0.85rem" }}>
                  Intercept forced marriages through community alerts, law enforcement coordination, and instant secure shelter relocation.
                </p>
              </div>
              <div className={styles.tocStep}>
                <div className={styles.tocStepNum}>2</div>
                <h4 className={styles.tocStepTitle}>Support & Educate</h4>
                <p className={styles.description} style={{ fontSize: "0.85rem" }}>
                  Provide complete academic financing, social mentoring, and community mediation to allow the girl to stay safely at school.
                </p>
              </div>
              <div className={styles.tocStep}>
                <div className={styles.tocStepNum}>3</div>
                <h4 className={styles.tocStepTitle}>Empower & Sustain</h4>
                <p className={styles.description} style={{ fontSize: "0.85rem" }}>
                  Cultivate financial literacy, leadership capacity, and career mentorship to create self-sufficient, independent women.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-heading center">Our Leadership Team</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Meet the dedicated professionals leading our operations, legal defense, and community advocacy on the ground.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <div key={idx} className={`${styles.teamCard} glass-panel`}>
                <div className={styles.avatar}>{member.initials}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <div className={styles.teamRole}>{member.role}</div>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
