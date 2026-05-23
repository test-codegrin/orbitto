import { getFAQPageSchema } from "@/libs/seo";
import StructuredData from "@/components/seo/StructuredData";

const sectionStyles = {
  section: {
    padding: "0 0 120px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  shell: {
    background: "#f7fbf5",
    border: "1px solid #dfe9d8",
    padding: "32px 28px",
  },
  eyebrow: {
    display: "inline-block",
    marginBottom: "12px",
    color: "#5a7b42",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0 0 12px",
    color: "#1c3515",
    fontSize: "clamp(28px, 3vw, 38px)",
    lineHeight: 1.15,
  },
  intro: {
    margin: "0 0 24px",
    color: "#5b6f55",
    lineHeight: 1.7,
    maxWidth: "840px",
  },
  list: {
    display: "grid",
    gap: "14px",
  },
  item: {
    background: "#ffffff",
    border: "1px solid #dfe9d8",
    padding: "18px 20px",
  },
  question: {
    cursor: "pointer",
    fontWeight: 700,
    color: "#1f3d18",
    lineHeight: 1.5,
    listStyle: "none",
  },
  answer: {
    marginTop: "12px",
    color: "#5a6b55",
    lineHeight: 1.75,
  },
};

const SeoFaqSection = ({
  id,
  title,
  intro,
  items,
  eyebrow = "Export FAQ",
}) => {
  if (!items?.length) {
    return null;
  }

  return (
    <section id={id} style={sectionStyles.section}>
      <StructuredData id={`${id}-schema`} data={getFAQPageSchema(items)} />
      <div style={sectionStyles.container}>
        <div style={sectionStyles.shell}>
          <span style={sectionStyles.eyebrow}>{eyebrow}</span>
          <h2 style={sectionStyles.heading}>{title}</h2>
          {intro ? <p style={sectionStyles.intro}>{intro}</p> : null}

          <div style={sectionStyles.list}>
            {items.map((item) => (
              <details key={item.question} style={sectionStyles.item}>
                <summary style={sectionStyles.question}>{item.question}</summary>
                <p style={sectionStyles.answer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoFaqSection;
