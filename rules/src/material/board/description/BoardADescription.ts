import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

export const C5 = { type: BoardSpaceType.CoinsX, value: 5}
export const C3 = { type: BoardSpaceType.CoinsX, value: 3}
export const BoardADescription: BoardDescription = {
  board: [
    [_, _, C5, _,  _],
    [_, _,  N, N,  _],
    [_, N,  N, N, C3],
    [N, N,  N, _,  N],
    [N, N,  N, _,  N]
  ]
}