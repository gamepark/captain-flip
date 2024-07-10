/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import TreasureMapToken from '../images/TreasureMapToken.png'

export class TreasureMapTokenDescription extends TokenDescription {
  height = 3
  width = 2.49
  borderRadius = 5

  image = TreasureMapToken
}

export const treasureMapTokenDescription = new TreasureMapTokenDescription()