import { Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { Coin } from '../../material/Coin'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class CoinRule extends PlayerTurnRule {
  onRuleStart() {
    const coins = this.getCoins() ?? 0
    if (coins > 0) return this.gainCoinsMoves(coins)
    if (coins < 0) return this.loseCoinsMoves(coins)
    return []
  }

  getCoins(): number | undefined {
    return 0
  }

  gainCoinsMoves(coins: number) {
    const allCoins = this.allCoins
    const coins10 = allCoins.filter((coin) => coin.id === Coin.Coin10)
    const coins5 = allCoins.filter((coin) => coin.id === Coin.Coin5)
    const coins3 = allCoins.filter((coin) => coin.id === Coin.Coin3)
    const coins1 = allCoins.filter((coin) => coin.id === Coin.Coin1)

    const moves: MaterialMove[] = []
    const bestCombinationFor = this.getBestCombinationFor(coins)
    moves.push(...this.moveCoins(coins10, Coin.Coin10, bestCombinationFor[Coin.Coin10]))
    moves.push(...this.moveCoins(coins5, Coin.Coin5, bestCombinationFor[Coin.Coin5]))
    moves.push(...this.moveCoins(coins3, Coin.Coin3, bestCombinationFor[Coin.Coin3]))
    moves.push(...this.moveCoins(coins1, Coin.Coin1, bestCombinationFor[Coin.Coin1]))
    return moves
  }

  loseCoinsMoves(_coins: number) {
    return []
  }

  getCoinValue(coin: Material) {
    const item = coin.getItem()
    if (!item) return 0
    return item.quantity ?? 1
  }

  moveCoins(coins: Material, coin: Coin, count: number): MaterialMove[] {
    if (count < 0) {
      return [coins.deleteItem(Math.abs(count))]
    }

    if (count > 0) {
      return [coins.createItem({
        id: coin,
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: count
      })]
    }

    return []
  }

  get totalCoins() {
    return sum(
      this.allCoins.getItems().map((item) => (item.quantity ?? 1) * item.id)
    )
  }

  getBestCombinationFor(coins: number) {
    let total = coins
    const numberOfPieces: Record<Coin, number> = {
      [Coin.Coin1]: 0,
      [Coin.Coin3]: 0,
      [Coin.Coin5]: 0,
      [Coin.Coin10]: 0,
    }

    numberOfPieces[Coin.Coin10] = Math.floor(total / 10)
    total %= 10

    numberOfPieces[Coin.Coin5] = Math.floor(total / 5)
    total %= 5

    numberOfPieces[Coin.Coin3] = Math.floor(total / 3)
    numberOfPieces[Coin.Coin1] = total % 3

    return numberOfPieces
  }

  get allCoins() {
    return this.material(MaterialType.Coin)
      .player(this.player)
  }
}