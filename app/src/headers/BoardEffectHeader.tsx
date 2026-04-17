import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CoinRule } from '@gamepark/captain-flip/rules/effect/CoinRule'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'
import { GetTreasureMap, PickTreasureMapFlow } from './GetTreasureMap'


export const BoardEffectHeader = () => {
  const rules = useRules<CaptainFlipRules>()!
  const { t } = useTranslation()
  const delegate = rules.delegate() as CoinRule
  const coins = delegate.getCoins() ?? 0

  if (coins) {
    // Coins + treasure map (e.g. BoardEffectCoinAndTreasureMap): we
    // show the coin gain text and still surface the pick dialog when
    // more than one map is available.
    return (
      <>
        <GainCoinHeader effect={t('column-bonus')} coins={coins}/>
        <PickTreasureMapFlow/>
      </>
    )
  }

  return <GetTreasureMap effect={t('column-bonus')} />

}
