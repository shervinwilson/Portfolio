const steps = [
  {
    title: "Set the direction",
    description:
      "Agree on the goals, audience, content and scope before choosing a visual direction.",
  },
  {
    title: "Design and build",
    description:
      "Shape the page structure and visual system, then build responsive pages around real content.",
  },
  {
    title: "Test and launch",
    description:
      "Check key journeys across screen sizes, prepare the handoff and plan practical follow-up.",
  },
];

export default function Process() {
  return (
    <section
      className="section process-section"
      aria-labelledby="process-title"
    >
      <div className="container">
        <header className="process__head">
          <div>
            <p className="process__eyebrow">How I work /</p>
            <h2 id="process-title">From first brief to launch.</h2>
          </div>
          <p className="process__intro">
            A straightforward process keeps decisions clear and makes room for
            the details that improve the finished site.
          </p>
        </header>

        <ol className="process__steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="process__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}