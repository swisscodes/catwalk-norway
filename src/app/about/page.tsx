import type { Metadata } from "next";
import styles from "./about.module.css";
import VideoHero from "./VideoHero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Catwalk to Freedom's mission, values, and leadership team dedicated to ending child marriage and empowering girls.",
};

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
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      name: "Nyagoa William Nyuon",
      role: "Founder",
      bio: "A passionate human rights advocate with 15+ years of experience in gender equity and child protection campaigns throughout East Africa."
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      name: "Sarah Jenkins, JD",
      role: "Director of Legal Advocacy",
      bio: "Former human rights attorney specializing in child protection laws, forced marriage dissolutions, and court representation."
    },
    {
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
      name: "Amina Yusuf",
      role: "Head of Community Mediation",
      bio: "A seasoned community organizer and local elder mediator specializing in parent advocacy, social outreach, and tribal engagement."
    }
  ];

  return (
    <div>
      {/* Inspirational Video Hero Section */}
      <VideoHero />

      {/* Mission & Vision Section */}
      <section id="mission-section" className="section">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.avatarImg}
                />
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
