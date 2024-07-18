/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class LandscapeDeckDescription extends LocationDescription {
  height = 11 + landscapeTileDescription.height
  width = 11 + landscapeTileDescription.height
  borderRadius = 50
  getExtraCss(_location: Location, context: LocationContext) {
    const { rules } = context
    const deckLength = rules.material(MaterialType.LandscapeTile).location(LocationType.LandscapeDeck).length
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      &:after {
        content: '${deckLength}';
        display: flex;
        align-self: center;
        justify-content: center;
        color: black;
        font-size: 5em;
        font-weight: bold;
        opacity: 0.6;
      }
      
    `
  }
  extraCss = css``
  coordinates = { x: 4.85, y: -6.5, z: 50}
  alwaysVisible = true
  location = { type: LocationType.LandscapeDeck }
}