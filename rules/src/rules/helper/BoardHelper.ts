import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import { BoardType } from '../../material/board/Board'
import { BoardADescription } from '../../material/board/description/BoardADescription'
import { BoardBDescription } from '../../material/board/description/BoardBDescription'
import { BoardSpaceEffect } from '../../material/board/description/BoardCommon'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { Memory } from '../Memory'

export class BoardHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get freePlaces() {
    const tiles = this.boardTile
    const availablePlaces: Record<number, number> = {}
    for (const place of this.places) {
      if (place.x in availablePlaces && place.y > availablePlaces[place.x]) continue
      const occupiedPlace = tiles.filter((item) => item.location.x === place.x && item.location.y === place.y).length > 0
      if (!occupiedPlace) availablePlaces[place.x] = place.y
    }
    return availablePlaces
  }

  get places() {
    const board = this.boardDescription.board
    const places: {x: number, y: number}[] = []
    for (let y = (board.length - 1); y >= 0; y--) {
      const line = board[y]
      for (let x = 0; x < line.length; x++) {
        if (line[x] === undefined) continue
        places.push({x, y: (board.length - 1) - y})
      }
    }

    return places
  }

  get hasTriggeredEndOfGame() {
    let count = 0

    for (let x = 0; x < 5; x++) {
      if (this.isColumnFull(x)) count++
    }

    return count >= 4
  }

  isColumnFull(column: number) {
    const columnPlaces = this.places.filter((p) => p.x === column)
    const maxY = maxBy(columnPlaces, (place) => place.y)!.y
    const minY = minBy(columnPlaces, (place) => place.y)!.y
    const maxTileCount = (maxY - minY) + 1
    const tiles = this.boardTile.filter((item) => item.location.x === column)
    return tiles.length === maxTileCount
  }

  get boardDescription() {
    const board = this.remind(Memory.Board)

    switch (board) {
      case BoardType.BoardB:
        return BoardBDescription
      case BoardType.BoardA:
      default:
        return BoardADescription
    }
  }

  getPlaceEffect(location: Location): BoardSpaceEffect | undefined {
    return this.boardDescription.board[4 - location.y!]?.[location.x!]
  }

  get boardTile() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
  }
}