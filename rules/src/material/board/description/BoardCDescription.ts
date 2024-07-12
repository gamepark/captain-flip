import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

export const T = { type: BoardSpaceType.TreasureMap }
export const S = { type: BoardSpaceType.CoinIfSame, value: 6, endOfGame: true }
export const D = { type: BoardSpaceType.CoinIfAllDifferent, value: 4, endOfGame: true }
export const BoardCDescription: BoardDescription = {
  board: [
    [_,  _,  _,  D,  _],
    [_,  _,  _,  N,  _],
    [T,  S,  _,  N,  _],
    [N,  N,  N,  N,  N],
    [N,  N,  N,  N,  N]
  ]
}