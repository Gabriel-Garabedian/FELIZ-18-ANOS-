import { useRef, useState } from "react";
import { album, extraPhotos } from "../data/memories";
import { Photo } from "./Photo";
import { assetPath } from "../utils/assets";
export function Memories() {
  const lightbox = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState({ image: "", caption: "" });
  const openPhoto = (photo: { image: string; caption: string }) => {
    setSelected(photo);
    lightbox.current?.showModal();
  };
  return (
    <section className="album paper" aria-labelledby="album-title">
      <div className="section-heading">
        <p className="margin-note">pra guardar bem pertinho.</p>
        <h2 id="album-title">
          Tem foto.
          <br />
          Tem <em>nós.</em>
        </h2>
        <p>
          Algumas imagens. Mil motivos
          <br />
          pra querer viver tudo de novo.
        </p>
      </div>
      <div className="album-spread">
        {album.map((photo, i) => (
          <figure
            className={`album-photo ${photo.shape} photo-${i}`}
            key={photo.image}
            data-reveal="photo"
          >
            <button
              className="photo-open"
              aria-label={`Ver foto inteira: ${photo.caption}`}
              onClick={() => openPhoto(photo)}
            >
              <Photo
                path={photo.image}
                position={photo.position}
                alt={`Gabriel e Victoria: ${photo.caption}`}
              />
              <span className="photo-open-hint" aria-hidden="true">
                ver inteirinha ↗
              </span>
            </button>
            <figcaption>
              <span>{photo.caption}</span>
              <small>{photo.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <details className="more-memories">
        <summary>
          eu não consegui escolher só essas... <span aria-hidden="true">+</span>
        </summary>
        <p>mais um pouquinho da gente. toca numa foto pra ver inteira.</p>
        <div className="extra-photos">
          {extraPhotos.map((photo) => (
            <figure key={photo.image}>
              <button
                className="photo-open"
                aria-label={`Ver foto inteira: ${photo.caption}`}
                onClick={() => openPhoto(photo)}
              >
                <Photo
                  path={photo.image}
                  position={photo.position}
                  alt={`Gabriel e Victoria: ${photo.caption}`}
                />
              </button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </details>
      <p className="album-postscript">
        meu lugar favorito nas fotos é do seu lado.
      </p>
      <dialog
        ref={lightbox}
        className="photo-dialog"
        aria-label="Fotografia completa"
        onClick={(event) => {
          if (event.target === event.currentTarget) lightbox.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Fechar fotografia"
          onClick={() => lightbox.current?.close()}
        >
          ×
        </button>
        {selected.image ? (
          <img src={assetPath(selected.image)} alt={selected.caption} />
        ) : null}
        <p>{selected.caption}</p>
      </dialog>
    </section>
  );
}
