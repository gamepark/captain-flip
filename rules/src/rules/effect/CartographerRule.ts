import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { TreasureMapPickHelper } from '../helper/TreasureMapPickHelper'
import { RuleId } from '../RuleId'

export class CartographerRule extends PlayerTurnRule {
  onRuleStart() {
    return new TreasureMapPickHelper(this.game, this.player)
      .onRuleStartWithNext(this.startRule(RuleId.BoardEffect))
  }

  getPlayerMoves() {
    return new TreasureMapPickHelper(this.game, this.player).getPickMoves()
  }

  afterItemMove(move: ItemMove) {
    if (TreasureMapPickHelper.isPickMove(move)) {
      return [this.startRule(RuleId.BoardEffect)]
    }
    return []
  }
}
