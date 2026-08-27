import Image from "next/image";
import styles from "./HeroIllustration.module.css";

const frames = [
  {
    src: "/hero/brief.png",
    alt: "Taking the brief: writing notes in a notebook at the desk",
    className: styles.brief,
    priority: true,
  },
  {
    src: "/hero/build.png",
    alt: "Building: typing on the laptop with code on screen",
    className: styles.build,
    priority: false,
  },
  {
    src: "/hero/result.png",
    alt: "The result: a finished, polished interface glowing on the laptop screen",
    className: styles.result,
    priority: false,
  },
  {
    src: "/hero/present.png",
    alt: "Presenting the finished work with a smile",
    className: styles.present,
    priority: false,
  },
] as const;

/**
 * A full-width billboard that crossfades between four illustrated frames,
 * telling a simple looping story: brief -> build -> result -> present.
 *
 * Pure CSS opacity animation (no JS), so this stays a Server Component.
 * `prefers-reduced-motion` freezes the scene on the "present" frame.
 */
export function HeroIllustration() {
  return (
    <div className={styles.wrap}>
      {frames.map((frame) => (
        <Image
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          fill
          priority={frame.priority}
          sizes="(min-width: 1024px) 1152px, 100vw"
          className={`${styles.frame} ${frame.className}`}
        />
      ))}
      <div className={styles.overlay} aria-hidden="true" />
    </div>
  );
}