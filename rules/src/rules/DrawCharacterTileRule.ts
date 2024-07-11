import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DrawCharacterTileRule extends PlayerTurnRule {
  onRuleStart() {
    this.forget(Memory.PlacedCard)
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
      this.startRule(RuleId.PlaceTile)
    )

    return moves;
  }

  get clothBagTiles() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.ClothBag)
  }

  getPlayerMoves() {
    return []
  }
}