import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEndOfGameEffect } from './BaseBoardEndOfGameEffect'

export type BoardEndOfGameCoinIfSame = { type: BoardSpaceType, value: number }

export class BoardEndOfGameCoinIfSameRule extends BaseBoardEndOfGameEffect<BoardEndOfGameCoinIfSame> {

  getCoins() {
    const columnSize = this.columnSize
    const effect = this.effect.effect
    const characters = this.playerCharacters
    const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
    if (characters.length === columnSize && countDifferent === 1) {
      return effect.value
    }

    return 0
  }

  get columnSize() {
    return this.effect.y + 1
  }

  get playerCharacters() {
    const effect = this.effect
    return this
      .material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }


}