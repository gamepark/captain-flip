import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { Memory } from '../../Memory'
import { CharacterEffect } from '../CharacterEffect'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoasEffectFlip = { type: BoardSpaceType, isAllDifferent?: boolean }
export class BoasEffectFlipRule extends BaseBoardEffect<BoasEffectFlip> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    if (this.effect.effect.isAllDifferent) {
      const characters = this.effectColumnTiles
      const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
      if (countDifferent !== this.columnSize) return [this.goNext()]

    }
    return moves
  }

  getPlayerMoves() {
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
    const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
    this.addPlacedCard(move.itemIndex)
    const character = getCharacter(item)
    const ruleId = CharacterEffect[character]
    if (ruleId) return [this.startRule(ruleId)]
    return [this.goNext()]
  }

  addPlacedCard(index: number) {
    this.memorize(Memory.PlacedCard, index)
  }

  get columnSize() {
    return this.effect.y + 1
  }

  get effectColumnTiles() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }
}