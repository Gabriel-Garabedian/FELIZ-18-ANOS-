import { thingsILove } from "../data/messages";
export function ThingsILove() {
  return (
    <section className="things dark" aria-labelledby="things-title">
      <div className="things-heading">
        <p className="margin-note">uma lista que nunca acaba</p>
        <h2 id="things-title">
          Sobre amar <em>vc.</em>
        </h2>
      </div>
      <div className="love-lines">
        {thingsILove.map((line, i) => (
          <p key={line} className={`love-line line-${i}`} data-reveal="line">
            {line}
          </p>
        ))}
      </div>
      <div className="big-confession" data-reveal="statement">
        <p>Eu amo olhar pra vc e pensar:</p>
        <h3>
          caralho...
          <br />
          essa garota é<br />
          <em>minha namorada.</em>
        </h3>
        <span>e eu ainda não me acostumei com a sorte.</span>
      </div>
    </section>
  );
}
