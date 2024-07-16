/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { BoardDescription, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import BoardA from '../images/boards/BoardA.jpg'
import BoardB from '../images/boards/BoardB.jpg'
import BoardC from '../images/boards/BoardC.jpg'
import BoardD from '../images/boards/BoardD.jpg'
import BoardE from '../images/boards/BoardE.jpg'
import Flag from '../images/boards/Flag.png'

export class AdventureBoardDescription extends BoardDescription {
  height = 24
  width = 24
  borderRadius = 0
  images = {
    [BoardType.BoardA]: BoardA,
    [BoardType.BoardB]: BoardB,
    [BoardType.BoardC]: BoardC,
    [BoardType.BoardD]: BoardD,
    [BoardType.BoardE]: BoardE,
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext) {
    const firstPlayer = context.rules.players[0]
    if (item.location.player !== firstPlayer) return
    return css`
      &:after {
        content: '';
        position: absolute;
        height: 2.5em;
        width: 2.5em;
        left: 0.3em;
        background-color: blue;
        top: 0.5em;
        transform: translateZ(4em);
        background: url(${Flag}) no-repeat center center;
        background-size: cover;
      }
    `
  }

  getImages() {
    const images = super.getImages()
    images.push(Flag)
    return images
  }

  getLocations(item: MaterialItem, context: ItemContext) {
    const locations: Location[] = []
    if (!context.player) return locations
    const places = new BoardHelper(context.rules.game).places
    for (const place of places) {
      locations.push({
        type: LocationType.AdventureBoardCharacterTile,
        player: item.location.player,
        x: place.x,
        y: place.y
      })
    }

    return locations
  }
}

export const adventureBoardDescription = new AdventureBoardDescription()