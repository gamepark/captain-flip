/** @jsxImportSource @emotion/react */
import { SwabbyEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/SwabbyEndOfGameRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const SwabbyEndOfGameHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new SwabbyEndOfGameRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('swabby')} coins={rule.getCoins()} />
}
