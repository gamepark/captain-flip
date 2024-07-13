/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { TokenDescription } from '@gamepark/react-game'
import Coin1 from '../images/coins/Coin1.png'
import Coin3 from '../images/coins/Coin3.png'
import Coin5 from '../images/coins/Coin5.png'
import Coin10 from '../images/coins/Coin10.png'
import { coinStockLocation } from '../locators/descriptions/CoinPileDescription'

export class CoinDescription extends TokenDescription {
  height = 2.79
  width = 2.79
  borderRadius = 2
  images = {
    [Coin.Coin1]: Coin1,
    [Coin.Coin3]: Coin3,
    [Coin.Coin5]: Coin5,
    [Coin.Coin10]: Coin10,
  }


  staticItems = [
    { id: Coin.Coin10, quantity: 10, location: coinStockLocation },
    { id: Coin.Coin1, quantity: 10, location: coinStockLocation },
    { id: Coin.Coin5, quantity: 10, location: coinStockLocation },
    { id: Coin.Coin3, quantity: 10, location: coinStockLocation },
  ]

  stockLocation = coinStockLocation

}

export const coinDescription = new CoinDescription()