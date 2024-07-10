/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import Coin from '../images/Coin.png'
import { coinStockLocation } from '../locators/descriptions/CoinPileDescription'

export class CoinDescription extends TokenDescription {
  height = 2.79
  width = 2.79
  borderRadius = 5
  image = Coin


  staticItem = { quantity: 20, location: coinStockLocation }
  stockLocation = coinStockLocation

}

export const coinDescription = new CoinDescription()