import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'

export class BoardEndOfGameEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const helper = new BoardHelper(this.game)
    const boardEffects = helper.endOfGameEffects()
    const effects = []
    for (const effect of boardEffects) {
      if (this.game.players.some((p) => this.hasCardInLocation(p, effect.x, effect.y))) {
        effects.push(effect)
      }
    }

    if (!effects.length) return [this.endGame()]
    this.memorize(Memory.BoardEndOfGameEffect, effects)
    const rule = new BoardHelper(this.game).getEffectRule(effects[0].effect!)!
    return [this.startPlayerTurn(rule, this.game.players[0])]
  }

  hasCardInLocation(player: PlayerId, x: number, y: number) {
    return this
      .material(MaterialType.CharacterTile)
      .player(player)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === x && l.y === y)
      .length > 0

  }
}