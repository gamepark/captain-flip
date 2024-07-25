import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { EffectMemory } from '@gamepark/captain-flip/rules/effect/board/BaseBoardEffect'
import { BoardEndOfGameCoinIfSame, BoardEndOfGameCoinIfSameRule } from '@gamepark/captain-flip/rules/effect/board/BoardEndOfGameCoinIfSameRule'
import { MaterialGame } from '@gamepark/rules-api'

export class EndOfGameCoinIfSameScoring extends BoardEndOfGameCoinIfSameRule {
  constructor(game: MaterialGame, readonly playerId: PlayerId, readonly givenEffect: EffectMemory<BoardEndOfGameCoinIfSame>) {
    super(game)
  }

  get player() {
    return this.playerId
  }

  get effect() {
    return this.givenEffect
  }
}