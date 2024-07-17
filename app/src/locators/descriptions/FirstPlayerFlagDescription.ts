/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import Flag from '../../images/boards/Flag.png'

export class FirstPlayerFlagDescription extends LocationDescription {
  width = 3.2
  ratio = 6/5
  borderRadius = 0
  extraCss = css`
   &:hover {
     background-color: transparent !important;
   }
  `

  image = Flag
}