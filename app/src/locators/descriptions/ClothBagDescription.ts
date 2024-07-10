/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import Bag from '../../images/Bag.png'

export class ClothBagDescription extends LocationDescription {
  width = 9
  height = 10.91
  location = { type: LocationType.ClothBag }
  coordinates = { x: 0, y: 17, z: 5 }
  alwaysVisible = true
  extraCss = css`
    background: url(${Bag}) no-repeat center center;
    background-size: cover;
    filter: drop-shadow(0 0 0.1em black);
    pointer-events: none;
  `

}