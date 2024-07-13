/** @jsxImportSource @emotion/react */
import { ParrotEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/ParrotEndOfGameRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { LoseCoinHeader } from './LoseCoinHeader'

export const ParrotEndOfGameHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new ParrotEndOfGameRule(game)
  const { t } = useTranslation()

  return <LoseCoinHeader effect={t('parrot')} coins={rule.getCoins()} />
}
