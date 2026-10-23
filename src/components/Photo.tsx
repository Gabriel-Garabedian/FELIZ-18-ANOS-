// Vite checks the files at build time; missing personal photographs stay honest placeholders.
const supplied = new Set(__PHOTO_PATHS__);
import { useState } from "react";
import { assetPath } from "../utils/assets";
export function Photo({
  path,
  alt,
  priority = false,
  position = "50% 40%",
}: {
  path: string;
  alt: string;
  priority?: boolean;
  position?: string;
}) {
  const [failed, setFailed] = useState(false);
  const exists = supplied.has(path);
  return (
    <div className={`photo-surface ${exists && !failed ? "has-photo" : ""}`}>
      {exists && !failed ? (
        <img
          src={assetPath(path)}
          alt={alt}
          style={{ objectPosition: position }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="photo-placeholder"
          role="img"
          aria-label={`Espaço reservado: ${alt}`}
        >
          <span className="photo-corners" aria-hidden="true" />
          <span className="placeholder-word">a gente.</span>
          <span className="placeholder-caption">
            um espaço guardado pra nós
          </span>
        </div>
      )}
    </div>
  );
}
