import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

export const OZ = { type: BoardSpaceType.FirstXThenY, first: 1, then: 0 }
export const TO = { type: BoardSpaceType.FirstXThenY, first: 2, then: 1 }
export const ST = { type: BoardSpaceType.FirstXThenY, first: 6, then: 3 }
export const ZT = { type: BoardSpaceType.FirstXThenY, first: 0, then: 2 }
export const FT = { type: BoardSpaceType.FirstXThenY, first: 4, then: 2 }
export const BoardBDescription: BoardDescription = {
  board: [
    [ _,  _, ST, _,  _],
    [ _,  _,  N, _, FT],
    [ _, TO,  N, _,  N],
    [OZ,  N,  N, _,  N],
    [ N,  N,  N, ZT, N]
  ]
}