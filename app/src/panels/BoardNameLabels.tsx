/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { getSides } from '../locators/ViewHelper'

/**
 * Two parchment labels pinned to the bottom-left and bottom-right of
 * the viewport, each showing which player's adventure board is being
 * displayed on that side. Pure viewport chrome — not part of the
 * GameTable coordinate system, so they stay legible regardless of
 * zoom/pan.
 */
export const BoardNameLabels: FC = () => {
  const rules = useRules<CaptainFlipRules>()
  const me = usePlayerId()

  if (!rules || rules.players.length < 2) return null

  const { left, right } = getSides({ rules, player: me } as any)

  return (
    <>
      <BoardLabel playerId={left}  side="left" />
      <BoardLabel playerId={right} side="right" />
    </>
  )
}

const BoardLabel: FC<{ playerId: number, side: 'left' | 'right' }> = ({ playerId, side }) => {
  const name = usePlayerName(playerId) || ''
  return (
    <div css={[labelCss, side === 'left' ? leftCss : rightCss]}>
      {name}
    </div>
  )
}

const labelCss = css`
  position: absolute;
  /* GameTable coordinate origin is top-left with xMin=-32, yMin=-5.
   * A table coord (x, y) maps to CSS (left = 32 + x, top = 5 + y)
   * in em units. */
  top: 29.4em;
  transform-style: preserve-3d;
  font-family: 'IM Fell English', 'EB Garamond', serif;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.2em 0.9em;
  border-radius: 0.2em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 50;

  /* Parchment — same construction as the rest of the theme */
  background-color: #e9decb;
  background-image:
    radial-gradient(circle at 18% 22%, rgba(43,29,16,0.10) 0.8px, transparent 1.8px),
    radial-gradient(circle at 62% 38%, rgba(43,29,16,0.08) 0.6px, transparent 1.5px),
    radial-gradient(circle at 84% 74%, rgba(43,29,16,0.10) 0.7px, transparent 1.8px),
    radial-gradient(120% 80% at 50% 0%, #f3e7cc 0%, #e9decb 40%, #d9c393 100%);
  background-size: 4px 4px, 5.5px 5.5px, 6.5px 6.5px, 100% 100%;
  background-blend-mode: multiply, multiply, multiply, normal;
  box-shadow:
    inset 0 0 0 0.08em rgba(43,29,16,0.4),
    inset 0 0 0.6em rgba(91,61,18,0.22),
    0 0.2em 0.4em rgba(0,0,0,0.55);
  color: #2b1d10;
`

/* Centered horizontally on each adventure board's x coordinate.
 * x=-19 → left = 32 + (-19) = 13em, centered via translateX(-50%).
 * translateZ(100em) lifts the label above the 3D-layered table. */
const leftCss = css`
  left: 13em;
  transform: translateX(-50%) translateZ(100em);
`

const rightCss = css`
  left: 51em;
  transform: translateX(-50%) translateZ(100em);
`

