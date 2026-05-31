import { MaterialMove } from '@gamepark/rules-api'
import { uniqBy } from 'es-toolkit'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BoardHelper } from '../../helper/BoardHelper'
import { RuleId } from '../../RuleId'
import { BaseBoardEffect } from './BaseBoardEffect'

export class BoardEffectReplayIfAllDifferentRule extends BaseBoardEffect {
  onRuleStart() {
    if (new BoardHelper(this.game).isBoardFull(this.player)) return [this.goNext()]
    const characters = this.effectColumnTiles
    const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
    if (countDifferent !== characters.length) return [this.goNext()]

    const moves: MaterialMove[] = []
    moves.push(this.startRule(RuleId.DrawCharacterTile))
    return moves
  }

  get effectColumnTiles() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }
}
