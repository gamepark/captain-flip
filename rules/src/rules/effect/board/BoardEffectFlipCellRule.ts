import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

export class BoardEffectFlipCellRule extends BaseBoardEffect {
  onRuleStart() {
    if (this.cellTiles.length === 0) return [this.goNext()]
    return []
  }

  getPlayerMoves() {
    return this.cellTiles.moveItems((item) => ({
      ...item.location,
      rotation: !item.location.rotation
    }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterTile)(move) || move.location.type !== LocationType.Cell) return []
    return [this.goNext()]
  }

  get cellTiles() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.Cell)
      .player(this.player)
  }
}
