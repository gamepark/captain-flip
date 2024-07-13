/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CoinRule } from '@gamepark/captain-flip/rules/effect/CoinRule'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'
import { GetTreasureMap } from './GetTreasureMap'


export const BoardEffectHeader = () => {
  const rules = useRules<CaptainFlipRules>()!
  const { t } = useTranslation()
  const delegate = rules.delegate() as CoinRule
  const coins = delegate.getCoins() ?? 0

  if (coins) {
    return <GainCoinHeader effect={t('column-bonus')} coins={coins}/>
  }

  return <GetTreasureMap effect={t('column-bonus')} />

}
