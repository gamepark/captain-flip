import { css, keyframes } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { Player } from '@gamepark/react-client'
import { Avatar, PlayerTimer, usePlayerName, usePlayerId, usePlay } from '@gamepark/react-game'
import { getRelativePlayerIndex, useMaterialContext, useAnimations, useRules, MaterialContext } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Flag from '../images/boards/Flag.png'
import TotalCoin from '../images/coins/TotalCoin.png'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { treasureMapImages } from '../effects/treasureMapImages'
import PlayerOne from '../images/panel/player-1.jpg'
import PlayerTwo from '../images/panel/player-2.jpg'
import PlayerThree from '../images/panel/player-3.jpg'
import PlayerFour from '../images/panel/player-4.jpg'
import PlayerFive from '../images/panel/player-5.jpg'
import { encodeView, getSides } from '../locators/ViewHelper'
import { BoardPreview } from './BoardPreview'
import { getPanelCssPosition } from './PanelPosition'
import { SidePickerPopup } from './SidePickerPopup'

type CaptainFlipPlayerPanelProps = {
  player: Player
  isLeftNeighbor?: boolean
  isRightNeighbor?: boolean
  isPickerOpen?: boolean
  onRequestPicker?: (open: boolean) => void
} & HTMLAttributes<HTMLDivElement>

