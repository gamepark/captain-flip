import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CharacterEffect } from './effect/CharacterEffect'
import { getCharacter } from './GetCharacter'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    const hand = this.hand
    const moves: MaterialMove[] = []
    const availablePlaces = new BoardHelper(this.game, this.player).freePlaces
    for (const [x, y] of Object.entries(availablePlaces)) {
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
      this.addPlacedCard(move.itemIndex)
      const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
      const character = getCharacter(item)
      const ruleId = CharacterEffect[character]
      if (ruleId) return [this.startRule(ruleId)]

      return [this.startRule(RuleId.BoardEffect)]

    }

    return []
  }

  addPlacedCard(index: number) {
    const places = this.remind<number[]>(Memory.PlacedCard) ?? []
    places.push(index)
    this.memorize(Memory.PlacedCard, places)
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