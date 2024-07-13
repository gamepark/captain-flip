/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { PlayMoveButton, useAnimation, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { LoseCoinHeader } from './LoseCoinHeader'

export const PlayTileHeader = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const flip = useLegalMove((move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand)
  const flipped = rules.remind(Memory.Flipped)
  const animation = useAnimation((animation) => isDeleteItemType(MaterialType.Coin)(animation.move))


  if (animation) {
    return <LoseCoinHeader effect={t('column-malus')} coins={animation.move.quantity ?? 1} />
  }

  if (itsMe) {
    if (flipped) {
      return (
        <Trans defaults="header.place.you" values={{ player: name }} />
      )
    }
    return (
      <Trans defaults="header.flip.you">
        <PlayMoveButton move={flip} />
      </Trans>
    )
  }

  if (flipped) {
    return (
      <Trans defaults="header.place.player" values={{ player: name }} />
    )
  }

  return (
    <Trans defaults="header.flip.player" values={{ player: name }} />
  )
}
