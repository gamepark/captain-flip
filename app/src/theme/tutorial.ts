import { css } from '@emotion/react'
import { accent, ink, inkSoft } from './palette'
import { parchmentDialogCss } from './parchment'

/* ------------------------------------------------------------------
 * Tutorial tooltips — parchment containers so they feel embedded in
 * the pirate theme rather than floating as a generic tooltip.
 * ------------------------------------------------------------------ */
export const tutorialContainerCss = css`
  ${parchmentDialogCss};
`

export const tutorialContentCss = css`
  color: ${ink};
  font-weight: 500;
  line-height: 1.5;

  strong { color: ${accent}; font-weight: 800; }
  em { font-style: italic; color: ${inkSoft}; }
`
