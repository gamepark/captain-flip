/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import TreasureMapToken from '../images/TreasureMapToken.png'
import { TreasureMapTokenHelp } from './help/TreasureMapTokenHelp'

export class TreasureMapTokenDescription extends TokenDescription {
  height = 5
  //width = 5.81
  ratio = 5.81 / 7
  borderRadius = 0.5
  
  image = TreasureMapToken
  help = TreasureMapTokenHelp
}

export const treasureMapTokenDescription = new TreasureMapTokenDescription()