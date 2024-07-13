/** @jsxImportSource @emotion/react */
import { CookRule } from '@gamepark/captain-flip/rules/effect/CookRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const CookHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new CookRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('cook')} coins={rule.getCoins()} />
}
