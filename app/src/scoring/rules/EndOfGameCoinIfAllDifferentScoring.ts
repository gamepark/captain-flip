import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { EffectMemory } from '@gamepark/captain-flip/rules/effect/board/BaseBoardEffect'
import {
  BoardEndOfGameCoinIfAllDifferent,
  BoardEndOfGameCoinIfAllDifferentRule
} from '@gamepark/captain-flip/rules/effect/board/BoardEndOfGameCoinIfAllDifferentRule'
import { MaterialGame } from '@gamepark/rules-api'

export class EndOfGameCoinIfAllDifferentScoring extends BoardEndOfGameCoinIfAllDifferentRule {
  constructor(game: MaterialGame, readonly playerId: PlayerId, readonly givenEffect: EffectMemory<BoardEndOfGameCoinIfAllDifferent>) {
    super(game)
  }

  get player() {
    return this.playerId
  }

  get effect() {
    return this.givenEffect
  }
}