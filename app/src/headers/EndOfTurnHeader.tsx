import { TreasureMapHelper } from '@gamepark/captain-flip/rules/helper/TreasureMapHelper'
import { useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { GainCoinHeader } from './GainCoinHeader'

export const EndOfTurnHeader = () => {
  const game = useGame<MaterialGame>()!
  const player = game.rule!.player!
  const helper = new TreasureMapHelper(game, player)
  const coins = helper.getEndOfTurnCoins() + helper.getKrakenCoins()
  const { t } = useTranslation()

  return <GainCoinHeader effect={t('treasure-map')} coins={coins} />
}
