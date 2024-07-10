import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BoardADescription } from '../material/board/description/BoardADescription'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    const hand = this.hand
    const moves: MaterialMove[] = []

    for (const [x, y] of Object.entries(this.availablePlaces)) {
      moves.push(
        hand.moveItem((item) => ({
          type: LocationType.AdventureBoardCharacterTile,
          player: this.player,
          rotation: item.location.rotation,
          x: +x,
          y: y
        }))
      )
    }

    if (!this.hasFlipped) {
      moves.push(hand.rotateItem((item) => !item.location.rotation))
    }

    return moves
  }

  get hasFlipped() {
    return this.remind(Memory.Flipped)
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type !== LocationType.AdventureBoardCharacterTile) {

      const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
      if (item.location.rotation !== move.location.rotation) this.memorize(Memory.Flipped, true)
    }

    return []
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
    const availablePlaces: Record<number, number> = {}
    for (const place of boardDescription.places) {
      if (place.x in availablePlaces) continue
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

  onRuleEnd() {
    this.forget(Memory.Flipped)
    return []
  }
}