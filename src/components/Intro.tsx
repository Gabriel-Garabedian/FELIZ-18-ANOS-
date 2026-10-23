import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { introLines } from "../data/messages";
export function Intro({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll(".intro-line");
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete,
      });
      lines.forEach((line, index) => {
        timeline.call(() => setCurrent(index));
        timeline.fromTo(
          line,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.85 },
        );
        timeline.to(
          line,
          { autoAlpha: 0, y: -8, duration: 0.55 },
          `+=${index === 3 ? 3.7 : index === 4 ? 2.2 : 1.8}`,
        );
      });
    }, root);
    return () => ctx.revert();
  }, [onComplete, reduced]);
  return (
    <section
      className="intro-screen"
      ref={root}
      aria-label="Uma pequena introdução"
    >
      <span className="intro-dedication">uma história que eu gosto muito.</span>
      <div className="intro-stage" aria-live="polite" aria-atomic="true">
        {reduced ? (
          <p className="intro-manual">{introLines[current]}</p>
        ) : (
          introLines.map((line, index) => (
            <p
              key={line}
              aria-hidden={index !== current}
              className={`intro-line ${index === 4 ? "intro-mine" : ""}`}
            >
              {line}
            </p>
          ))
        )}
      </div>
      <div className="intro-footer">
        <span>{String(current + 1).padStart(2, "0")} / 07</span>
        <button
          className="text-button"
          onClick={
            reduced
              ? () =>
                  current < introLines.length - 1
                    ? setCurrent(current + 1)
                    : onComplete()
              : onComplete
          }
        >
          {reduced ? "continuar →" : "ir para a carta →"}
        </button>
      </div>
    </section>
  );
}
