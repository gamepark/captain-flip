import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class CartographerRule extends PlayerTurnRule {
  onRuleStart() {
    const token = this.treasureMapToken
    const moves: MaterialMove[] = []
    if (token.getItem()?.location.player !== this.player) {
      moves.push(
        this.material(MaterialType.TreasureMapToken).moveItem({
          type: LocationType.PlayerTreasureMapToken,
          player: this.player
        })
      )
    }

    moves.push(this.startRule(RuleId.EndOfTurn))
    return moves
  }

  get treasureMapToken() {
    return this.material(MaterialType.TreasureMapToken)
  }
}