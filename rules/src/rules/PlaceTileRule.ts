import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BoardADescription } from '../material/board/description/BoardADescription'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PlaceTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    const hand = this.hand
    const moves: MaterialMove[] = []
    for (const [x, y] of this.availablePlaces.entries()) {
      moves.push(
        hand.moveItem({
          type: LocationType.AdventureBoardCharacterTile,
          player: this.player,
          x: x,
          y: y
        })
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile) {
      return [
        // TODO: GO to tile effect
        this.rules().startPlayerTurn(RuleId.DrawCharacterTile, this.nextPlayer)
      ]
    }

    return []
  }

  get availablePlaces() {
    const boardDescription = this.boardDescription
    const tiles = this.boardTile
    const availablePlaces: number[] = []
    for (const place of boardDescription.places) {
      if (availablePlaces[place.x] !== undefined) continue
      const occupiedPlace = tiles.filter((item) => item.location.x === place.x && item.location.y === place.y).length > 0
      if (!occupiedPlace) availablePlaces[place.x] = place.y
    }

    return availablePlaces
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


  get hand() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.PlayerHand)
  }
}