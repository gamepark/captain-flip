import { getEnumValues } from '@gamepark/rules-api'


export enum BoardType {
  BoardA = 1,
  BoardB,
  BoardC,
  BoardD,
  BoardE,
  BoardF,
  BoardG,
  BoardH,
  BoardI
}

export const boardTypes = getEnumValues(BoardType)