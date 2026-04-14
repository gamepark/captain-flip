import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { getViewPlayer } from '../locators/ViewHelper'
import { CaptainFlipPlayerPanel } from './CaptainFlipPlayerPanel'

export const PlayerPanels: FC = () => {
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<CaptainFlipRules>()!
  const me = usePlayerId()
  const context = { rules, player: me } as any
  const viewedPlayer = getViewPlayer(context)
  const allPlayers = rules.players
  const n = allPlayers.length
  const boardType = rules.remind<BoardType>(Memory.Board)
  const showNeighbors = me !== undefined && boardType === BoardType.BoardH && n > 2

  const myIndex = allPlayers.indexOf(me ?? allPlayers[0])
  const leftNeighborId = showNeighbors ? allPlayers[(myIndex - 1 + n) % n] : undefined
  const rightNeighborId = showNeighbors ? allPlayers[(myIndex + 1) % n] : undefined

  return (
    <>
      {players.map((player) =>
        <CaptainFlipPlayerPanel
          key={player.id}
          player={player}
          isLeftNeighbor={player.id === leftNeighborId}
          isRightNeighbor={player.id === rightNeighborId}
        />
      )}
    </>
  )
}
