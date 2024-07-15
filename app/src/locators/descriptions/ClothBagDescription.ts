/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import Bag from '../../images/Bag.png'

export class ClothBagDescription extends LocationDescription {
  width = 9
  height = 10.91
  location = { type: LocationType.ClothBag }
  coordinates = { x: 0, y: 10, z: 5 }
  getCoordinates(_location :Location, context: LocationContext) {
    if (context.rules.players.length === 2) {
      return { x: 0, y: 20, z: 5 }
    }

    if (context.rules.players.length === 5) {
      return { x: -7, y: 14, z: 5 }
    }

    return this.coordinates
  }

  alwaysVisible = true
  extraCss = css`
    background: url(${Bag}) no-repeat center center;
    background-size: cover;
    filter: drop-shadow(0 0 0.1em black);
    pointer-events: none;
  `

}