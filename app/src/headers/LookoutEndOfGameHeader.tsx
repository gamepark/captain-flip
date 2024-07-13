/** @jsxImportSource @emotion/react */
import { LookoutEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/LookoutEndOfGameRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const LookoutEndOfGameHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new LookoutEndOfGameRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('lookout')} coins={rule.getCoins()} />
}
