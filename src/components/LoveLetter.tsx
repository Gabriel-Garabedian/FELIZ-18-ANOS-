import { config } from "../config";
import { letter } from "../data/messages";
export function LoveLetter() {
  return (
    <section className="letter paper" aria-labelledby="letter-title">
      <header className="letter-heading">
        <span className="margin-note">sem pressa. essa parte é toda sua.</span>
        <h2 id="letter-title">Amor,</h2>
      </header>
      <div className="letter-body">
        {letter.map((p, index) => (
          <div key={index}>
            {index === 5 ? (
              <aside className="future" data-reveal="statement">
                <span>Victoria dos 18.</span>
                <span>Victoria dos 19.</span>
                <span>Victoria dos 20.</span>
                <span>Victoria dos 21.</span>
                <em>Eu quero conhecer todas elas.</em>
              </aside>
            ) : null}
            <p>{p}</p>
          </div>
        ))}
        <p className="letter-signature">
          Seu, {config.boyfriendName}
          <span>completamente boiola, como prometido.</span>
        </p>
      </div>
    </section>
  );
}
