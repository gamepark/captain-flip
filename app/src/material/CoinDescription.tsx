/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import Coin1 from '../images/coins/Coin1.png'
import Coin10 from '../images/coins/Coin10.png'
import Coin3 from '../images/coins/Coin3.png'
import Coin5 from '../images/coins/Coin5.png'

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
    { id: Coin.Coin10, quantity: 10, location: coin10StockLocation },
    { id: Coin.Coin5, quantity: 10, location: coin5StockLocation },
    { id: Coin.Coin3, quantity: 10, location: coin3StockLocation },
    { id: Coin.Coin1, quantity: 10, location: coin1StockLocation },
  ]

  getStockLocation(item: MaterialItem) {
    switch(item.id) {
      case Coin.Coin1:
        return coin1StockLocation;
      case Coin.Coin3:
        return coin3StockLocation;
      case Coin.Coin5:
        return coin5StockLocation;
      default:
      case Coin.Coin10:
        return coin10StockLocation;
    }
  }
}

export const coin1StockLocation = { type: LocationType.CoinStock, id: Coin.Coin1 }
export const coin3StockLocation = { type: LocationType.CoinStock, id: Coin.Coin3 }
export const coin5StockLocation = { type: LocationType.CoinStock, id: Coin.Coin5 }
export const coin10StockLocation = { type: LocationType.CoinStock, id: Coin.Coin10 }

export const coinDescription = new CoinDescription()