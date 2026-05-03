import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { usePlay, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, useCallback } from 'react'
import { useAutoViewOnDrag } from '../hooks/useAutoViewOnDrag'
import { getViewedPlayer, isMiniLayout } from '../locators/ViewHelper'
import { CaptainFlipPlayerPanel } from './CaptainFlipPlayerPanel'
import { getPanelSlot } from './PanelPosition'

export const PlayerPanels: FC = () => {
  useAutoViewOnDrag()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<CaptainFlipRules>()!
  const me = usePlayerId()
  const allPlayers = rules.players
  const n = allPlayers.length
  const isMini = isMiniLayout({ rules, player: me } as any)
  const viewed = getViewedPlayer({ rules, player: me } as any)
  const viewedIndex = allPlayers.indexOf(viewed)
  const play = usePlay()

  const onPanelClick = useCallback((player: PlayerId) => {
    if (!isMini || player === viewed) return
    play(MaterialMoveBuilder.changeView(player), { transient: true })
  }, [isMini, viewed, play])

  return (
    <>
      {players.map((player) => {
        const playerIndex = allPlayers.indexOf(player.id)
        const slot = isMini ? getPanelSlot(playerIndex, viewedIndex, n) : players.findIndex(p => p.id === player.id)
        const isViewed = isMini && player.id === viewed
        return (
          <CaptainFlipPlayerPanel
            key={player.id}
            player={player}
            panelSlot={slot}
            isViewed={isViewed}
            onPanelClick={() => onPanelClick(player.id)}
          />
        )
      })}
    </>
  )
}
