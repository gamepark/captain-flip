import { css } from '@emotion/react'
import { getBoardTitle } from '@gamepark/captain-flip/CaptainFlipOptions'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { BoardDescription, BoardSpaceEffect } from '@gamepark/captain-flip/material/board/description/BoardCommon'
import { BoardSpaceType } from '@gamepark/captain-flip/material/board/description/BoardSpaceType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getEffectImage } from '../../effects/effectIcon'
import BoardA from '../../images/boards/BoardA.jpg'
import BoardB from '../../images/boards/BoardB.jpg'
import BoardC from '../../images/boards/BoardC.jpg'
import BoardD from '../../images/boards/BoardD.jpg'
import BoardE from '../../images/boards/BoardE.jpg'
import BoardF from '../../images/boards/BoardF.jpg'
import BoardG from '../../images/boards/BoardG.jpg'
import BoardH from '../../images/boards/BoardH.jpg'
import BoardI from '../../images/boards/BoardI.jpg'
import Flag from '../../images/boards/Flag.png'

const boardImages: Record<BoardType, string> = {
  [BoardType.BoardA]: BoardA,
  [BoardType.BoardB]: BoardB,
  [BoardType.BoardC]: BoardC,
  [BoardType.BoardD]: BoardD,
  [BoardType.BoardE]: BoardE,
  [BoardType.BoardF]: BoardF,
  [BoardType.BoardG]: BoardG,
  [BoardType.BoardH]: BoardH,
  [BoardType.BoardI]: BoardI,
}

export const AdventureBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const description = new BoardHelper(rules.game).boardDescription
  const effects = getEffects(description)
  const boardId = (item.id ?? rules.remind(Memory.Board)) as BoardType
  const boardImage = boardImages[boardId] ?? boardImages[BoardType.BoardA]

  return (
    <div css={dialogCss}>
      {/* brass rivets in corners */}
      <span css={[rivetCss, rivetTlCss]}/>
      <span css={[rivetCss, rivetTrCss]}/>
      <span css={[rivetCss, rivetBlCss]}/>
      <span css={[rivetCss, rivetBrCss]}/>

      {/* LEFT : board portrait (sticky while scrolling the right pane) */}
      <aside css={boardPaneCss}>
        <div css={boardStickyCss}>
          <div css={boardFrameCss}>
            <span css={[tapeCss, tapeTopCss]}/>
            <span css={[tapeCss, tapeBottomCss]}/>
            <div css={boardInnerCss}>
              <img src={boardImage} alt=""/>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT : content */}
      <section css={contentPaneCss}>
        <h2 css={headlineCss}>
          <Trans i18nKey={getBoardTitle(boardId)}/>
        </h2>
        <div css={flourishCss}>
          <span css={flourishLine}/>
          <span css={flourishMark}>✦</span>
          <span css={flourishLine}/>
        </div>

        <p css={ledeCss}>
          <Trans i18nKey="board.bonus"/>
        </p>

        <div css={endgameBannerCss}>
          <span css={endgameTagCss}>
            <Trans i18nKey="end-game"/>
          </span>
          <p>
            <Trans i18nKey="end-game.rule"/>
          </p>
        </div>

        <div css={sectionLabelCss}>
          <Trans i18nKey="board.effects-label"/>
        </div>

        <div css={effectListCss}>
          {effects.map((e, index) => (
            <EffectExplaination key={index} board={boardId} effect={e!}/>
          ))}
        </div>

        <FlagExplaination {...props} />
      </section>
    </div>
  )
}

type EffectExplainationProps = {
  board: BoardType
  effect: BoardSpaceEffect
}

const getEffectSignature = (effect: BoardSpaceEffect) => {
  const { type, value, first, then, isAllSame, isAllDifferent, sextant, bomb, bombWhenFilled, _fromTreasureMap } = effect
  return JSON.stringify({ type, value, first, then, isAllSame, isAllDifferent, sextant, bomb, bombWhenFilled, _fromTreasureMap })
}

