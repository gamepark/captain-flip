import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BoardHelper } from '../../helper/BoardHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectFirstXThenYRow = { type: BoardSpaceType, first: number, then: number, row: number }

export class BoardEffectFirstXThenYRowRule extends BaseBoardEffect<BoardEffectFirstXThenYRow> {
  getCoins() {
    const effect = this.effect.effect
    const triggerCount = this.countPlayersThatCompletedRow()
    return triggerCount === 1 ? effect.first : effect.then
  }

  countPlayersThatCompletedRow() {
    const row = this.effect.effect.row
    let count = 0
    for (const player of this.game.players) {
      if (this.isRowFull(player, row)) count++
    }
    return count
  }

  isRowFull(player: number, row: number) {
    const helper = new BoardHelper(this.game)
    const rowPlaces = helper.places.filter((p) => p.y === row)
    const rowTiles = this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(player)
      .filter((item) => item.location.y === row)
      .length
    return rowTiles >= rowPlaces.length
  }
}
