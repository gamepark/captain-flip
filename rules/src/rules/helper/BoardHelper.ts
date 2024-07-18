import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import sum from 'lodash/sum'
import { BoardType } from '../../material/board/Board'
import { BoardADescription } from '../../material/board/description/BoardADescription'
import { BoardBDescription } from '../../material/board/description/BoardBDescription'
import { BoardCDescription } from '../../material/board/description/BoardCDescription'
import { BoardSpaceEffect } from '../../material/board/description/BoardCommon'
import { BoardDDescription } from '../../material/board/description/BoardDDescription'
import { BoardEDescription } from '../../material/board/description/BoardEDescription'
import { BoardSpaceType } from '../../material/board/description/BoardSpaceType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class BoardHelper extends MaterialRulesPart {
  constructor(game: MaterialGame) {
    super(game)
  }

  getFreePlaces(playerId: PlayerId) {
    const tiles = this.getBoardTiles(playerId)
    const availablePlaces: Record<number, number> = {}
    for (const place of this.places) {
      if (place.x in availablePlaces && place.y > availablePlaces[place.x]) continue
      const occupiedPlace = tiles.filter((item) => item.location.x === place.x && item.location.y === place.y).length > 0
      if (!occupiedPlace) {
        const effect = this.getPlaceEffect({ x: place.x, y: place.y })
        if (effect?.type !== BoardSpaceType.Cost || this.getPlayerCoin(playerId) >= (effect.cost ?? 0)) {
           availablePlaces[place.x] = place.y
        }
      }
    }
    return availablePlaces
  }

  getPlayerCoin(playerId: PlayerId) {
    return sum(
      this
      .material(MaterialType.Coin)
      .player(playerId)
      .getItems().map((item) => (item.quantity ?? 1) * item.id)
    )

  }

  get places() {
    const board = this.boardDescription.board
    const places: {x: number, y: number, effect?: BoardSpaceEffect }[] = []
    for (let y = (board.length - 1); y >= 0; y--) {
      const line = board[y]
      for (let x = 0; x < line.length; x++) {
        if (line[x] === undefined) continue
        places.push({x, y: (board.length - 1) - y, effect: line[x]})
      }
    }

    return places
  }

  hasTriggeredEndOfGame(playerId: PlayerId) {
    let count = 0

    for (let x = 0; x < this.columnCount; x++) {
      if (this.isColumnFull(playerId, x)) count++
    }

    return count >= 4
  }

  get columnCount() {
    return maxBy(this.places, (place) => place.x)!.x + 1
  }

  isColumnFull(playerId: PlayerId, column: number) {
    const columnPlaces = this.places.filter((p) => p.x === column)
    const maxY = maxBy(columnPlaces, (place) => place.y)!.y
    const minY = minBy(columnPlaces, (place) => place.y)!.y
    const maxTileCount = (maxY - minY) + 1
    const tiles = this.getBoardTiles(playerId).filter((item) => item.location.x === column)
    return tiles.length === maxTileCount
  }

  get boardDescription() {
    const board = this.remind(Memory.Board)

    switch (board) {
      case BoardType.BoardB:
        return BoardBDescription
      case BoardType.BoardC:
        return BoardCDescription
      case BoardType.BoardD:
        return BoardDDescription
      case BoardType.BoardE:
        return BoardEDescription
      case BoardType.BoardA:
      default:
        return BoardADescription
    }
  }

  getPlaceEffect(location: Partial<Location>): BoardSpaceEffect | undefined {
    const effect = this.boardDescription.board[4 - location.y!]?.[location.x!]
      if (effect?.endOfGame) return
    return effect
  }

  endOfGameEffects() {
    return this.places.filter((p) => p.effect && p.effect.endOfGame)
  }

  getBoardTiles(playerId: PlayerId) {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
  }

  getEffectRule(effect: BoardSpaceEffect) {
    switch (effect.type) {
      case BoardSpaceType.CoinsX:
        return RuleId.BoardEffectCoinX
      case BoardSpaceType.TreasureMap:
        return RuleId.BoardEffectTreasureMap
      case BoardSpaceType.FirstXThenY:
        return RuleId.BoardEffectFirstXThenY
      case BoardSpaceType.CoinIfAllDifferent:
        return RuleId.BoardEndOfGameCoinIfAllDifferent
      case BoardSpaceType.CoinIfSame:
        return RuleId.BoardEndOfGameCoinIfSame
      case BoardSpaceType.CoinPerDifferent:
        return RuleId.BoardEffectCoinPerDifferent
      case BoardSpaceType.CoinPerFullColumn:
        return RuleId.BoardEffectCoinPerFullColumn
      case BoardSpaceType.Flip:
        return RuleId.BoardEffectFlip
      case BoardSpaceType.Replay:
        return RuleId.BoardEffectReplay
      default:
        return
    }
  }
}