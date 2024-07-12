import { isEnumValue } from '@gamepark/rules-api'


export enum BoardType {
  BoardA = 1,
  BoardB,
  BoardC,
  BoardD,
}

export const boardTypes = Object.values(BoardType).filter(isEnumValue)