const getEffects = (description: BoardDescription) => {
  const board = description.board
  const effects: BoardSpaceEffect[] = []
  const seen = new Set<string>()
  const pushUnique = (effect: BoardSpaceEffect) => {
    const signature = getEffectSignature(effect)
    if (seen.has(signature)) return
    seen.add(signature)
    effects.push(effect)
  }
  const pushCell = (cell: BoardSpaceEffect) => {
    // A Treasure Map space with bombWhenFilled: the scroll triggers normally,
    // and the space acts as a bonus bomb once covered. Display both lines.
    if (cell.type === BoardSpaceType.TreasureMap && cell.bombWhenFilled) {
      pushUnique({ type: BoardSpaceType.TreasureMap })
      pushUnique({ type: BoardSpaceType.Bomb, _fromTreasureMap: true })
      return
    }
    pushUnique(cell)
  }
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < 5; y++) {
      const line = board[y]
      const cell = line[x]
      if (cell === undefined) continue
      if (cell.type === BoardSpaceType.None && !cell.sextant && !cell.bomb) continue
      pushCell(cell)
    }
  }

  if (description.rowEffects) {
    for (const rowEffect of description.rowEffects) {
      pushUnique(rowEffect)
    }
  }

  return effects
}

const EffectExplaination: FC<EffectExplainationProps> = (props) => {
  const { board, effect } = props
  const image = getEffectImage(board, effect)
  return (
    <div css={effectCardCss}>
      <div css={effectIconCss}>
        {image && <Picture src={image}/>}
      </div>
      <div css={effectTextCss}>
        {getEffectDesc(effect)}
      </div>
    </div>
  )
}

