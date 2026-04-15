import { css } from '@emotion/react'
import { ink, inkSoft, paper0, paper2 } from './palette'

/* ------------------------------------------------------------------
 * Time stats (game clocks / thinking time panel). Use parchment
 * tones so they match the player panels overhead.
 * ------------------------------------------------------------------ */
export const timeStatsContainerCss = css`
  background: linear-gradient(180deg, ${paper0}, ${paper2}) !important;
  color: ${ink} !important;
  border: 0.06em solid ${inkSoft};
`
