import { uniqBy } from 'es-toolkit'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { Memory } from '../../Memory'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerDifferentAdjacent = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerDifferentAdjacentRule extends BaseBoardEffect<BoardEffectCoinPerDifferentAdjacent> {
  getCoins() {
    const adjacentTiles = this.adjacentTiles
    const countDifferent = uniqBy(adjacentTiles, (item) => getCharacter(item))?.length ?? 0
    return countDifferent * this.effect.effect.value
  }

  get adjacentTiles() {
    const effect = this.effect
    const placed = this.material(MaterialType.CharacterTile).getItem(this.remind(Memory.PlacedCard))
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile)
      .filter((item) => {
        if (item.location.x === placed.location.x && item.location.y === placed.location.y) return false
        const dx = Math.abs(item.location.x! - effect.x)
        const dy = Math.abs(item.location.y! - effect.y)
        return dx <= 1 && dy <= 1 && (dx + dy > 0)
      })
      .getItems()
  }
}
