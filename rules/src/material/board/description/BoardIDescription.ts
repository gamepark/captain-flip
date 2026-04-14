import { _, BoardDescription, N } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

const C3 = { type: BoardSpaceType.CoinsX, value: 3 }
const CB = { type: BoardSpaceType.CoinPerBomb, value: 2 }
const BM = { type: BoardSpaceType.Bomb }
const T = { type: BoardSpaceType.TreasureMap }
const TB = { type: BoardSpaceType.TreasureMap, bombWhenFilled: true }
const SL = { type: BoardSpaceType.StealLeft }
const SR = { type: BoardSpaceType.StealRight }
const NS = { type: BoardSpaceType.None, sextant: true }

export const BoardIDescription: BoardDescription = {
  board: [
    [ _,  _, C3,  _,  _],
    [ _,  T, BM, CB,  _],
    [ _, SL, SR,  N, TB],
    [ N,  N,  N,  N,  _],
    [ NS, _,  NS, N,  _]
  ]
}
