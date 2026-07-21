import styles from "./timeline.module.css";

const STAGES = [
  {
    num: "Stage 01",
    title: "Crisis Intervention & Safe Haven",
    description: "When a girl is identified as facing an imminent threat of child marriage, we provide emergency rescue. She is welcomed into our safe house sanctuary where she receives medical attention, clean clothing, nutritious food, and specialized trauma counseling."
  },
  {
    num: "Stage 02",
    title: "Legal Defense & Mediation",
    description: "Our legal staff takes active steps to advocate for the girl's rights, working with law enforcement and local courts to secure protection orders. Concurrently, professional community mediators work with parents and village elders to resolve familial conflicts."
  },
  {
    num: "Stage 03",
    title: "Educational Re-integration",
    description: "Education is the strongest shield against child marriage. We support the girl's enrollment in local high-performing schools, covering all costs: tuition, uniforms, textbooks, laptop access, and safe transportation."
  },
  {
    num: "Stage 04",
    title: "Life Skills & Independent Future",
    description: "Beyond formal schooling, we offer workshops on financial literacy, leadership, and vocational skills. When she graduates, she has the autonomy, resources, and community network to pursue higher education or secure a career."
  }
];

export default function Timeline() {
  return (
    <div className={styles.timeline}>
      {STAGES.map((stage, idx) => (
        <div key={idx} className={styles.item}>
          <span className={styles.dot}></span>
          <div className={`${styles.content} glass-panel`}>
            <div className={styles.number}>{stage.num}</div>
            <h4 className={styles.title}>{stage.title}</h4>
            <p className={styles.description}>{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
