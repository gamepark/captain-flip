import { uniqBy } from 'es-toolkit'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectEndOfGameRowSame = { type: BoardSpaceType, value: number, row: number }

export class BoardEffectEndOfGameRowSameRule extends BaseBoardEffect<BoardEffectEndOfGameRowSame> {
  getCoins() {
    const effect = this.effect.effect
    const row = effect.row
    const rowTiles = this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) => item.location.y === row)
      .getItems()
    if (rowTiles.length === 0) return 0
    const countDifferent = uniqBy(rowTiles, (item) => getCharacter(item))?.length ?? 0
    if (countDifferent === 1) return effect.value
    return 0
  }
}
