import { ItemMove, MaterialMove } from '@gamepark/rules-api'
import { uniqBy } from 'es-toolkit'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { getCharacter } from '../../GetCharacter'
import { TreasureMapPickHelper } from '../../helper/TreasureMapPickHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectTreasureMap = { type: BoardSpaceType, isAllSame?: boolean }
export class BoardEffectTreasureMapRule extends BaseBoardEffect<BoardEffectTreasureMap> {
  onRuleStart() {
    // The isAllSame variant (Board C): the player only gets a map
    // if every character in the effect's column is identical.
    if (this.effect.effect.isAllSame) {
      const characters = this.effectColumnTiles
      const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
      if (countDifferent > 1) return [this.goNext()]
    }
    return new TreasureMapPickHelper(this.game, this.player).onRuleStartWithNext(this.goNext())
  }

  getPlayerMoves() {
    return new TreasureMapPickHelper(this.game, this.player).getPickMoves()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (TreasureMapPickHelper.isPickMove(move)) {
      return [this.goNext()]
    }
    return []
  }

  get effectColumnTiles() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .player(this.player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }
}
