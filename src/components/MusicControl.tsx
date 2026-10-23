import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "../config";
import { assetPath } from "../utils/assets";
export function useMusic() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const frame = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const play = useCallback(async () => {
    if (!config.musicAvailable) {
      setUnavailable(true);
      return;
    }
    if (!audio.current) {
      audio.current = new Audio(assetPath(config.musicPath));
      audio.current.loop = true;
      audio.current.addEventListener("error", () => {
        setUnavailable(true);
        setPlaying(false);
      });
    }
    const track = audio.current;
    cancelAnimationFrame(frame.current);
    track.volume = 0;
    try {
      await track.play();
      setPlaying(true);
      setUnavailable(false);
      const start = performance.now();
      const fade = (now: number) => {
        // The first RAF timestamp can precede performance.now() within a frame.
        const progress = Math.max(0, Math.min((now - start) / 3200, 1));
        track.volume = progress * Math.max(0, Math.min(config.musicVolume, 1));
        if (progress < 1) frame.current = requestAnimationFrame(fade);
      };
      frame.current = requestAnimationFrame(fade);
    } catch {
      setUnavailable(true);
      setPlaying(false);
    }
  }, []);
  const toggle = () => {
    if (playing) {
      cancelAnimationFrame(frame.current);
      audio.current?.pause();
      setPlaying(false);
    } else void play();
  };
  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      audio.current?.pause();
    },
    [],
  );
  return { play, toggle, playing, unavailable };
}
export function MusicControl({
  playing,
  unavailable,
  toggle,
}: {
  playing: boolean;
  unavailable: boolean;
  toggle: () => void;
}) {
  return (
    <button
      className="sound-button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Desligar música" : "Ligar música"}
      title={
        unavailable
          ? "A música ainda não foi adicionada ou não pôde ser reproduzida"
          : undefined
      }
    >
      <span
        className={`sound-bars ${playing ? "playing" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        {unavailable
          ? "sem música por aqui"
          : playing
            ? "som ligado"
            : "som desligado"}
      </span>
    </button>
  );
}
