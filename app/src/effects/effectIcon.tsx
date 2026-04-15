/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { BoardSpaceEffect } from '@gamepark/captain-flip/material/board/description/BoardCommon'
import { BoardSpaceType } from '@gamepark/captain-flip/material/board/description/BoardSpaceType'
import { FC } from 'react'
import Board1PerAdjacent from '../images/effect/Board1PerAdjacent.png'
import Board2CoinPerTreasureMapLine from '../images/effect/Board2CoinPerTreasureMapLine.png'
import Board2PerBomb from '../images/effect/Board2PerBomb.png'
import Board3CPlusMap from '../images/effect/Board3CPlusMap.png'
import Board5CoinIfAllEqualsLine from '../images/effect/Board5CoinIfAllEqualsLine.png'
import Board5Then2 from '../images/effect/Board5Then2.png'
import Board5Then2Line from '../images/effect/Board5Then2Line.png'
import BoardACoin3 from '../images/effect/BoardACoin3.png'
import BoardACoin5 from '../images/effect/BoardACoin5.png'
import BoardATreasureMap from '../images/effect/BoardATreasureMap.png'
import BoardB0Then2 from '../images/effect/BoardB0Then2.png'
import BoardB1Then0 from '../images/effect/BoardB1Then0.png'
import BoardB2Then1 from '../images/effect/BoardB2Then1.png'
import BoardB4Then2 from '../images/effect/BoardB4Then2.png'
import BoardB6Then3 from '../images/effect/BoardB6Then3.png'
import BoardBombDiag from '../images/effect/BoardBombDiag.png'
import BoardCCoin4 from '../images/effect/BoardCCoin4.jpg'
import BoardCCoin6 from '../images/effect/BoardCCoin6.jpg'
import BoardCoin3 from '../images/effect/BoardCoin3.png'
import BoardCTreasureMap from '../images/effect/BoardCTreasureMap.png'
import BoardDCoin3 from '../images/effect/BoardDCoin3.png'
import BoardDCoinFull from '../images/effect/BoardDCoinFull.png'
import BoardDCoinPerDiff from '../images/effect/BoardDCoinPerDiff.png'
import BoardDCost from '../images/effect/BoardDCost.png'
import BoardDrawIfAllDifferent from '../images/effect/BoardDrawIfAllDifferent.png'
import BoardECoin3 from '../images/effect/BoardECoin3.png'
import BoardECoin4 from '../images/effect/BoardECoin4.png'
import BoardEFlip from '../images/effect/BoardEFlip.png'
import BoardEReplay from '../images/effect/BoardEReplay.png'
import BoardETreasureMap from '../images/effect/BoardETreasureMap.png'
import BoardFlipAnd2Coins from '../images/effect/BoardFlipAnd2Coins.png'
import BoardFlipCellTile from '../images/effect/BoardFlipCellTile.png'
import BoardMoveTreasureMapLeftRight from '../images/effect/BoardMoveTreasureMapLeftRight.png'
import BoardPlaceTileInCell from '../images/effect/BoardPlaceTileInCell.png'
import BoardSextanIcon from '../images/effect/BoardSextanIcon.png'
import BoardSteal1CToLeftForTieIdentical from '../images/effect/BoardSteal1CToLeftForTieIdentical.png'
import BoardSteal1CToRightForTieIdentical from '../images/effect/BoardSteal1CToRightForTieIdentical.png'
import BombIcon from '../images/effect/BombIcon.png'

/** Return the illustrative image for a given board space effect on a
 *  given board. Some effects are visually identical across boards,
 *  others have a board-specific variant (e.g. TreasureMap on Board A
 *  vs Board E). Returns undefined when no image is available. */
