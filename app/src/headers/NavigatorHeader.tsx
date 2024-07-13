/** @jsxImportSource @emotion/react */
import { NavigatorRule } from '@gamepark/captain-flip/rules/effect/NavigatorRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const NavigatorHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new NavigatorRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('navigator')} coins={rule.getCoins()} />
}
