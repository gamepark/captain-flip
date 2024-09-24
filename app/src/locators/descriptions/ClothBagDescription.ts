/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import Bag from '../../images/bag.png'
import { ClothBagHelp } from './help/ClothBagHelp'

export class ClothBagDescription extends LocationDescription {
  height = 11
  width = 8.25

  image = Bag
  help = ClothBagHelp
  helpImage = Bag

  extraCss = css`
    filter: drop-shadow(0 0 0.1em black);

    &:hover {
      background-color: unset !important;
    }
  `
}