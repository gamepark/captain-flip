/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
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

  transformOwnLocation(location: Location, context: LocationContext): string[] {
    const { rules, locators } = context
    const board = rules.material(MaterialType.AdventureBoard).player(location.player)
    const boardItem = board.getItem()!
    return [
      locators[boardItem.location.type]!.getTranslate3d(boardItem, { ...context, type: MaterialType.AdventureBoard, index: board.getIndex()!, displayIndex: 0 }),
      ...super.transformOwnLocation(location, context)
    ]
  }


  getCoordinates() {
    return { x: 8, y: -10, z: 5 }
  }

  alwaysVisible = true
  getLocations(context: MaterialContext) {
    return context.rules.players.map((p) => ({
      type: LocationType.PlayerCoin,
      player: p
    }))
  }
}