import { memories } from "../data/memories";
import { Photo } from "./Photo";
export function Timeline() {
  return (
    <section className="timeline paper" aria-labelledby="timeline-title">
      <p className="margin-note">e eu quero muito os próximos capítulos.</p>
      <h2 id="timeline-title">
        Nossa história
        <br />
        <em>até aqui.</em>
      </h2>
      <div className="timeline-items">
        {memories.map((memory) => (
          <article
            key={memory.title}
            className={memory.image ? "memory-with-photo" : "memory-words"}
            data-reveal="line"
          >
            <span>{memory.date}</span>
            <h3>{memory.title}</h3>
            {memory.image ? (
              <Photo path={memory.image} alt={memory.title} />
            ) : null}
            <p>{memory.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
