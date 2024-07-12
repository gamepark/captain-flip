import { MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectTreasureMap = { type: BoardSpaceType, isAllSame?: boolean }
export class BoardEffectTreasureMapRule extends BaseBoardEffect<BoardEffectTreasureMap> {
  onRuleStart() {
    const token = this.treasureMapToken
    const moves: MaterialMove[] = []
    if (token.getItem()?.location.player !== this.player) {

      if (this.effect.effect.isAllSame) {
        const characters = this.effectColumnTiles
        const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
        if (countDifferent > 1) return [this.goNext()]
      }

      moves.push(
        this.material(MaterialType.TreasureMapToken).moveItem({
          type: LocationType.PlayerTreasureMapToken,
          player: this.player
        })
      )
    }

    moves.push(this.goNext())
    return moves
  }

  get effectColumnTiles() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }

  get treasureMapToken() {
    return this.material(MaterialType.TreasureMapToken)
  }
}