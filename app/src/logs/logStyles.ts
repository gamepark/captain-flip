import { css } from '@emotion/react'
import { MaterialGame } from '@gamepark/rules-api'
import TotalCoin from '../images/coins/TotalCoin.png'
import {
  accent,
  accentDk,
  brass,
  brassDk,
  brassHi,
  ink,
  inkFaint,
  inkSoft,
  paper0,
  paper2
} from '../theme/palette'

// Re-export so existing consumers (CaptainFlipLogs.tsx) keep working
export {
  accent,
  accentDk,
  brass,
  brassDk,
  brassHi,
  ink,
  inkFaint,
  inkSoft,
  paper0,
  paper2
}

/* ------------------------------------------------------------------
 * Journal tab buttons — styled to match the parchment look.
 * theme.journal.tab applies to both tabs, tabSelected only to the
 * active one. We override the default blue/white theme.
 * ------------------------------------------------------------------ */
export const journalTabCss = css`
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.55), rgba(221, 197, 152, 0.25)) !important;
  color: ${inkFaint} !important;
  border: 0.06em solid rgba(106, 76, 43, 0.5) !important;
  font-weight: 800 !important;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-style: italic;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, ${paper0}, ${paper2}) !important;
    color: ${ink} !important;
  }
`

export const journalTabSelectedCss = css`
  background: linear-gradient(180deg, ${paper0}, ${paper2}) !important;
  color: ${accent} !important;
  border-color: ${inkSoft} !important;
  box-shadow: 0 -0.12em 0 ${accent} inset;
`

/* ------------------------------------------------------------------
 * Chat input bar — replaces the default styling of the ChatTextInput
 * at the bottom of the drawer.
 * ------------------------------------------------------------------ */
export const chatBarCss = css`
  background: rgba(243, 231, 204, 0.7) !important;
  border: 0.06em solid rgba(106, 76, 43, 0.5) !important;
  color: ${ink} !important;
  font-style: italic;
  font-family: inherit;
  box-shadow:
    inset 0 0.06em 0 rgba(243, 231, 204, 0.8),
    inset 0 -0.06em 0.18em rgba(106, 76, 43, 0.15);
`

/* ------------------------------------------------------------------
 * Base entry override — applied via theme.journal.historyEntry so
 * every log row inherits it. The framework's <LogItem> wraps content
 * in a div with this css. We reset the default dark pill to look
 * like a parchment card.
 * ------------------------------------------------------------------ */
export const historyEntryCss = css`
  width: 100%;
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.55), rgba(221, 197, 152, 0.2)) !important;
  border: 0.06em solid rgba(106, 76, 43, 0.35);
  border-left: 0.18em solid ${inkSoft};
  border-radius: 0.12em;
  margin: 0.25em 0;
  padding: 0.55em 0.8em 0.6em;
  line-height: 1.45;
  color: ${ink} !important;
  white-space: normal;
  box-shadow: 0.06em 0.12em 0 rgba(0, 0, 0, 0.05);
`

/* ---------- Text helpers ---------- */
export const whoCss = css`
  font-weight: 900;
  font-style: italic;
  color: ${ink};
`

export const numCss = css`
  font-weight: 900;
  color: ${accent};
  padding: 0 0.1em;
`

export const numLossCss = css`
  font-weight: 900;
  color: ${accentDk};
  padding: 0 0.1em;
  text-decoration: line-through;
  text-decoration-color: rgba(93, 16, 16, 0.5);
`

export const charCss = css`
  font-weight: 800;
  font-style: italic;
  color: ${ink};
`

export const metaCss = css`
  margin-top: 0.15em;
  font-size: 0.85em;
  font-style: italic;
  color: ${inkFaint};
`

/* ---------- Column badge (compact black pill) ---------- */
export const colBadgeCss = css`
  display: inline-block;
  min-width: 1.2em;
  padding: 0 0.32em;
  margin: 0 0.08em;
  font-size: 0.8em;
  font-weight: 900;
  font-style: italic;
  color: ${paper0};
  background: ${ink};
  border: 0.06em solid ${inkSoft};
  vertical-align: 0.05em;
`

/* ---------- Left / right direction badge ---------- */
export const directionBadgeCss = css`
  display: inline-block;
  padding: 0 0.4em;
  font-weight: 900;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${accent};
  border: 0.06em solid ${accent};
  background: rgba(139, 30, 30, 0.07);
  margin: 0 0.08em;
`

/* ---------- Inline icons ---------- */
/* Coin icon — same image as the player panel so logs feel consistent.
 * Rendered on a <span> via background-image, so no extra <img> node
 * needed inside <Trans> named tags. */
export const coinIconCss = css`
  display: inline-block;
  vertical-align: -0.22em;
  width: 1.2em;
  height: 1.2em;
  background: url(${TotalCoin}) center / contain no-repeat;
  margin: 0 0.1em;
`

