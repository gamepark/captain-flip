import { css } from '@emotion/react'
import { accent } from './palette'
import { parchmentDialogCss } from './parchment'

/* ------------------------------------------------------------------
 * Result dialog (end-of-game scoreboard) — parchment container with
 * sealing-wax accents.
 * ------------------------------------------------------------------ */
export const resultContainerCss = css`
  ${parchmentDialogCss};
  border: 0.06em double ${accent};
`
