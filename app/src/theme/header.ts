import { css } from '@emotion/react'
import { ink, inkSoft, paper, paper0 } from './palette'

/* ------------------------------------------------------------------
 * Header bar — the strip at the top of the screen that says things
 * like "Player 2 must place the Character or flip it". Tint it into
 * the same parchment palette.
 * ------------------------------------------------------------------ */
export const headerBarCss = css`
  background: linear-gradient(180deg, ${paper0} 0%, ${paper} 100%) !important;
  color: ${ink} !important;
  border-bottom: 0.12em solid ${inkSoft};
  box-shadow: 0 0.12em 0.5em rgba(0, 0, 0, 0.4);
  font-weight: 700;
  font-style: italic;
`
