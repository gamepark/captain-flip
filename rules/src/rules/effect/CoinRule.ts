import { isCreateItem, isDeleteItem, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import sum from 'lodash/sum'
import times from 'lodash/times'
import { Coin } from '../../material/Coin'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class CoinRule extends PlayerTurnRule {
  onRuleStart() {
    const coins = this.getCoins() ?? 0
    if (coins !== 0) return this.getCoinsMoves(coins)
    return []
  }

  getCoins(): number | undefined {
    return 0
  }

  getCoinsMoves(coins: number) {
    const allCoins = this.allCoins
    const coins10 = allCoins.filter((coin) => coin.id === Coin.Coin10)
    const coins5 = allCoins.filter((coin) => coin.id === Coin.Coin5)
    const coins3 = allCoins.filter((coin) => coin.id === Coin.Coin3)
    const coins1 = allCoins.filter((coin) => coin.id === Coin.Coin1)

    const moves: MaterialMove[] = []
    const total = this.totalCoins
    const bestCombinationFor = this.getBestCombinationFor(total + coins)
    const deltaCoin10 = bestCombinationFor[Coin.Coin10] - coins10.length
    moves.push(...this.moveCoins(coins10, Coin.Coin10, deltaCoin10))

    const deltaCoin5 = bestCombinationFor[Coin.Coin5] - coins5.length
    moves.push(...this.moveCoins(coins5, Coin.Coin5, deltaCoin5))

    const deltaCoin3 = bestCombinationFor[Coin.Coin3] - coins3.length
    moves.push(...this.moveCoins(coins3, Coin.Coin3, deltaCoin3))

    const deltaCoin1 = bestCombinationFor[Coin.Coin1] - coins1.length
    moves.push(...this.moveCoins(coins1, Coin.Coin1, deltaCoin1))

    if (coins < 0) {
      return orderBy(moves, (move) => isCreateItem(move)? 1: 0)
    }

    return orderBy(moves, (move) => isDeleteItem(move)? 1: 0)
  }

  moveCoins(coins: Material, coin: Coin, count: number): MaterialMove[] {
    if (count < 0) {
      return coins.limit(Math.abs(count)).deleteItems()
    }

    if (count > 0) {
      return coins
        .createItems(
        times(count).map(_ => ({
          id: coin,
          location: {
            type: LocationType.PlayerCoin,
            player: this.player
          }
        }))
      )
    }

    return []
  }

  get totalCoins() {
    return sum(
      this.allCoins.getItems().map((item) => item.id)
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