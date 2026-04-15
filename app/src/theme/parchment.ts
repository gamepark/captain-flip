import { css } from '@emotion/react'
import { brass, brassDk, brassHi, ink, inkFaint, paper, paper0, paper2 } from './palette'

/**
 * Parchment recipes — layered CSS blocks that produce the aged paper
 * look used everywhere (dialogs, journal drawer, small cards, help
 * popups). Keep these as building blocks: compose them, do not clone.
 */

/** Bare parchment fill — just the gradient + speckles, no borders or
 *  shadows. Use as a background on any container that already manages
 *  its own layout. */
export const parchmentFillCss = css`
  background:
    radial-gradient(circle at 22% 14%, rgba(43, 29, 16, 0.1) 0 0.08em, transparent 0.09em),
    radial-gradient(circle at 78% 36%, rgba(43, 29, 16, 0.08) 0 0.07em, transparent 0.08em),
    radial-gradient(circle at 44% 72%, rgba(43, 29, 16, 0.09) 0 0.08em, transparent 0.09em),
    radial-gradient(120% 80% at 50% 0%, ${paper0} 0%, ${paper} 50%, ${paper2} 100%);
  background-blend-mode: multiply, multiply, multiply, normal;
  color: ${ink};
`

/** Full dialog parchment: fill + inset shadows + grain overlay.
 *  Used by theme.dialog.container. */
export const parchmentDialogCss = css`
  position: relative;
  color: ${ink};
  background:
    radial-gradient(circle at 22% 14%, rgba(43, 29, 16, 0.1) 0 0.08em, transparent 0.09em),
    radial-gradient(circle at 78% 36%, rgba(43, 29, 16, 0.08) 0 0.07em, transparent 0.08em),
    radial-gradient(circle at 44% 72%, rgba(43, 29, 16, 0.09) 0 0.08em, transparent 0.09em),
    radial-gradient(120% 80% at 50% 0%, ${paper0} 0%, #e9d8b4 50%, ${paper2} 100%);
  background-blend-mode: multiply, multiply, multiply, normal;
  box-shadow:
    inset 0 0 0 0.12em rgba(106, 76, 43, 0.25),
    inset 0 0 4em rgba(106, 76, 43, 0.28),
    inset 0 0 11em rgba(72, 48, 22, 0.3),
    0 1.8em 3.5em rgba(0, 0, 0, 0.55),
    0 5em 8em rgba(0, 0, 0, 0.45);
  border-radius: 0.36em;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    background-size: 16em 16em;
    mix-blend-mode: multiply;
    opacity: 0.4;
    pointer-events: none;
    border-radius: inherit;
  }
`

/** Parchment recipe for the side drawer (journal / chat panel).
 *  Minimal on purpose — we must not override layout set by the
 *  framework (position, height, transform, ...). */
export const parchmentDrawerCss = css`
  background:
    radial-gradient(circle at 22% 14%, rgba(43, 29, 16, 0.1) 0 0.08em, transparent 0.09em),
    radial-gradient(circle at 78% 36%, rgba(43, 29, 16, 0.08) 0 0.07em, transparent 0.08em),
    radial-gradient(circle at 44% 72%, rgba(43, 29, 16, 0.09) 0 0.08em, transparent 0.09em),
    radial-gradient(120% 80% at 50% 0%, ${paper0} 0%, ${paper} 50%, ${paper2} 100%) !important;
  background-blend-mode: multiply, multiply, multiply, normal;
  color: ${ink} !important;
  box-shadow:
    inset 0 0 0 0.12em rgba(106, 76, 43, 0.25),
    inset 0 0 4em rgba(106, 76, 43, 0.28),
    inset 0 0 11em rgba(72, 48, 22, 0.3),
    0 0 1em rgba(0, 0, 0, 0.75);
`

/** Tiny brass rivet — use as a pseudo-element or a span. Absolute
 *  positioning has to be set by the caller. */
export const rivetCss = css`
  width: 0.9em;
  height: 0.9em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, ${brassHi} 0%, ${brass} 50%, ${brassDk} 100%);
  box-shadow: 0 0.06em 0.12em rgba(0, 0, 0, 0.5), inset 0 -0.12em 0.18em rgba(0, 0, 0, 0.4);
`

/** Headline typography used across dialogs (help popups, panels). */
export const headlineCss = css`
  margin: 0 0 0.2em;
  font-size: 2.2em;
  font-weight: 900;
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${ink};
  text-shadow: 0 0.06em 0 rgba(243, 231, 204, 0.7);
`

/** Eyebrow — small uppercase letter-spaced label above a headline. */
export const eyebrowCss = css`
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 0.68em;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: ${inkFaint};
  font-weight: 800;
  margin-bottom: 0.4em;

  &::before {
    content: '';
    display: inline-block;
    width: 1.4em;
    height: 0.06em;
    background: currentColor;
  }
`
