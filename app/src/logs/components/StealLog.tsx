/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { BoardSpaceEffect } from '@gamepark/captain-flip/material/board/description/BoardCommon'
import { BoardEffectStealLeftRule, BoardEffectStealRightRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectStealRule'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { isStartRule } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { EffectIcon } from '../../effects/effectIcon'
import { whoCss } from '../logStyles'
import { commonComponents, Props, useName } from '../shared'

/* Dedicated log line for StealLeft / StealRight board effects.
 *
 * Unlike generic coin rules, a steal involves TWO players: the thief
 * and the victim. We render it as a narrative line "<thief> steals N
 * from <victim>" with the matching board effect icon. The rule is
 * instantiated on the current game to read both the victim (via
 * getNeighbor()) and the amount (via getCoins(), which caps the
 * intent by the victim's actual balance). */
export const StealLog: FC<Props> = ({ move, context }) => {
  if (!isStartRule(move)) return null
  const ruleId = move.id as RuleId
  const RuleClass = ruleId === RuleId.BoardEffectStealLeft
    ? BoardEffectStealLeftRule
    : ruleId === RuleId.BoardEffectStealRight
      ? BoardEffectStealRightRule
      : undefined
  if (!RuleClass) return null

  const rule = new RuleClass(context.game)
  const coins = rule.getCoins?.() ?? 0
  if (coins === 0) return null

  const victimId = (rule as any).getNeighbor?.() as number | undefined
  const thiefId = (move as any).player ?? context.action.playerId
  const thief = useName(thiefId)
  const victim = useName(victimId)

  // Trailing icon = the steal board space effect
  const effectMemory = (rule as any).effect as { effect: BoardSpaceEffect } | undefined
  const effect = effectMemory?.effect
  const board = new CaptainFlipRules(context.game).remind<BoardType>(Memory.Board)
  const icon = (effect && board !== undefined)
    ? <EffectIcon board={board} effect={effect}/>
    : <span/>

  return (
    <Trans
      i18nKey="log.coins.steal"
      values={{ thief, victim, coins }}
      components={{
        ...commonComponents,
        thief: <span css={whoCss}/>,
        victim: <span css={whoCss}/>,
        icon
      }}
    />
  )
}
