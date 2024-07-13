/** @jsxImportSource @emotion/react */
import { CarpenterEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/CarpenterEndOfGameRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const CarpenterEndOfGameHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new CarpenterEndOfGameRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('carpenter')} coins={rule.getCoins()} />
}