export const getEffectImage = (board: BoardType, effect: BoardSpaceEffect): string | undefined => {
  switch (effect.type) {
    case BoardSpaceType.CoinsX:
      if (board === BoardType.BoardA) {
        if (effect.value === 3) return BoardACoin3
        if (effect.value === 5) return BoardACoin5
      }
      if (board === BoardType.BoardD) {
        if (effect.value === 3) return BoardDCoin3
      }
      if (board === BoardType.BoardE) {
        if (effect.value === 3) return BoardECoin3
        if (effect.value === 4) return BoardECoin4
      }
      if (effect.value === 3) return BoardCoin3
      return
    case BoardSpaceType.TreasureMap:
      if (board === BoardType.BoardA) return BoardATreasureMap
      if (board === BoardType.BoardE) return BoardETreasureMap
      return BoardCTreasureMap
    case BoardSpaceType.EndOfGameCoinIfSame:
      if (board === BoardType.BoardC) return BoardCCoin6
      return
    case BoardSpaceType.EndOfGameCoinIfAllDifferent:
      if (board === BoardType.BoardC) return BoardCCoin4
      return
    case BoardSpaceType.Cost:
      if (board === BoardType.BoardD) return BoardDCost
      return
    case BoardSpaceType.FirstXThenY:
      if (board === BoardType.BoardB) {
        if (effect.first === 1 && effect.then === 0) return BoardB1Then0
        if (effect.first === 2 && effect.then === 1) return BoardB2Then1
        if (effect.first === 6 && effect.then === 3) return BoardB6Then3
        if (effect.first === 0 && effect.then === 2) return BoardB0Then2
        if (effect.first === 4 && effect.then === 2) return BoardB4Then2
      }
      if (effect.first === 5 && effect.then === 2) return Board5Then2
      return
    case BoardSpaceType.CoinPerFullColumn:
      return BoardDCoinFull
    case BoardSpaceType.CoinPerDifferent:
      return BoardDCoinPerDiff
    case BoardSpaceType.Flip:
      return BoardEFlip
    case BoardSpaceType.Replay:
      return BoardEReplay
    case BoardSpaceType.CoinPerDifferentAdjacent:
      return Board1PerAdjacent
    case BoardSpaceType.ReplayIfAllDifferent:
      return BoardDrawIfAllDifferent
    case BoardSpaceType.FirstXThenYRow:
      if (effect.first === 5 && effect.then === 2) return Board5Then2Line
      return
    case BoardSpaceType.XIfRowSame:
      if (effect.value === 5) return Board5CoinIfAllEqualsLine
      return
    case BoardSpaceType.FlipCell:
      return BoardFlipCellTile
    case BoardSpaceType.PlayFromCell:
      return BoardPlaceTileInCell
    case BoardSpaceType.CoinAndTreasureMap:
      return Board3CPlusMap
    case BoardSpaceType.CoinPerTreasureMap:
      return Board2CoinPerTreasureMapLine
    case BoardSpaceType.PassTreasureMap:
      return BoardMoveTreasureMapLeftRight
    case BoardSpaceType.FirstFlipThenY:
      return BoardFlipAnd2Coins
    case BoardSpaceType.CoinPerBomb:
      return Board2PerBomb
    case BoardSpaceType.StealLeft:
      return BoardSteal1CToLeftForTieIdentical
    case BoardSpaceType.StealRight:
      return BoardSteal1CToRightForTieIdentical
    case BoardSpaceType.Sextant:
      return BoardSextanIcon
    case BoardSpaceType.None:
      if (effect.sextant) return BoardSextanIcon
      if (effect.bomb) return BombIcon
      return
    case BoardSpaceType.Bomb:
      if (effect._fromTreasureMap) return BoardBombDiag
      return BombIcon
  }
}

/* Inline effect icon rendered at the end of a log line to identify
 * which board space produced a coin gain. Default size is 2.4em —
 * large enough to read the icon but still inline with the text. */
export const EffectIcon: FC<{ board: BoardType; effect: BoardSpaceEffect }> = ({ board, effect }) => {
  const src = getEffectImage(board, effect)
  if (!src) return null
  return <img src={src} alt="" css={effectIconCss}/>
}

const effectIconCss = css`
  display: inline-block;
  vertical-align: -0.9em;
  width: 2.5em;
  height: 2.5em;
  object-fit: contain;
  border-radius: 0.2em;
  margin: 0 0.15em;
`
