// NO SPACE
import { BoardSpaceType } from './BoardSpaceType'

export const _ = undefined
export const N = { type: BoardSpaceType.None }

export type BoardSpaceEffect = { type: BoardSpaceType, endOfGame?: boolean } & Record<any, any>
export type BoardDescription = {
  board: (BoardSpaceEffect | undefined)[][]
}

export type BoardSpaceEffectWithCoordinates = BoardSpaceEffect & { x: number, y: number }