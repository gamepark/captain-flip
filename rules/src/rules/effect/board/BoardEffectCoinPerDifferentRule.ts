import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerDifferent = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerDifferentRule extends BaseBoardEffect<BoardEffectCoinPerDifferent> {
  getCoins() {
    const effect = this.effect.effect
    const characters = this.character
    const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
    return countDifferent * effect.value
  }

  get character() {
    const effect = this.effect
    return this
      .material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }
}