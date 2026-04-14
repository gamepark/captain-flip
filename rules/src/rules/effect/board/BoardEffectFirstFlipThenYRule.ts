import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { Memory } from '../../Memory'
import { CharacterEffect } from '../CharacterEffect'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectFirstFlipThenY = { type: BoardSpaceType, then: number }

export class BoardEffectFirstFlipThenYRule extends BaseBoardEffect<BoardEffectFirstFlipThenY> {
  onRuleStart() {
    if (!this.isFirst) {
      return super.onRuleStart()
    }
    return []
  }

  getCoins() {
    if (this.isFirst) return 0
    return this.effect.effect.then
  }

  getPlayerMoves() {
    if (!this.isFirst) return []
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .moveItems((item) => ({
        ...item.location,
        rotation: !item.location.rotation
      }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterTile)(move) || move.location.type !== LocationType.AdventureBoardCharacterTile) return []
    const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    this.memorize(Memory.PlacedCard, move.itemIndex)
    const character = getCharacter(item)
    const ruleId = CharacterEffect[character]
    if (ruleId) return [this.startRule(ruleId)]
    return [this.goNext()]
  }

  get isFirst() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .filter((item) => effect.x === item.location.x && effect.y === item.location.y)
      .length === 1
  }
}
