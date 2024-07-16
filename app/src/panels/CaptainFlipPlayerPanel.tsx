/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { Player } from '@gamepark/react-client'
import { StyledPlayerPanel, useFocusContext, usePlayerId } from '@gamepark/react-game'
import { useAnimations } from '@gamepark/react-game/dist/hooks/useAnimations'
import { useMaterialContext } from '@gamepark/react-game/dist/hooks/useMaterialContext'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { MaterialContext } from '@gamepark/react-game/dist/locators/ItemLocator'
import { getRelativePlayerIndex } from '@gamepark/react-game/dist/locators/utils/getRelativePlayerIndex.util'
import { isCreateItemType } from '@gamepark/rules-api/dist/material/moves/items/CreateItem'
import { isDeleteItemType } from '@gamepark/rules-api/dist/material/moves/items/DeleteItem'
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react'
import TotalCoin from '../images/coins/TotalCoin.png'
import PlayerOne from '../images/panel/player-1.jpg'
import PlayerTwo from '../images/panel/player-2.jpg'
import PlayerThree from '../images/panel/player-3.jpg'
import PlayerFour from '../images/panel/player-4.jpg'
import PlayerFive from '../images/panel/player-5.jpg'

type CaptainFlipPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const CaptainFlipPlayerPanel: FC<CaptainFlipPlayerPanelProps> = (props) => {
  const { player } = props
  const { setFocus } = useFocusContext()
  const rules = useRules<CaptainFlipRules>()!
  const context = useMaterialContext()
  const animations = useAnimations((a) => isCreateItemType(MaterialType.Coin)(a.move) || isDeleteItemType(MaterialType.Coin)(a.move))
  const playerId = usePlayerId()
  const itsMe = playerId && player.id === playerId
  const [coins, setCoins] = useState<number>(new CoinHelper(rules.game, player.id).coins)
  useEffect(() => {
    if (animations.length) return
    setCoins(new CoinHelper(rules.game, player.id).coins)
  }, [animations, rules.game, player.id])

  const focusPlayer = useCallback(() => {
    setFocus({
      materials: [
        rules.material(MaterialType.AdventureBoard).player(player.id),
        rules.material(MaterialType.CharacterTile).player(player.id),
        rules.material(MaterialType.Coin).player(player.id),
      ],
      staticItems: [],
      locations: [],
      margin: {
        top: 0.5,
        left: 0,
        right: 0.5,
        bottom: itsMe? 3: 0.5
      },
      animationTime: 500
    })
  }, [rules, player, itsMe, setFocus])

  return (
    <StyledPlayerPanel
      player={player}
      css={panelPosition(getComputedIndex(context, player.id))}
      onClick={focusPlayer}
      backgroundImage={getBackground(player.id)}
      mainCounter={{
        image: TotalCoin,
        imageCss: css`border: 0`,
        value: coins
      }}
    />
  )
}

const panelPosition = (index: number) => {
  const position = getPosition(index)
  return css`
    cursor: pointer;
    position: absolute;
    right: ${position.right ? `${position.right}em` : 'unset'};
    top: ${position.top ? `${position.top}em` : 'unset'};
    left: ${position.left ? `${position.left}em` : 'unset'};
    bottom: ${position.bottom ? `${position.bottom}em` : 'unset'};
  `
}

const getBackground = (player: PlayerId) => {
  switch (player) {
    case 1:
      return PlayerOne;
    case 2:
      return PlayerTwo;
    case 3:
      return PlayerThree;
    case 4:
      return PlayerFour;
    default:
      return PlayerFive;
  }
}

const getPosition = (index: number): { top?: number, right?: number, bottom?: number, left?: number } => {
  switch (index) {
    case 0:
      return {
        bottom: 1,
        left: 1
      }
    case 1:
      return {
        top: 8.5,
        left: 1
      }
    case 2:
      return {
        top: 8.5,
        left: 81
      }
    case 3:
    return {
      top: 8.5,
      right: 1
    }
    case 4:
    default:
      return {
        bottom: 1,
        right: 1
      }
  }
}

export const getComputedIndex = (context: MaterialContext, player: PlayerId) => {
  const index = getRelativePlayerIndex(context, player)
  if (context.rules.players.length === 2) {
    return index === 0? 1: 3
  }

  if (context.rules.players.length === 3) {
    if (index === 1) return 3
    if (index === 2) return 4
    return index
  }

  if (context.rules.players.length === 4) {
    if (index === 2) return 3
    if (index === 3) return 4
    return index
  }

  return index
}
