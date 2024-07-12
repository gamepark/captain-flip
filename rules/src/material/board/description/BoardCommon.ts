// NO SPACE
import { BoardSpaceType } from './BoardSpaceType'

export const _ = undefined
export const N = { type: BoardSpaceType.None }

export type BoardSpaceEffect = { type: BoardSpaceType } & Record<any, any>
export type BoardDescription = {
  board: (BoardSpaceEffect | undefined)[][]
}