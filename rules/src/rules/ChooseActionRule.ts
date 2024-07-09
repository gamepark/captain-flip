import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    const hand = this.hand
    const moves: MaterialMove[] = []
    moves.push(this.rules().startRule(RuleId.PlaceTile))
    moves.push(hand.rotateItem(true))
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.CharacterTile)(move)) {
      return [
        this.rules().startRule(RuleId.PlaceTile)
      ]
    }

    return []
  }

  get hand() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.PlayerHand)
  }
}