export const mapIconCss = css`
  position: relative;
  display: inline-block;
  vertical-align: -0.14em;
  width: 1.15em;
  height: 1em;
  border-radius: 0.08em;
  background: linear-gradient(145deg, #eccf9a, #a97d3f);
  box-shadow: inset 0 0 0 0.06em rgba(43, 29, 16, 0.7);
  margin: 0 0.3em 0 0.05em;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -0.06em;
    bottom: -0.06em;
    width: 0.2em;
    background: linear-gradient(90deg, #a97d3f, #6a4a1f);
    box-shadow: inset 0 0 0 0.06em rgba(43, 29, 16, 0.8);
  }

  &::before {
    left: -0.12em;
    border-radius: 0.1em 0 0 0.1em;
  }

  &::after {
    right: -0.12em;
    border-radius: 0 0.1em 0.1em 0;
  }
`

export const tileChipCss = css`
  display: inline-block;
  vertical-align: -0.14em;
  width: 1.1em;
  height: 1.1em;
  border-radius: 0.15em;
  background: linear-gradient(145deg, ${brassHi}, ${brass}, ${brassDk});
  box-shadow:
    inset 0 0 0 0.08em rgba(43, 29, 16, 0.6),
    inset 0 0 0 0.14em rgba(243, 231, 204, 0.5);
  margin: 0 0.15em;
`

export const bombIconCss = css`
  position: relative;
  display: inline-block;
  vertical-align: -0.1em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #555 0%, #1a1a1a 60%, #000 100%);
  box-shadow: 0 0 0 0.06em rgba(0, 0, 0, 0.6);
  margin: 0 0.1em;

  &::before {
    content: '';
    position: absolute;
    top: -0.25em;
    left: 55%;
    width: 0.18em;
    height: 0.3em;
    background: #c9a04e;
    border-radius: 0.05em;
    transform: rotate(8deg);
  }
`

/* ---------- System separator entry ----------
 * Used for "Turn N · Captain X", etc.
 *
 * Framework DOM for an entry with no player and depth 0 is:
 *   <div css=entry+separator>
 *     <div>                  ← our content wrapper
 *       <TurnSeparatorLog/>
 *     </div>
 *   </div>
 * We flatten the flex so the ::before / ::after pseudo-lines frame
 * the text horizontally. NO selector is used to hide children — the
 * separator entries don't emit an avatar since we don't set `player`
 * in the LogDescription. */
export const separatorCss = css`
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0.5em 0.4em !important;
  margin: 0.6em 0 0.3em !important;
  color: ${inkFaint} !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.7em;
  font-style: italic;
  font-weight: 600;

  /* Keep the content div from being squished by the flexed ::before
   * / ::after pseudo-lines. */
  & > div {
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Horizontal fading rules on each side of the text. */
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 0.06em;
    background: linear-gradient(90deg, transparent, ${inkFaint}, transparent);
    opacity: 0.55;
  }
`

/* Font-size bump applied to the TurnSeparatorLog's text span. Must be
 * set on the text itself, not on the flex container, otherwise every
 * em-based CSS value (gap, padding, pseudo-element height) scales up. */
export const separatorTextCss = css`
  font-size: 1.5em;
`

export const separatorStrongCss = css`
  ${separatorCss};
  color: ${accent} !important;
  font-weight: 700;

  &::before,
  &::after {
    background: linear-gradient(90deg, transparent, ${accent}, transparent);
    opacity: 0.55;
  }
`

/* ---------- End-of-turn highlighted card ---------- */
export const endTurnCardCss = css`
  background: linear-gradient(180deg, rgba(139, 30, 30, 0.12), rgba(139, 30, 30, 0.03)) !important;
  border: 0.06em solid ${inkSoft} !important;
  outline: 0.06em solid ${inkSoft};
  outline-offset: 0.18em;
  border-left: 0.18em solid ${accent} !important;
  padding-bottom: 1em !important;
`

export const endTurnTagCss = css`
  display: inline-block;
  font-size: 0.72em;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 900;
  color: ${accent};
  border: 0.06em solid ${accent};
  padding: 0.15em 0.6em;
  margin-right: 0.6em;
  margin-bottom: 0.45em;
  background: rgba(243, 231, 204, 0.55);

  /* Force the body of the end-of-turn card onto its own line. */
  &::after {
    content: '';
    display: block;
    height: 0;
  }
  vertical-align: 0.15em;
`

/* Decorative "Fin de partie" header rendered ABOVE the first
 * player's end-of-game breakdown. The ::before is absolutely
 * positioned so it floats above the scoreEntry without becoming
 * a grid child (which would disrupt the grid layout). */
export const endOfGameHeaderCss = css`
  position: relative;
  margin-top: 2.8em !important;

  &::before {
    content: '✦   Fin de partie   ✦';
    position: absolute;
    left: 0;
    right: 0;
    top: -2em;
    text-align: center;
    font-style: italic;
    font-weight: 700;
    font-size: 1.1em;
    color: ${accent};
    letter-spacing: 0.12em;
    padding: 0.3em 0;
    border-top: 0.06em dashed ${accent};
    opacity: 0.85;
  }
`

