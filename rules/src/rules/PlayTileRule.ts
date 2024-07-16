import { isMoveItemType, ItemMove, Location, MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../material/board/description/BoardCommon'
import { BoardSpaceType } from '../material/board/description/BoardSpaceType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CharacterEffect } from './effect/CharacterEffect'
import { CoinRule } from './effect/CoinRule'
import { getCharacter } from './GetCharacter'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayTileRule extends CoinRule {
  getPlayerMoves() {
    const hand = this.hand
    const moves: MaterialMove[] = []
    const availablePlaces = new BoardHelper(this.game).getFreePlaces(this.player)
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
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile) {
      this.addPlacedCard(move.itemIndex)
      const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
      const character = getCharacter(item)
      const effect = new BoardHelper(this.game).getPlaceEffect({ x: move.location.x, y: move.location.y })
      if (effect?.type === BoardSpaceType.Cost) {
        moves.push(...this.getCoinsMoves(-effect.cost ?? 0))
      } else if (effect?.type !== BoardSpaceType.None) {
        this.addBoardEffect(effect!, move.location)
      }

      const ruleId = CharacterEffect[character]
      if (ruleId) {
        moves.push(this.startRule(ruleId))
      } else {
        moves.push(this.startRule(RuleId.BoardEffect))
      }

    }

    return moves
  }

  addBoardEffect(effect: BoardSpaceEffect, location: Partial<Location>) {
    const effects = this.remind(Memory.BoardEffect) ?? []
    effects.push({
      effect: effect,
      x: location.x!,
      y: location.y!,
    })

    this.memorize(Memory.BoardEffect, effects)
  }

  addPlacedCard(index: number) {
    this.memorize(Memory.PlacedCard, index)
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