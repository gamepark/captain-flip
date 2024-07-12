import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class GunnerRule extends PlayerTurnRule {
  onRuleStart() {
    return [
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: 5
      }),
      this.startRule(RuleId.BoardEffect)
    ]
  }
}