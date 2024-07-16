/** @jsxImportSource @emotion/react */
import { usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { CaptainFlipPlayerPanel } from './CaptainFlipPlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) =>
        <CaptainFlipPlayerPanel key={player.id} player={player}/>
      )}
    </>,
    root
  )
}