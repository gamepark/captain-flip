import { MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { BoardHelper } from '../../helper/BoardHelper'
import { RuleId } from '../../RuleId'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectReplay = { type: BoardSpaceType, isAllSame?: boolean }

export class BoardEffectReplayRule extends BaseBoardEffect<BoardEffectReplay> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    if (this.isBoardFull) return [this.goNext()]
    if (this.effect.effect.isAllSame) {
      const characters = this.effectColumnTiles
      const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
      if (countDifferent > 1) return [this.goNext()]
    }

    moves.push(this.startRule(RuleId.DrawCharacterTile))
    return moves
  }

  get isBoardFull() {
    const helper = new BoardHelper(this.game)
    let fullColumn = 0
    for (let x = 0; x < helper.columnCount; x++) {
      if (helper.isColumnFull(this.player, x)) fullColumn++
    }

    return fullColumn === helper.columnCount
  }

  get effectColumnTiles() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }
}