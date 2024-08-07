/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { adventureBoardLocator } from '../AdventureBoardLocator'

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
      pointer-events: none;
      &:after {
        content: '${coins}';
        display: flex;
        align-self: center;
        justify-content: center;
        color: black;
        font-size: 2.5em;
        font-weight: bold;
        opacity: 0.7;
      }
      
    `
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y, z } = adventureBoardLocator.getBoardPosition(location.player!, context)
    return { x: x + 9, y: y - 10, z: z + 5 }
  }

  alwaysVisible = true
  getLocations(context: MaterialContext) {
    return context.rules.players.map((p) => ({
      type: LocationType.PlayerCoin,
      player: p
    }))
  }
}