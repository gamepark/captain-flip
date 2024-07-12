import { MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerDifferent = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerDifferentRule extends BaseBoardEffect<BoardEffectCoinPerDifferent> {

  onRuleStart() {
    const effect = this.effect.effect
    const moves: MaterialMove[] = []
    const characters = this.character
    const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
    moves.push(
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: countDifferent * effect.value
      })
    )

    moves.push(this.goNext())
    return moves
  }

  get columnSize() {
    return this.effect.y + 1
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