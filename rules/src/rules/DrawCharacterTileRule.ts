import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import sample from 'lodash/sample'
import { RuleId } from './RuleId'

export class DrawCharacterTileRule extends PlayerTurnRule {
  onRuleStart() {
    const tiles = this.clothBagTiles
    const indexes = tiles.getIndexes()
    const draw = sample(indexes)!
    const tile = tiles.index(draw)

    const moves: MaterialMove[] = []
    moves.push(
      tile.moveItem({
        type: LocationType.PlayerHand,
        player: this.player
      })
    )

    moves.push(
      this.rules().startRule(RuleId.PlaceTile)
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