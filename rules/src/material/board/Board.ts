import { getEnumValues } from '@gamepark/rules-api'


export enum BoardType {
  BoardA = 1,
  BoardB,
  BoardC,
  BoardD,
  BoardE
}

export const boardTypes = getEnumValues(BoardType)