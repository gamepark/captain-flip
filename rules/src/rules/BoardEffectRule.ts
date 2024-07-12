import { PlayerTurnRule } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../material/board/description/BoardCommon'
import { BoardSpaceType } from '../material/board/description/BoardSpaceType'
import { MaterialType } from '../material/MaterialType'
import { BaseBoardEffect } from './effect/board/BaseBoardEffect'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BoardEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const placedCard = this.placedCards
    const effects: { effect: BoardSpaceEffect, x: number, y: number }[] = []
    for (const card of placedCard) {
      const effect = new BoardHelper(this.game, this.player).getPlaceEffect(card.location)
      console.log(effects, card.location)
      if (effect?.type === undefined || effect.type === BoardSpaceType.None) continue
      effects.push({
        effect: effect,
        x: card.location.x!,
        y: card.location.y!,
      })
    }

    console.log(effects, this.player)

    if (!effects.length) return [this.startRule(RuleId.EndOfTurn)]
    this.memorize(Memory.BoardEffect, effects)
    const rule = new BaseBoardEffect(this.game).getEffectRule(effects[0]!.effect)!
    if (!rule) return [this.startRule(RuleId.EndOfTurn)]
    return [this.startRule(rule)]

  }

  get placedCards() {
    const placed = this.remind<number[]>(Memory.PlacedCard) ?? []
    return placed.map((index) => this.material(MaterialType.CharacterTile).getItem(index)!)
  }
}