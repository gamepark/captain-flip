import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { BoardADescription } from '../../material/board/description/BoardADescription'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'

export class PlacesHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get freePlaces() {
    const boardDescription = this.boardDescription
    const tiles = this.boardTile
    const availablePlaces: Record<number, number> = {}
    for (const place of boardDescription.places) {
      if (place.x in availablePlaces && place.y > availablePlaces[place.x]) continue
      const occupiedPlace = tiles.filter((item) => item.location.x === place.x && item.location.y === place.y).length > 0
      if (!occupiedPlace) availablePlaces[place.x] = place.y
    }
    return availablePlaces
  }

  get hasTriggeredEndOfGame() {
    const description = this.boardDescription
    let count = 0
    for (let x = 0; x < description.columnCount; x++) {
      if (this.isColumnFull(x)) count++
    }

    return count >= 4
  }

  isColumnFull(column: number) {
    const boardDescription = this.boardDescription
    const columnPlaces = boardDescription.places.filter((p) => p.x === column)
    const maxY = maxBy(columnPlaces, (place) => place.y)!.y
    const minY = minBy(columnPlaces, (place) => place.y)!.y
    const maxTileCount = (maxY - minY) + 1
    const tiles = this.boardTile.filter((item) => item.location.x === column)
    return tiles.length === maxTileCount
  }

  get boardDescription() {
    return BoardADescription
  }

  get boardTile() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
  }
}