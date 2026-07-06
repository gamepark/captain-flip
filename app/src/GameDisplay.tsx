import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

const isDev = import.meta.env.DEV

export const GameDisplay: FC<GameDisplayProps> = () => {
  const players = usePlayers()
  if (!players.length) return null
  return <>
    <GameTable
      verticalCenter
      xMin={-32}
      xMax={32}
      yMin={-5}
      css={isDev && { border: '1px solid #ccc' }}
      yMax={26}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
    >
      <GameTableNavigation css={[navigationCss, isDev ? navigationDevCss : navigationProdCss]} scaleStep={0.2} />
      <PlayerPanels />
      {isDev && <DevToolsHub />}
    </GameTable>
  </>
}

/* Zoom navigation — "Admiral's compass" variant.
 * Vertical stack in the bottom-left corner (above the framework's menu
 * button), each button turned into a brass compass disc with ticks.
 * The framework still renders two <button> children with an <svg> icon,
 * so we restyle them via child selectors without touching the markup. */
const navigationCss = css`
  top: auto;
  left: 1em;
  flex-direction: column;
  gap: 0.6em;

  & > button {
    /* reset the framework's white-circle look */
    background:
      radial-gradient(circle at 35% 30%,
        #f2d07a 0%,
        #a47428 30%,
        #5b3d12 80%);
    border: none;
    box-shadow:
      inset 0 0 0 0.07em rgba(91, 61, 18, 0.9),
      inset 0 0 0.2em 0.05em rgba(0, 0, 0, 0.55),
      inset 0 -0.12em 0.15em rgba(0, 0, 0, 0.35),
      inset 0 0.12em 0.15em rgba(255, 220, 140, 0.25),
      0 0.05em 0 rgba(91, 61, 18, 0.9),
      0.08em 0.1em 0.1em rgba(0, 0, 0, 0.75);
    color: #2b1d10;
    filter: none;
    position: relative;
    overflow: hidden;
  }

  /* 16-point tick ring engraved near the outer edge */
  & > button::before {
    content: '';
    position: absolute;
    inset: 0.08em;
    border-radius: 50%;
    background: conic-gradient(from 0deg,
      rgba(43, 29, 16, 0.85) 0 2deg, transparent 2deg 22.5deg,
      rgba(43, 29, 16, 0.85) 22.5deg 24.5deg, transparent 24.5deg 45deg,
      rgba(43, 29, 16, 0.85) 45deg 47deg, transparent 47deg 67.5deg,
      rgba(43, 29, 16, 0.85) 67.5deg 69.5deg, transparent 69.5deg 90deg,
      rgba(43, 29, 16, 0.85) 90deg 92deg, transparent 92deg 112.5deg,
      rgba(43, 29, 16, 0.85) 112.5deg 114.5deg, transparent 114.5deg 135deg,
      rgba(43, 29, 16, 0.85) 135deg 137deg, transparent 137deg 157.5deg,
      rgba(43, 29, 16, 0.85) 157.5deg 159.5deg, transparent 159.5deg 180deg,
      rgba(43, 29, 16, 0.85) 180deg 182deg, transparent 182deg 202.5deg,
      rgba(43, 29, 16, 0.85) 202.5deg 204.5deg, transparent 204.5deg 225deg,
      rgba(43, 29, 16, 0.85) 225deg 227deg, transparent 227deg 247.5deg,
      rgba(43, 29, 16, 0.85) 247.5deg 249.5deg, transparent 249.5deg 270deg,
      rgba(43, 29, 16, 0.85) 270deg 272deg, transparent 272deg 292.5deg,
      rgba(43, 29, 16, 0.85) 292.5deg 294.5deg, transparent 294.5deg 315deg,
      rgba(43, 29, 16, 0.85) 315deg 317deg, transparent 317deg 337.5deg,
      rgba(43, 29, 16, 0.85) 337.5deg 339.5deg, transparent 339.5deg 360deg);
    -webkit-mask: radial-gradient(circle, transparent 62%, black 64% 74%, transparent 76%);
            mask: radial-gradient(circle, transparent 62%, black 64% 74%, transparent 76%);
    pointer-events: none;
  }

  /* inner polished face where the icon sits */
  & > button::after {
    content: '';
    position: absolute;
    inset: 0.32em;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%,
      #efd89d 0%,
      #c89a4a 55%,
      #7d5418 100%);
    box-shadow:
      inset 0 0 0 0.04em rgba(91, 61, 18, 0.9),
      inset 0 0.08em 0.15em rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  /* ink-colored icon on top of the polished face */
  & > button svg {
    position: relative;
    z-index: 1;
    width: 0.85em;
    height: 0.85em;
    color: #2b1d10;
    filter: drop-shadow(0 0.03em 0 rgba(255, 220, 140, 0.5));
  }

  & > button:not(:disabled):hover,
  & > button:not(:disabled):focus {
    transform: scale(1.05);
  }

  & > button:not(:disabled):active {
    transform: scale(0.98);
    background-color: transparent;
  }

  & > button:disabled {
    filter: grayscale(0.85) brightness(0.75);
    opacity: 0.55;
  }
`

/* In dev mode, the DevToolsHub FAB sits at (bottom: 1em; left: 1em) with
 * a 3.5em × 3.5em footprint. We push the zoom stack up a bit so it sits
 * comfortably above it without overlapping. */
const navigationDevCss = css`
  bottom: 5em;
`

/* In production the DevToolsHub is not rendered, so the zoom stack
 * drops all the way down to the board edge. */
const navigationProdCss = css`
  bottom: 1em;
`
