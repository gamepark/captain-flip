import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

const CT = { type: BoardSpaceType.CoinAndTreasureMap, value: 3 }
const FF = { type: BoardSpaceType.FirstFlipThenY, then: 2 }
const T = { type: BoardSpaceType.TreasureMap }
const PT = { type: BoardSpaceType.PassTreasureMap }
const C3 = { type: BoardSpaceType.CoinsX, value: 3 }
const NS = { type: BoardSpaceType.None, sextant: true }

export const BoardHDescription: BoardDescription = {
  board: [
    [ _, CT,  _,  _,  _],
    [ _,  N,  _, FF,  _],
    [ T,  N, PT,  N, C3],
    [ N,  N, NS,  N,  N],
    [ N,  _,  _,  _,  N]
  ],
  rowEffects: [
    { type: BoardSpaceType.CoinPerTreasureMap, value: 2, row: 1 }
  ]
}
