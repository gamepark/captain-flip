/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MonkeyRule } from '@gamepark/captain-flip/rules/effect/MonkeyRule'
import { useAnimations, useGame, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, MaterialGame } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const MonkeyHeader = () => {
  const player = usePlayerId()
  const game = useGame<MaterialGame>()!
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const monkeyRule = new MonkeyRule(game)
  const { t } = useTranslation()
  const animations = useAnimations((animation) => isCreateItemType(MaterialType.Coin)(animation.move) || isDeleteItemType(MaterialType.Coin)(animation.move))

  if (animations.length) {
    return <GainCoinHeader effect={t('monkey')} coins={monkeyRule.getCoins()} />
  }

  if (itsMe) {
    return (
      <Trans defaults="header.monkey.you" />
    )
  }

  return (
    <Trans defaults="header.monkey.player" values={{ player: name }} />
  )
}
