import { css } from '@emotion/react'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerCoinDescription extends LocationDescription {
  height = 5
  width = 5
  borderRadius = 50

  getExtraCss(location: Location, context: LocationContext) {
    const { rules } = context
    const coins = new BoardHelper(rules.game).getPlayerCoin(location.player!)
    if (!coins) return
    return css`
      display: flex;
      align-items: center;
      justify-content: center;

      &:after {
        content: '${coins}';
        display: flex;
        align-self: center;
        justify-content: center;
        color: white;
        font-size: 2.5em;
        font-weight: 900;
        paint-order: stroke fill;
        -webkit-text-stroke: 0.06em #1a0e00;
        text-shadow: none;
      }
    `
  }
}