export const CaptainFlipPlayerPanel: FC<CaptainFlipPlayerPanelProps> = (props) => {
  const { player, isLeftNeighbor, isRightNeighbor, isPickerOpen, onRequestPicker } = props
  const rules = useRules<CaptainFlipRules>()!
  const context = useMaterialContext()
  const play = usePlay()
  const animations = useAnimations((a) => isCreateItemType(MaterialType.Coin)(a.move) || isDeleteItemType(MaterialType.Coin)(a.move))
  const playerId = usePlayerId()
  const isMe = playerId !== undefined && player.id === playerId
  const playerName = usePlayerName(player.id)
  const { t } = useTranslation()

  const { left: leftPlayer, right: rightPlayer } = getSides({ rules, player: playerId } as any)
  const isViewedLeft = player.id === leftPlayer
  const isViewedRight = player.id === rightPlayer
  const isViewed = isViewedLeft || isViewedRight

  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [coins, setCoins] = useState<number>(new CoinHelper(rules.game, player.id).coins)
  useEffect(() => {
    if (animations.length) return
    setCoins(new CoinHelper(rules.game, player.id).coins)
  }, [animations, rules.game, player.id])

  const isTurnToPlay = rules.isTurnToPlay(player.id)
  const isFirstPlayer = player.id === rules.players[0]

  const playerTreasureMaps = rules.material(MaterialType.TreasureMapToken)
    .location(LocationType.PlayerTreasureMapToken)
    .player(player.id)
    .getItems()

  const onPanelClick = useCallback(() => {
    if (rules.players.length <= 2) return
    onRequestPicker?.(!isPickerOpen)
  }, [rules.players.length, isPickerOpen, onRequestPicker])

  // Assign this player to a side. If they already occupy the other side,
  // the two sides swap (rule b): the previous occupant moves across
  // instead of being kicked out.
  const assignSide = useCallback((targetSide: 'left' | 'right') => {
    const newLeft  = targetSide === 'left'  ? player.id : (leftPlayer === player.id ? rightPlayer : leftPlayer)
    const newRight = targetSide === 'right' ? player.id : (rightPlayer === player.id ? leftPlayer : rightPlayer)
    play(MaterialMoveBuilder.changeView(encodeView(newLeft, newRight)), { transient: true })
    onRequestPicker?.(false)
  }, [player.id, leftPlayer, rightPlayer, play, onRequestPicker])

  const onPickerClose = useCallback(() => onRequestPicker?.(false), [onRequestPicker])

  const onMouseEnter = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 800)
  }, [])

  const onMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeout.current)
    setIsHovered(false)
  }, [])

  return (
    <div
      css={[panelCss, panelPosition(getComputedIndex(context, player.id), rules.players.length), isViewed && rules.players.length > 2 && viewedPanelCss, rules.players.length > 2 && clickableCss]}
      onClick={onPanelClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background */}
      <div css={bgCss(getBackground(player.id))} />

      {/* Content: avatar + info + coin/timer */}
      <div css={contentRowCss}>
        <div css={avatarWrapCss}>
          {isTurnToPlay && (
            <div css={activeRingCss}>
              <div css={activeRingInnerCss} />
            </div>
          )}
          <Avatar playerId={player.id} css={avatarCss} />
        </div>
        <div css={infoCss}>
          <div css={topRowCss}>
            <span css={nameCss}>{playerName}</span>
          </div>
          <div css={bottomRowCss}>
            {isFirstPlayer && (
              <img src={Flag} alt="" css={flagImgCss} />
            )}
            {playerTreasureMaps.length > 0 && (
              <div css={mapsCss}>
                {playerTreasureMaps.map((map, i) => (
                  <img
                    key={i}
                    src={treasureMapImages[map.id as TreasureMapType] ?? treasureMapImages[TreasureMapType.Base]}
                    alt=""
                    css={mapImgCss}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div css={rightColCss}>
          <div css={coinCss}>
            <img src={TotalCoin} alt="" css={coinImgCss} />
            <span css={coinValCss}>{coins}</span>
          </div>
          {!rules.isOver() && <PlayerTimer playerId={player.id} css={timerCss} />}
        </div>
      </div>

      {/* Neighbor indicator — only on board H */}
      {isLeftNeighbor && (
        <div css={neighborStripCss}>{t('neighbor.left')}</div>
      )}
      {isRightNeighbor && (
        <div css={neighborStripCss}>{t('neighbor.right')}</div>
      )}

      {/* Board tray — revealed on hover after delay. Suppressed when
          the side picker is open so the two don't stack visually. */}
      {!isMe && !isPickerOpen && (
        <div css={[boardTrayCss, isHovered && boardTrayVisibleCss]}>
          <BoardPreview playerId={player.id} />
        </div>
      )}

      {/* Side picker — opened when the user clicks a clickable panel */}
      {isPickerOpen && (
        <SidePickerPopup
          currentSide={isViewedLeft ? 'left' : isViewedRight ? 'right' : undefined}
          onPick={assignSide}
          onClose={onPickerClose}
        />
      )}
    </div>
  )
}

// ---- Styles ----

const panelCss = css`
  position: absolute;
  width: 28em;
  font-size: 0.438em;
  cursor: default;
  z-index: 50;
  overflow: visible;
  transform: translateZ(100em);
  border-radius: 2em 1em 1em 1em;
  box-shadow: 0 0 0.5em black;
`

const clickableCss = css`
  cursor: pointer;
`

const viewedPanelCss = css`
  box-shadow: 0 0 0.5em black, 0 0 0 0.3em gold;
`

const bgCss = (image: string) => css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.8) url(${image});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 0.5em black;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    border-radius: inherit;
  }
`

const activeRingCss = css`
  position: absolute;
  inset: -0.35em;
  border-radius: 50%;
  z-index: 0;
`

const ringRotation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const activeRingInnerCss = css`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(180deg, gold, var(--gp-primary, #28B8CE));
  animation: ${ringRotation} 1s infinite linear;
`

const avatarCss = css`
  width: 4.5em;
  height: 4.5em;
  border-radius: 50%;
  z-index: 3;
  color: black;
  flex-shrink: 0;
`

const rightColCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 5;
`

const coinCss = css`
  width: 3.5em;
  height: 3.5em;
  flex-shrink: 0;
  position: relative;
`

const coinImgCss = css`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0.15em 0.3em rgba(0, 0, 0, 0.5));
`

const coinValCss = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  font-weight: 800;
  color: #1a0e02;
  text-shadow: 0 1px 0 rgba(255, 240, 150, 0.6);
  line-height: 1;
`

const avatarWrapCss = css`
  position: relative;
  flex-shrink: 0;
  z-index: 3;
  width: 4.5em;
  height: 4.5em;
`

const contentRowCss = css`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  padding: 0.5em;
  gap: 0.5em;
`

const infoCss = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3em;
`

const topRowCss = css`
  display: flex;
  align-items: baseline;
  gap: 0.4em;
`

const nameCss = css`
  font-size: 2em;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.06em 0.2em;
  border-radius: 0.15em;
  line-height: 1.15;
  margin-left: 0.3em;
`

const timerCss = css`
  font-size: 1.8em;
  font-weight: 700;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.06em 0.2em;
  border-radius: 0.15em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.15;
`

const bottomRowCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

const flagImgCss = css`
  height: 3.5em;
  margin-left: 0.7em;
  width: auto;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
`

const mapsCss = css`
  display: flex;
  align-items: center;
  gap: 0.2em;
`

const neighborStripCss = css`
  position: relative;
  z-index: 2;
  background: linear-gradient(90deg, #d4a828, #c09020, #d4a828);
  padding: 0.15em 0.5em;
  text-align: center;
  font-size: 1.1em;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.4);
  border-radius: 0 0 1em 1em;
`

const mapImgCss = css`
  height: 3.5em;
  width: auto;
  filter: drop-shadow(0 0.1em 0.2em rgba(0, 0, 0, 0.4));
`

// ---- Board tray (hover reveal) ----

const boardTrayCss = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 60;
  opacity: 0;
  transform: translateY(-0.5em);
  pointer-events: none;
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
`

const boardTrayVisibleCss = css`
  opacity: 1;
  transform: translateY(0.3em);
  pointer-events: auto;
  transition: opacity 0.2s ease, transform 0.2s ease;
`

// ---- Positioning ----

const panelPosition = (index: number, playerCount: number) => {
  const { top, left } = getPanelCssPosition(index, playerCount)
  return css`
    top: ${top}em;
    left: ${left}em;
  `
}

const getBackground = (player: PlayerId) => {
  switch (player) {
    case 1: return PlayerOne
    case 2: return PlayerTwo
    case 3: return PlayerThree
    case 4: return PlayerFour
    default: return PlayerFive
  }
}

export const getComputedIndex = (context: MaterialContext, player: PlayerId) => {
  return getRelativePlayerIndex(context, player)
}
