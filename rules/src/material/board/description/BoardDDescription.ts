import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

export const C3 = { type: BoardSpaceType.CoinsX, value: 3 }
export const PF = { type: BoardSpaceType.CoinPerFullColumn, value: 2 }
export const ST = { type: BoardSpaceType.CoinPerDifferent, value: 1 }
export const C = { type: BoardSpaceType.Cost, cost: 1 }
export const BoardDDescription: BoardDescription = {
  board: [
    [_,   _, ST,  _,  _],
    [C3, PF,  N,  N,  _],
    [N,   N,  N,  N,  C],
    [N,   N,  N,  _,  _],
    [_,   N,  N,  _,  _]
  ]
}