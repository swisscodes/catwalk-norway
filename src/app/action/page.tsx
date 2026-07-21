import styles from "./action.module.css";
import DonationPanel from "@/components/DonationPanel";

export default function Action() {
  return (
    <div>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Take Action</h1>
          <p className={styles.headerTagline}>
            Your donation, time, and voice can make a tangible difference. Explore the ways you can support young girls escaping child marriage.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="section">
        <div className={`${styles.actionGrid} container`}>
          {/* Info Column */}
          <div className={styles.whySponsor}>
            <div>
              <h2 className={styles.title}>Why Your Support Matters</h2>
              <p className={styles.desc}>
                Child marriage is not just a social tradition; it is a human rights violation that stalls a girl&apos;s health, education, and economic potential. When you donate, you are directly funding safe rescues, legal aid, and long-term schooling.
              </p>
            </div>

            {/* Financial Transparency */}
            <div className={`${styles.allocationCard} glass-panel`}>
              <h3 className={styles.allocationTitle}>Where Your Money Goes</h3>
              <p className={styles.desc} style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                We believe in absolute transparency. Over 82% of every dollar goes directly to child protection services and scholarship projects.
              </p>

              <div className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <span>Direct Program Services</span>
                  <span>82%</span>
                </div>
                <div className={styles.barOutline}>
                  <div className={`${styles.barFill} ${styles.fillPrimary}`} style={{ width: "82%" }}></div>
                </div>
              </div>

              <div className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <span>Administration & Support</span>
                  <span>11%</span>
                </div>
                <div className={styles.barOutline}>
                  <div className={`${styles.barFill} ${styles.fillAccent}`} style={{ width: "11%" }}></div>
                </div>
              </div>

              <div className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <span>Fundraising Operations</span>
                  <span>7%</span>
                </div>
                <div className={styles.barOutline}>
                  <div className={`${styles.barFill} ${styles.fillGray}`} style={{ width: "7%" }}></div>
                </div>
              </div>
            </div>

            {/* Alternative ways */}
            <div className={styles.otherWays}>
              <h2 className={styles.title}>Other Ways to Help</h2>

              <div className={`${styles.otherCard} glass-panel`}>
                <h3 className={styles.otherTitle}>Volunteer Your Skills</h3>
                <p className={styles.desc} style={{ fontSize: "0.9rem", marginBottom: "0" }}>
                  Join our global advocacy network. Help us with graphic design, article writing, translation, or coordinate local fundraising campaigns in your city.
                </p>
              </div>

              <div className={`${styles.otherCard} glass-panel`}>
                <h3 className={styles.otherTitle}>Corporate & NGO Partners</h3>
                <p className={styles.desc} style={{ fontSize: "0.9rem", marginBottom: "0" }}>
                  We partner with corporations, legal foundations, and international coalitions to coordinate child safety workshops and raise awareness on a systemic scale.
                </p>
              </div>
            </div>
          </div>

          {/* Donation Column */}
          <div>
            <DonationPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
