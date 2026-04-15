import { css } from '@emotion/react'
import { accent, ink, inkSoft, paper0, paper2 } from './palette'

/* ------------------------------------------------------------------
 * Player panels — parchment cards on dark backgrounds, brass ring
 * when active.
 * ------------------------------------------------------------------ */
export const playerPanelCss = css`
  background: linear-gradient(180deg, ${paper0} 0%, ${paper2} 100%) !important;
  color: ${ink} !important;
  border: 0.06em solid ${inkSoft};
  box-shadow:
    inset 0 0 0 0.06em rgba(243, 231, 204, 0.6),
    0 0.12em 0.6em rgba(0, 0, 0, 0.45);
`

export const playerDataBadgeCss = css`
  background: linear-gradient(180deg, ${paper0}, ${paper2}) !important;
  color: ${accent} !important;
  border: 0.06em solid ${inkSoft};
  font-weight: 900;
  font-style: italic;
`
