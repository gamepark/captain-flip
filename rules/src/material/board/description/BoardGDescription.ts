import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

const FC = { type: BoardSpaceType.FlipCell }
const T = { type: BoardSpaceType.TreasureMap }
const FT = { type: BoardSpaceType.FirstXThenY, first: 5, then: 2 }
const PC = { type: BoardSpaceType.PlayFromCell }

export const BoardGDescription: BoardDescription = {
  board: [
    [FC, _,  _,  _,  _],
    [ N,  T, FT, _,  _],
    [ _,  N,  N, PC, PC],
    [ _,  N,  N,  N,  N],
    [ _,  _,  N,  N,  N]
  ]
}
