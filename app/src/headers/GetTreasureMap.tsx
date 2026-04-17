/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MinimizedToast } from '../components/CaptainFlipDialog'
import { PickTreasureMapDialog } from './PickTreasureMapDialog'

type EffectHeaderProps = {
  effect: string,
}

/** Popup + minimized toast that appears whenever the current player has
 *  2+ legal picks for a treasure map. Decoupled from the header text so
 *  it can be rendered on top of any header (coins, column bonus, …). */
export const PickTreasureMapFlow: FC = () => {
  const { t } = useTranslation()
  const me = usePlayerId()
  const pickMoves = useLegalMoves<MoveItem>(
    (m: any) => isMoveItemType(MaterialType.TreasureMapToken)(m)
      && m.location.type === LocationType.PlayerTreasureMapToken
      && m.location.player === me
  )
  const hasChoice = me !== undefined && pickMoves.length >= 2

  const [minimized, setMinimized] = useState(false)
  const [chosen, setChosen] = useState(false)

  if (!hasChoice || chosen) return null
  if (minimized) {
    return (
      <MinimizedToast
        title={t('pick-map.minimized', 'Choose a Treasure Map')}
        onClick={() => setMinimized(false)}
      />
    )
  }
  return (
    <PickTreasureMapDialog
      onMinimize={() => setMinimized(true)}
      onChosen={() => setChosen(true)}
    />
  )
}

export const GetTreasureMap: FC<EffectHeaderProps> = ({ effect }) => {
  const me = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = me && activePlayer === me
  const name = usePlayerName(activePlayer)

  return (
    <>
      {itsMe ? (
        <Trans i18nKey="header.map.you" values={{ effect }} />
      ) : (
        <Trans i18nKey="header.map.player" values={{ player: name, effect }} />
      )}
      <PickTreasureMapFlow />
    </>
  )
}
