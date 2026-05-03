import { css, keyframes } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { Player } from '@gamepark/react-client'
import { Avatar, PlayerTimer, usePlayerName } from '@gamepark/react-game'
import { getRelativePlayerIndex, useMaterialContext, useAnimations, useRules, MaterialContext } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType } from '@gamepark/rules-api'
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react'
import Flag from '../images/boards/Flag.png'
import TotalCoin from '../images/coins/TotalCoin.png'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { treasureMapImages } from '../effects/treasureMapImages'
import PlayerOne from '../images/panel/player-1.jpg'
import PlayerTwo from '../images/panel/player-2.jpg'
import PlayerThree from '../images/panel/player-3.jpg'
import PlayerFour from '../images/panel/player-4.jpg'
import PlayerFive from '../images/panel/player-5.jpg'
import { getPanelCssPosition, getPanelFontSize } from './PanelPosition'

type CaptainFlipPlayerPanelProps = {
  player: Player
  panelSlot?: number
  isViewed?: boolean
  onPanelClick?: () => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>

export const CaptainFlipPlayerPanel: FC<CaptainFlipPlayerPanelProps> = (props) => {
  const { player, panelSlot, isViewed: isViewedProp, onPanelClick: onPanelClickProp } = props
  const rules = useRules<CaptainFlipRules>()!
  const context = useMaterialContext()
  const animations = useAnimations((a) => isCreateItemType(MaterialType.Coin)(a.move) || isDeleteItemType(MaterialType.Coin)(a.move))
  const playerName = usePlayerName(player.id)

  const playerCount = rules.players.length
  const useMini = playerCount > 2

  const isViewed = !!isViewedProp
  const slot = panelSlot ?? getComputedIndex(context, player.id)

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
    onPanelClickProp?.()
  }, [onPanelClickProp])

  return (
    <div
      css={[panelCss, useMini && multiPanelCss(getPanelFontSize(playerCount)), panelPosition(slot, playerCount), isViewed && playerCount > 2 && viewedPanelCss, playerCount > 2 && clickableCss]}
      onClick={onPanelClick}
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
                {playerTreasureMaps.map((map, i) => {
                  const rotation = map.id === TreasureMapType.AllDirections && typeof map.location.rotation === 'number'
                    ? map.location.rotation * 90
                    : 0
                  return (
                    <img
                      key={i}
                      src={treasureMapImages[map.id as TreasureMapType] ?? treasureMapImages[TreasureMapType.Base]}
                      alt=""
                      css={[mapImgCss, rotation && mapRotatedCss(rotation)]}
                    />
                  )
                })}
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
  transition: top 0.2s ease, left 0.2s ease, font-size 0.2s ease;
`

const multiPanelCss = (fontSize: number) => css`
  font-size: ${fontSize}em;
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
  justify-content: flex-start;
  gap: 0.3em;
  flex: 1;
  /* Reserve the map slot height so the panel keeps the same total
   * height whether the player holds a treasure map or not. */
  min-height: 3.5em;
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

const mapImgCss = css`
  height: 3.5em;
  width: auto;
  filter: drop-shadow(0 0.1em 0.2em rgba(0, 0, 0, 0.4));
  transition: transform 0.3s ease;
`

const mapRotatedCss = (deg: number) => css`
  transform: rotate(${deg}deg);
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
