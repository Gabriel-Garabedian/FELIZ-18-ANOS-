import { useRef, useState } from "react";
import { config } from "../config";
import { extraLetter, finalLines } from "../data/messages";
import { Photo } from "./Photo";
export function FinalMessage() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [secret, setSecret] = useState(false);
  return (
    <>
      <section className="final dark" aria-labelledby="final-title">
        <figure className="final-photo" data-reveal="photo">
          <Photo
            path="/photos/foto-final.jpg"
            alt="A fotografia especial que Gabriel escolheu para encerrar a carta"
          />
          <figcaption>de todas as coisas, vc.</figcaption>
        </figure>
        <div className="final-thoughts">
          {finalLines.map((line) => (
            <p key={line} data-reveal="line">
              {line}
            </p>
          ))}
        </div>
        <div className="final-declaration" data-reveal="statement">
          <p>Feliz {config.birthdayAge} anos, meu amor.</p>
          <h2 id="final-title">
            Eu te amo,
            <br />
            <em>{config.girlfriendName}.</em>
          </h2>
          <p className="signature">
            — {config.boyfriendName} <span aria-hidden="true">♥</span>
          </p>
        </div>
        <button
          className="text-button final-button"
          onClick={() => dialog.current?.showModal()}
        >
          tem mais uma coisa... <span aria-hidden="true">↗</span>
        </button>
        <p className="hours-note">
          e sim, eu fiquei horas fazendo isso KKKKKKK
        </p>
        <button
          className="secret-heart"
          aria-label="Um coração com um segredo"
          aria-expanded={secret}
          onClick={() => setSecret(!secret)}
        >
          ♡
        </button>
        {secret ? (
          <div className="secret-message" role="status">
            <p>achou mesmo que tinha acabado?</p>
            <p>eu te amo, minha cetinha ❤️</p>
            <span className="heart-burst" aria-hidden="true">
              ♥ · ♥ · ♥
            </span>
          </div>
        ) : null}
        <footer>feito por mim. inteirinho pra vc.</footer>
      </section>
      <dialog
        ref={dialog}
        className="extra-letter"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Fechar carta final"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <span className="margin-note">p.s.:</span>
        <h2>meu pagamento.</h2>
        <p>{extraLetter}</p>
        <span className="signature">— {config.boyfriendName}</span>
      </dialog>
    </>
  );
}
