import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

const RD = { type: BoardSpaceType.ReplayIfAllDifferent }
const T = { type: BoardSpaceType.TreasureMap }
const ADJ = { type: BoardSpaceType.CoinPerDifferentAdjacent, value: 1 }
const C3 = { type: BoardSpaceType.CoinsX, value: 3 }

export const BoardFDescription: BoardDescription = {
  board: [
    [ _,  _,   _, RD,  _],
    [ _,  T,   _,  N,  _],
    [ _,  N, ADJ,  N, C3],
    [ N,  N,  N,  N,  N],
    [ N,  _,  N,  _,  N]
  ],
  rowEffects: [
    { type: BoardSpaceType.FirstXThenYRow, first: 5, then: 2, row: 1 },
    { type: BoardSpaceType.EndOfGameRowSame, value: 5, endOfGame: true, row: 0 }
  ]
}
