/** @jsxImportSource @emotion/react */
import { GunnerRule } from '@gamepark/captain-flip/rules/effect/GunnerRule'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const GunnerHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new GunnerRule(game)
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('gunner')} coins={rule.getCoins()} />
}
