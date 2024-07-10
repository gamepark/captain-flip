/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { pointerCursorCss, useLegalMove, usePlay, useRules } from '@gamepark/react-game'
import { isMoveItemType, Location } from '@gamepark/rules-api'
import { FC } from 'react'

export const FlipButton: FC<{ location: Location }> = ({ location }) => {
  const rules = useRules<CaptainFlipRules>()!
  const play = usePlay()
  const handTile = rules.material(MaterialType.CharacterTile).location(LocationType.PlayerHand).player(location.player)
  const handItem = handTile.getItem()!
  const handItemIndex = handTile.getIndex()
  const flip = useLegalMove((move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.rotation !== undefined && move.itemIndex === handItemIndex && move.location.rotation !== handItem.location.rotation)
  if (handItemIndex === -1 || !flip) return null
  return (
      <div css={button} onClick={() => play(flip)}>
        <FontAwesomeIcon icon={faRotateRight} css={pointerCursorCss}/>
      </div>


  )
}

const button = css`
  position: absolute;
  height: 1.7em;
  width: 1.7em;
  &:active {
    filter: unset;
  }
  cursor: pointer;
  background-color: white;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;
  border-radius: 5em;
  filter: drop-shadow(0.05em 0.05em 0.05em black);
`