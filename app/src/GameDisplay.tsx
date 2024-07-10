/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable
    verticalCenter
      xMin={-48} xMax={48} yMin={-26} yMax={26}
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={css`background-color: #ffffff20`}
    >
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}
