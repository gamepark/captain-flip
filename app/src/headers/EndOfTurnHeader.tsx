/** @jsxImportSource @emotion/react */
import { EndOfTurnRule } from '@gamepark/captain-flip/rules/EndOfTurnRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const EndOfTurnHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new EndOfTurnRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('treasure-map')} coins={rule.getCoins()} />
}
