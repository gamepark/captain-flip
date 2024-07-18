import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DrawCharacterTileRule extends PlayerTurnRule {
  onRuleStart() {
    const tiles = this.clothBagTiles
    const moves: MaterialMove[] = []
    moves.push(
      tiles.moveItem((item) => ({
        type: LocationType.PlayerHand,
        rotation: item.location.rotation,
        player: this.player
      }))
    )

    moves.push(
      this.startRule(RuleId.PlayTile)
    )

    return moves;
  }

  get clothBagTiles() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.ClothBag)
      .sort((item) => -item.location.x!)
  }

  getPlayerMoves() {
    return []
  }
}