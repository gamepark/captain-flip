import { ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlaceTileHelper } from '../../helper/PlaceTileHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

export class BoardEffectPlayFromCellRule extends BaseBoardEffect {
  onRuleStart() {
    if (this.cellTiles.length === 0) return [this.goNext()]
    return []
  }

  getPlayerMoves() {
    const helper = new PlaceTileHelper(this.game, this.player)
    return helper.getPlacementMoves(this.cellTiles)
  }

  afterItemMove(move: ItemMove) {
    const helper = new PlaceTileHelper(this.game, this.player)
    const { moves, nextRule } = helper.onTilePlaced(move)
    if (nextRule) {
      moves.push(this.startRule(nextRule))
    }
    return moves
  }

  get cellTiles() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.Cell)
      .player(this.player)
  }
}