/* ---------- End-game scoring entry ---------- */
export const scoreEntryCss = css`
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.55), rgba(221, 197, 152, 0.2)) !important;
  border: 0.06em solid rgba(106, 76, 43, 0.4) !important;
  border-left: 0.18em double ${inkSoft} !important;

  display: grid !important;
  grid-template-columns: auto 1fr auto;
  gap: 0.6em 0.8em;
  align-items: center;
`

export const scoreEntryLossCss = css`
  border-left-color: ${accentDk} !important;
`

export const scoreBadgeCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.9em;
  height: 1.9em;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 30%, ${brassHi}, ${brass} 60%, ${brassDk});
  box-shadow:
    inset 0 0 0 0.06em rgba(43, 29, 16, 0.6),
    inset 0 -0.12em 0.18em rgba(0, 0, 0, 0.35),
    0.06em 0.06em 0 rgba(0, 0, 0, 0.35);
  color: ${ink};
  font-size: 0.85em;
  font-weight: 900;
  font-style: italic;
`

export const scoreDeltaCss = css`
  font-size: 1.05em;
  font-weight: 900;
  color: ${accent};
  white-space: nowrap;
`

export const scoreDeltaLossCss = css`
  ${scoreDeltaCss};
  color: ${accentDk};
`

/* ---------- Victory entry ----------
 * Parchment hero panel for the final winner. No red outline — just
 * a warm parchment glow with brass accents and an ink frame. */
export const victoryCss = css`
  position: relative;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(242, 208, 122, 0.35), transparent 70%),
    linear-gradient(180deg, rgba(253, 246, 220, 0.95), rgba(221, 197, 152, 0.6)) !important;
  border: 0.12em double ${inkSoft} !important;
  border-radius: 0.3em !important;
  text-align: center !important;
  padding: 1.4em 1.5em 1.5em !important;
  margin: 1.2em 0 0.8em !important;
  display: block !important;
  box-shadow:
    inset 0 0 0 0.06em rgba(243, 231, 204, 0.8),
    0 0.25em 0.8em rgba(0, 0, 0, 0.25);

  /* Decorative brass corner rivets */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 0.55em;
    height: 0.55em;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, ${brassHi}, ${brass} 55%, ${brassDk});
    box-shadow: inset 0 0 0 0.06em rgba(43, 29, 16, 0.7), 0 0.05em 0.08em rgba(0, 0, 0, 0.4);
  }
  &::before { top: 0.4em; left: 0.4em; }
  &::after { top: 0.4em; right: 0.4em; }
`

export const victoryTagCss = css`
  display: block;
  font-size: 1em;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-weight: 900;
  color: ${accent};
  margin-bottom: 1em;
`

export const victoryCrownCss = css`
  display: block;
  font-size: 1.4em;
  color: ${brass};
  text-shadow:
    0 0.06em 0 ${brassDk},
    0 0 0.3em rgba(242, 208, 122, 0.5);
  margin-bottom: 0.1em;
`

export const victoryWinnerCss = css`
  display: block;
  font-size: 1.4em;
  font-weight: 900;
  font-style: italic;
  color: ${accent};
  line-height: 1;
  margin-bottom: 0.3em;
`

export const victoryTotalCss = css`
  display: block;
  font-size: 0.95em;
  color: ${inkSoft};
  font-style: italic;

  strong {
    color: ${accent};
    font-size: 1.15em;
    font-weight: 900;
    font-style: normal;
  }
`

/* ---------- Player colour palette ----------
 * Four pirate-themed player colours: bordeaux / moss / navy / burnt
 * gold. Used to tint the depth-0 log entries so each line is
 * immediately attributable to its player. */
export const playerColors: { color: string; soft: string }[] = [
  { color: '#8b1e1e', soft: 'rgba(139, 30, 30, 0.14)' },   // bordeaux
  { color: '#3a5e2a', soft: 'rgba(58, 94, 42, 0.14)' },    // moss green
  { color: '#1e3a5f', soft: 'rgba(30, 58, 95, 0.14)' },    // navy
  { color: '#a06218', soft: 'rgba(160, 98, 24, 0.15)' },   // burnt gold
]

/** Build a CSS block that tints a depth-0 log entry with the colour
 *  associated with `playerId`. Matches the mockup: soft gradient
 *  fill + thick coloured left border + subtle outer border. The
 *  `playerId → index` mapping comes from `game.players` so the
 *  colour assignment is stable across a match. */
export const playerEntryCss = (game: MaterialGame, playerId: number | undefined) => {
  const index = playerId !== undefined ? game.players.indexOf(playerId) : -1
  const palette = playerColors[index] ?? playerColors[0]
  return css`
    background: linear-gradient(180deg, ${palette.soft}, rgba(221, 197, 152, 0.2)) !important;
    border: 0.06em solid rgba(106, 76, 43, 0.35) !important;
    border-left: 0.3em solid ${palette.color} !important;
    border-radius: 0.15em !important;
  `
}
