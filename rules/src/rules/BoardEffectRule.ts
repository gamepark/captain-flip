import { PlayerTurnRule } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../material/board/description/BoardCommon'
import { BoardSpaceType } from '../material/board/description/BoardSpaceType'
import { MaterialType } from '../material/MaterialType'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BoardEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const placedCard = this.placedCards
    const effects: { effect: BoardSpaceEffect, x: number, y: number }[] = []
    const helper = new BoardHelper(this.game)
    for (const card of placedCard) {
      const effect = helper.getPlaceEffect(card.location)
      if (effect?.type === undefined || effect.type === BoardSpaceType.None || effect.type === BoardSpaceType.Cost) continue
      effects.push({
        effect: effect,
        x: card.location.x!,
        y: card.location.y!,
      })
    }

    if (!effects.length) return [this.startRule(RuleId.EndOfTurn)]
    this.memorize(Memory.BoardEffect, effects)
    const rule = helper.getEffectRule(effects[0]!.effect)!
    if (!rule) return [this.startRule(RuleId.EndOfTurn)]
    return [this.startRule(rule)]

  }

  get placedCards() {
    const placed = this.remind<number[]>(Memory.PlacedCard) ?? []
    return placed.map((index) => this.material(MaterialType.CharacterTile).getItem(index)!)
  }
}