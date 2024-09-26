import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { coinValues } from '../../material/Coin'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export abstract class CoinRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const coins = this.getCoins() ?? 0
    if (coins > 0) return this.gainCoinsMoves(coins)
    if (coins < 0) return this.loseCoinsMoves(-coins)
    return []
  }

  getCoins(): number | undefined {
    return 0
  }

  gainCoinsMoves(amount: number) {
    return this.material(MaterialType.Coin).money(coinValues).addMoney(amount, { type: LocationType.PlayerCoin, player: this.player })
  }

  loseCoinsMoves(amount: number) {
    return this.material(MaterialType.Coin).money(coinValues).removeMoney(amount, { type: LocationType.PlayerCoin, player: this.player })
  }
}