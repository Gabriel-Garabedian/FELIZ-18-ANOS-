import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { config } from "./config";
import { Intro } from "./components/Intro";
import { MusicControl, useMusic } from "./components/MusicControl";
import { Photo } from "./components/Photo";
import { Memories } from "./components/Memories";
import { ThingsILove } from "./components/ThingsILove";
import { LoveLetter } from "./components/LoveLetter";
import { Timeline } from "./components/Timeline";
import { FinalMessage } from "./components/FinalMessage";
export default function App() {
  const [stage, setStage] = useState<"closed" | "intro" | "story">("closed");
  const root = useRef<HTMLDivElement>(null);
  const storyTitle = useRef<HTMLHeadingElement>(null);
  const music = useMusic();
  const finishIntro = useCallback(() => setStage("story"), []);
  useEffect(() => {
    if (stage !== "story") return;
    window.scrollTo(0, 0);
    storyTitle.current?.focus({ preventScroll: true });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let context: gsap.Context | undefined;
    const setup = () => {
      observer?.disconnect();
      context?.revert();
      if (media.matches) return;
      context = gsap.context(() => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const element = entry.target as HTMLElement;
              // Animate from the visible layout only on arrival: no hidden content if JS fails.
              context?.add(() => {
                const kind = element.dataset.reveal;
                gsap.from(element, {
                  opacity: 0,
                  y: kind === "line" ? 10 : 24,
                  scale: kind === "photo" ? 0.97 : 1,
                  duration: kind === "statement" ? 1.15 : 0.85,
                  ease: "power2.out",
                  clearProps: "all",
                });
              });
              observer?.unobserve(element);
            });
          },
          { threshold: 0.13 },
        );
        root.current
          ?.querySelectorAll("[data-reveal]")
          .forEach((element) => observer?.observe(element));
      }, root);
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      context?.revert();
      media.removeEventListener("change", setup);
    };
  }, [stage]);
  const open = () => {
    void music.play();
    setStage("intro");
  };
  return (
    <div ref={root} className={`app stage-${stage}`}>
      {stage !== "closed" ? (
        <header className="site-header">
          <a
            href={stage === "story" ? "#story" : "#"}
            className="monogram"
            aria-label="Victoria e Gabriel"
          >
            v<span>+</span>g
          </a>
          <MusicControl
            playing={music.playing}
            unavailable={music.unavailable}
            toggle={music.toggle}
          />
        </header>
      ) : null}
      {stage === "closed" ? (
        <main className="gift-screen">
          <div className="gift-address">
            <span>para Victoria</span>
            <span>com amor, Gabriel</span>
          </div>
          <div className="gift-center">
            <p className="hello">Oi, meu amor.</p>
            <h1>
              Eu fiz uma
              <br />
              <em>coisinha</em> pra vc.
            </h1>
            <p className="gift-nickname">
              Para {config.nickname.toLocaleLowerCase("pt-BR")}{" "}
              <span
                className="two-hearts"
                aria-label="coração vermelho e preto"
              >
                ♥ <b>♥</b>
              </span>
            </p>
            <button className="open-gift" onClick={open}>
              <span className="seal" aria-hidden="true">
                g.
              </span>
              <span>abrir meu presente</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="gift-bottom">
            <span>dezoito anos de vc.</span>
            <span>um presente pra sentir, sem pressa.</span>
          </div>
        </main>
      ) : null}
      {stage === "intro" ? <Intro onComplete={finishIntro} /> : null}
      {stage === "story" ? (
        <main id="story">
          <section className="birthday-cover dark">
            <div className="cover-text">
              <p className="margin-note">
                e olha só quem chegou aos {config.birthdayAge}...
              </p>
              <h1 tabIndex={-1} ref={storyTitle}>
                {config.girlfriendName}
                <span>
                  essa é <em>pra vc.</em>
                </span>
              </h1>
              <p>
                Uma carta. Algumas fotos.
                <br />E um namorado completamente apaixonado.
              </p>
              <a href="#birthday" className="scroll-cue">
                desce devagar <span aria-hidden="true">↓</span>
              </a>
            </div>
            <figure className="cover-photo">
              <Photo
                priority
                path="/photos/foto-01.jpg"
                alt="Retrato de Victoria, a aniversariante"
              />
              <figcaption>minha pessoa. minha Rubro Negrazinha.</figcaption>
            </figure>
            <span
              className="cover-age"
              aria-label={`${config.birthdayAge} anos`}
            >
              {config.birthdayAge}
              <small>e tanta coisa pela frente.</small>
            </span>
          </section>
          <section id="birthday" className="birthday-shout red">
            <span className="margin-note">
              tá, agora preciso falar direito:
            </span>
            <h2 data-reveal="statement">
              FELIIIIZ
              <br />
              ANIVERSÁRIO,
              <br />
              <span>
                minha Rubro
                <br />
                Negrazinh<span className="extended-a">aaaaaa</span>!
              </span>
            </h2>
            <p data-reveal="line">
              finalmente {config.birthdayAge} anos em????
              <br />
              <span>KKKKKKKKK</span>
            </p>
            <span className="red-black-stitch" aria-hidden="true" />
          </section>
          <Memories />
          <ThingsILove />
          <LoveLetter />
          <section
            className="comic-break red"
            aria-label="Uma informação extremamente importante"
          >
            <p className="comic-setup" data-reveal="line">
              agora uma informação
              <br />
              extremamente importante...
            </p>
            <h2 data-reveal="statement">
              vc continua sendo
              <br />
              <em>uma gostosa.</em>
            </h2>
            <p className="comic-laugh" data-reveal="line">
              KKKKKKKKKK
            </p>
            <p className="comic-kiss" data-reveal="line">
              e extremamente e<br />
              deliciosamente beijável. <span aria-hidden="true">↗</span>
            </p>
          </section>
          {config.showTimeline ? <Timeline /> : null}
          <FinalMessage />
        </main>
      ) : null}
    </div>
  );
}
