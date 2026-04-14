import { css } from '@emotion/react'

/* ---------- Shared palette (parchment / ship's log) ---------- */
export const ink = '#2b1d10'
export const inkSoft = '#4b3520'
export const inkFaint = '#6a4c2b'
export const accent = '#8b1e1e'
export const accentDim = '#b55a5a'

/* ---------- Headline ---------- */
export const headlineCss = css`
  margin: 0 0 0.2em;
  font-size: 2.2em;
  font-weight: 900;
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${ink};
  text-shadow: 0 1px 0 rgba(243, 231, 204, 0.7);
`

/* ---------- Flourish divider ---------- */
export const flourishCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  color: ${inkSoft};
  margin: 0.3em 0 1em;
`

export const flourishLineCss = css`
  height: 1px;
  width: 3em;
  background: ${inkSoft};
  opacity: 0.55;
`

export const flourishMarkCss = css`
  font-size: 1em;
  opacity: 0.7;
`

/* ---------- Lede (main description) ---------- */
export const ledeCss = css`
  font-size: 1em;
  line-height: 1.55;
  color: ${inkSoft};
  margin: 0 0 1em;
  font-weight: 500;
  max-width: 62ch;

  strong {
    color: ${accent};
    font-weight: 800;
  }

  em {
    font-style: italic;
    color: ${inkFaint};
  }
`

/* ---------- End of game banner (red wax look) ---------- */
export const endgameBannerCss = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
  align-items: center;
  padding: 0.8em 1.1em;
  margin-bottom: 1em;
  background: linear-gradient(180deg, rgba(139, 30, 30, 0.1), rgba(139, 30, 30, 0.02));
  border: 1px solid ${inkSoft};
  outline: 1px solid ${inkSoft};
  outline-offset: 3px;

  p {
    margin: 0;
    font-size: 0.95em;
    line-height: 1.5;
    color: ${ink};
  }

  p strong {
    color: ${accent};
    font-weight: 800;
  }
`

export const endgameTagCss = css`
  font-size: 0.7em;
  letter-spacing: 0.28em;
  font-weight: 900;
  color: ${accent};
  text-transform: uppercase;
  padding: 0.3em 0.8em;
  border: 1px solid ${accent};
  white-space: nowrap;
`

/* ---------- Section label ---------- */
export const sectionLabelCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  font-size: 0.7em;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${inkFaint};
  font-weight: 900;
  margin: 0 0 0.9em;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${inkFaint}, transparent);
  }
`

/* ---------- Quote (italic, indented, right aligned) ---------- */
export const quoteCss = css`
  margin: 1.2em 0 0;
  padding: 0 0 0 1em;
  border-left: 2px solid ${accent};
  font-size: 0.95em;
  line-height: 1.5;
  font-style: italic;
  color: ${inkFaint};
  font-weight: 500;

  &::before {
    content: '\\201C';
    display: inline-block;
    font-size: 1.4em;
    line-height: 0;
    vertical-align: -0.2em;
    color: ${accent};
    margin-right: 0.1em;
    font-weight: 900;
  }

  &::after {
    content: '\\201D';
    display: inline-block;
    font-size: 1.4em;
    line-height: 0;
    vertical-align: -0.2em;
    color: ${accent};
    margin-left: 0.1em;
    font-weight: 900;
  }
`

/* ---------- Help root (common shell for small helps like tile / coin / token) ---------- */
export const smallHelpRootCss = css`
  color: ${ink};
  font-size: 1em;
  line-height: 1.5;
  padding: 0.4em 0.6em 0.2em;
  max-width: 34em;
`

/* ---------- Eyebrow ---------- */
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
    height: 1px;
    background: currentColor;
  }
`

/* ---------- Info block (character power / end-of-game effect) ----------
   A small card with an uppercase tag in the corner and the description below.
   Used to split a character's immediate effect from its end-of-game scoring. */
export const infoBlockCss = css`
  position: relative;
  margin: 0 0 0.7em;
  padding: 0.8em 1em 0.8em 1em;
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.5), rgba(221, 197, 152, 0.25));
  border: 1px solid rgba(106, 76, 43, 0.4);
  border-left: 3px double ${inkSoft};
  border-radius: 2px;

  p {
    margin: 0;
    font-size: 0.95em;
    line-height: 1.5;
    color: ${ink};
  }

  p strong {
    font-weight: 800;
    color: ${ink};
  }

  p em {
    font-style: italic;
    color: ${inkSoft};
  }
`

export const infoBlockTagCss = css`
  display: inline-block;
  font-size: 0.62em;
  letter-spacing: 0.28em;
  font-weight: 900;
  text-transform: uppercase;
  color: ${accent};
  padding: 0.2em 0.7em;
  border: 1px solid ${accent};
  margin-bottom: 0.5em;
  background: rgba(243, 231, 204, 0.7);
`

/* variant for end-of-game block: deeper red background tint */
export const infoBlockEndgameCss = css`
  background: linear-gradient(180deg, rgba(139, 30, 30, 0.09), rgba(139, 30, 30, 0.02));
  border-left-color: ${accent};
`

/* ---------- Action button row (for flip action etc.) ---------- */
export const actionRowCss = css`
  margin: 0.6em 0 1em;
  display: flex;
  align-items: center;
  gap: 0.6em;
  font-size: 0.92em;
  color: ${inkSoft};
  font-style: italic;

  button {
    font-weight: 800;
    font-style: normal;
    letter-spacing: 0.04em;
  }
`