const getEffectDesc = (effect: BoardSpaceEffect) => {
  switch (effect.type) {
    case BoardSpaceType.CoinsX:
      return (
        <Trans i18nKey="effect.take-coins" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.TreasureMap:
      if (effect.isAllSame) {
        return (
          <Trans i18nKey="effect.treasure.same" values={{ number: effect.value }}>
            <strong/>
          </Trans>
        )
      }
      return (
        <Trans i18nKey="cartographer.effect">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.EndOfGameCoinIfSame:
      return (
        <Trans i18nKey="effect.same-all" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.EndOfGameCoinIfAllDifferent:
      return (
        <Trans i18nKey="effect.diff-all" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerFullColumn:
      return (
        <Trans i18nKey="effect.column-full" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerDifferent:
      return (
        <Trans i18nKey="effect.diff-each" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Cost:
      return (
        <Trans i18nKey="effect.pay" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Flip:
      if (effect.isAllDifferent) {
        return (
          <Trans i18nKey="effect.flip.diff">
            <strong/>
          </Trans>
        )
      }
      break
    case BoardSpaceType.Replay:
      if (effect.isAllSame) {
        return (
          <Trans i18nKey="effect.replay.same">
            <strong/>
          </Trans>
        )
      }
      break
    case BoardSpaceType.FirstXThenY:
      if (effect.first === 0) {
        return (
          <Trans i18nKey="effect.not-first" values={{ number: effect.then }}>
            <strong/>
          </Trans>
        )
      }
      return (
        <Trans i18nKey="effect.race" values={{ first: effect.first, then: effect.then }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.ReplayIfAllDifferent:
      return (
        <Trans i18nKey="effect.replay.diff">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerDifferentAdjacent:
      return (
        <Trans i18nKey="effect.diff-adjacent" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.XIfRowSame:
      return (
        <Trans i18nKey="effect.row-same" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.FirstXThenYRow:
      return (
        <Trans i18nKey="effect.row-first-then" values={{ first: effect.first, then: effect.then }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinAndTreasureMap:
      return (
        <Trans i18nKey="effect.coins-and-map" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerTreasureMap:
      return (
        <Trans i18nKey="effect.coins-per-map" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.PassTreasureMap:
      return (
        <Trans i18nKey="effect.pass-map">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.FirstFlipThenY:
      return (
        <Trans i18nKey="effect.first-flip-then" values={{ then: effect.then }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.PlayFromCell:
      return (
        <Trans i18nKey="effect.play-from-cell">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.FlipCell:
      return (
        <Trans i18nKey="effect.flip-cell">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerBomb:
      return (
        <Trans i18nKey="effect.coins-per-bomb" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.StealLeft:
      return (
        <Trans i18nKey="effect.steal-left">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.StealRight:
      return (
        <Trans i18nKey="effect.steal-right">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Sextant:
      return (
        <Trans i18nKey="effect.sextant">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Bomb:
      if (effect._fromTreasureMap) {
        return (
          <Trans i18nKey="effect.bomb-when-filled">
            <strong/>
          </Trans>
        )
      }
      return (
        <Trans i18nKey="effect.bomb">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.None:
      if (effect.sextant) {
        return (
          <Trans i18nKey="effect.sextant">
            <strong/>
          </Trans>
        )
      }
      if (effect.bomb) {
        return (
          <Trans i18nKey="effect.bomb">
            <strong/>
          </Trans>
        )
      }
      break
  }

  return
}

const FlagExplaination: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const player = usePlayerId()
  const firstPlayer = rules.players[0]
  const firstPlayerName = usePlayerName(firstPlayer)
  const lastPlayer = rules.players[rules.players.length - 1]
  const lastPlayerName = usePlayerName(lastPlayer)
  const itsMe = player && firstPlayer === player
  if (item.location?.player !== firstPlayer) return null

  return (
    <div css={flagBlockCss}>
      <div css={flagIconCss}/>
      <div>
        <div css={flagLabelCss}>
          <Trans i18nKey="end-game.flag"/>
        </div>
        {itsMe && (
          <div>
            <Trans i18nKey="end-game.flag.you"/>
          </div>
        )}
        {!itsMe && (
          <div>
            <Trans i18nKey="end-game.flag.player" values={{ firstPlayer: firstPlayerName }}/>
          </div>
        )}
        {lastPlayer === player && (
          <div>
            <Trans i18nKey="end-game.last.you"/>
          </div>
        )}
        {lastPlayer !== player && (
          <div>
            <Trans i18nKey="end-game.last.player" values={{ player: lastPlayerName }}/>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Palette (parchment / ship's log) ---------- */
const ink = '#2b1d10'
const inkSoft = '#4b3520'
const inkFaint = '#6a4c2b'
const accent = '#8b1e1e'
const brassGold = '#a47428'
const brassHi = '#f2d07a'
const brassDark = '#5b3d12'

/* ---------- Split layout ----------
   Only the right content pane scrolls; the left board pane and the
   decorative rivets stay anchored to the dialog frame.
*/
const dialogCss = css`
  position: relative;
  display: grid;
  grid-template-columns: 22em 1fr;
  gap: 2em;
  padding: 1.4em 1.6em 1.2em 1.4em;
  color: ${ink};
  line-height: 1.5;
  width: min(68em, 95vw);
  height: 82vh;
  height: 82dvh;
  max-height: 82vh;
  max-height: 82dvh;
  overflow: hidden;

  @media (max-width: 60em) {
    grid-template-columns: 1fr;
    gap: 1.4em;
    width: 100%;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`

const boardPaneCss = css`
  position: relative;
  padding: 0.6em 0.4em;

  &::after {
    content: '';
    position: absolute;
    top: 0.4em;
    bottom: 0.4em;
    right: -1em;
    width: 1px;
    background: repeating-linear-gradient(180deg, transparent 0 0.4em, rgba(106, 76, 43, 0.45) 0.4em 0.65em);

    @media (max-width: 60em) {
      display: none;
    }
  }
`

const boardStickyCss = css`
  width: 100%;
`

/* ---------- Brass corner rivets ---------- */
const rivetCss = css`
  position: absolute;
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, ${brassHi} 0%, ${brassGold} 50%, ${brassDark} 100%);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.5),
    inset 0 -2px 3px rgba(0, 0, 0, 0.4);
  z-index: 10;
  pointer-events: none;
`
const rivetTlCss = css`top: 0.15em; left: 0.15em;`
const rivetTrCss = css`top: 0.15em; right: 1em;`
const rivetBlCss = css`bottom: 0.15em; left: 0.15em;`
const rivetBrCss = css`bottom: 0.15em; right: 1em;`

const boardFrameCss = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0.9em;
  background: linear-gradient(145deg, ${brassHi}, ${brassGold} 48%, ${brassDark});
  border-radius: 0.2em;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.25),
    0 1.2em 2em rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 230, 170, 0.4);

  &::before {
    content: '';
    position: absolute;
    inset: 0.4em;
    border: 1px solid rgba(43, 29, 16, 0.55);
    border-radius: 0.15em;
    pointer-events: none;
    z-index: 1;
  }
`

const boardInnerCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.15em;
  overflow: hidden;
  background: #2a1a0d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.95) contrast(1.05);
  }
`

const tapeCss = css`
  position: absolute;
  width: 5.4em;
  height: 1em;
  background: linear-gradient(180deg, rgba(241, 228, 200, 0.65), rgba(221, 197, 152, 0.8));
  border: 1px solid rgba(106, 76, 43, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  z-index: 2;
`

const tapeTopCss = css`
  top: -0.5em;
  left: 2.4em;
  transform: rotate(-4deg);
`

const tapeBottomCss = css`
  bottom: -0.5em;
  right: 2.6em;
  transform: rotate(3deg);
`

const contentPaneCss = css`
  min-width: 0;
  min-height: 0;
  align-self: stretch;
  overflow-y: auto;
  padding-right: 0.4em;

  @media (max-width: 60em) {
    overflow-y: visible;
  }
`

/* ---------- Headline ---------- */
const headlineCss = css`
  margin: 0 0 0.3em;
  font-size: 2.4em;
  font-weight: 900;
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${ink};
  text-shadow: 0 1px 0 rgba(243, 231, 204, 0.7);
`

/* ---------- Flourish divider ---------- */
const flourishCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  color: ${inkSoft};
  margin: 0.3em 0 1em;
`
const flourishLine = css`
  height: 1px;
  width: 3em;
  background: ${inkSoft};
  opacity: 0.55;
`
const flourishMark = css`
  font-size: 1em;
  opacity: 0.7;
`

/* ---------- Lede (rule generale) ---------- */
const ledeCss = css`
  font-size: 1em;
  line-height: 1.55;
  color: ${inkSoft};
  margin: 0 0 1.2em;
  font-weight: 500;
  max-width: 62ch;

  strong {
    color: ${accent};
    font-weight: 800;
  }
`

/* ---------- End of game banner ---------- */
const endgameBannerCss = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
  align-items: center;
  padding: 0.8em 1.1em;
  margin-bottom: 1.4em;
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

const endgameTagCss = css`
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
const sectionLabelCss = css`
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

/* ---------- Effects list ---------- */
const effectListCss = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55em;
`

const effectCardCss = css`
  display: grid;
  grid-template-columns: 3.6em 1fr;
  gap: 0.9em;
  align-items: center;
  padding: 0.6em 0.9em 0.6em 0.6em;
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.45), rgba(221, 197, 152, 0.2));
  border: 1px solid rgba(106, 76, 43, 0.35);
  border-left: 3px double ${inkSoft};
  border-radius: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(2px);
    box-shadow: 3px 3px 0 rgba(139, 30, 30, 0.12);
  }
`

const effectIconCss = css`
  width: 3.6em;
  height: 3.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #f6ead0, #ddc598);
  border: 1px solid rgba(106, 76, 43, 0.4);
  border-radius: 2px;
  box-shadow:
    inset 0 0 0 1px rgba(243, 231, 204, 0.6),
    0 1px 0 rgba(0, 0, 0, 0.1);

  > picture {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86%;
    height: 86%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.15));
  }
`

const effectTextCss = css`
  font-size: 0.95em;
  line-height: 1.5;
  color: ${ink};

  strong {
    font-weight: 800;
    color: ${ink};
  }

  em {
    font-style: italic;
    color: ${inkSoft};
  }
`

/* ---------- Flag block ---------- */
const flagBlockCss = css`
  margin-top: 1.2em;
  padding: 0.8em 1.1em;
  border: 1px solid ${inkSoft};
  background: repeating-linear-gradient(
    45deg,
    rgba(139, 30, 30, 0.05) 0 12px,
    rgba(139, 30, 30, 0.02) 12px 24px
  );
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
  align-items: center;

  > div:last-child > div {
    font-size: 0.92em;
    line-height: 1.5;
    color: ${inkSoft};
    margin: 0;
  }
`

const flagIconCss = css`
  background: url(${Flag}) no-repeat top center;
  background-size: contain;
  height: 3.2em;
  width: 2.2em;
`

const flagLabelCss = css`
  font-size: 0.72em;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${accent} !important;
  font-weight: 900;
  margin-bottom: 0.3em !important;
`