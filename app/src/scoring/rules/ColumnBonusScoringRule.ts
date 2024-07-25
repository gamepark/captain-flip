import { BoardSpaceType } from '@gamepark/captain-flip/material/board/description/BoardSpaceType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { EffectMemory } from '@gamepark/captain-flip/rules/effect/board/BaseBoardEffect'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { EndOfGameCoinIfAllDifferentScoring } from './EndOfGameCoinIfAllDifferentScoring'
import { EndOfGameCoinIfSameScoring } from './EndOfGameCoinIfSameScoring'

export class ColumnBonusScoringRule extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  getCoins() {
    const boardEffects = new BoardHelper(this.game).endOfGameEffects()
    const scores = boardEffects.map((e: any) => this.getScoringRule(e))
    return sum(scores)
  }

  getScoringRule(effect: EffectMemory<any> & Record<any, any>): number {
    if (effect.effect.type === BoardSpaceType.EndOfGameCoinIfAllDifferent) {
      return new EndOfGameCoinIfAllDifferentScoring(this.game, this.playerId, effect).getCoins()
    }
    if (effect.effect.type === BoardSpaceType.EndOfGameCoinIfSame) {
      return new EndOfGameCoinIfSameScoring(this.game, this.playerId, effect).getCoins()
    }
    return 0
  }


}