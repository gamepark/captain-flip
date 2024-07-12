import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

export const C4 = { type: BoardSpaceType.CoinsX, value: 4 }
export const C3 = { type: BoardSpaceType.CoinsX, value: 3 }
export const T = { type: BoardSpaceType.TreasureMap, isAllSame: true }
export const F = { type: BoardSpaceType.Flip, isAllDifferent: true }
export const R = { type: BoardSpaceType.Replay, isAllSame: true }
export const BoardEDescription: BoardDescription = {
  board: [
    [_,  _,  _,  _,  _],
    [C4, _,  _,  _, C3],
    [N,  _,  F,  R,  N],
    [N,  T,  N,  _,  N],
    [N,  N,  N,  _,  _]
  ]
}