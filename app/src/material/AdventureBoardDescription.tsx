/** @jsxImportSource @emotion/react */
import { BoardADescription } from '@gamepark/captain-flip/material/board/description/BoardADescription'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { BoardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import BoardA from '../images/boards/BoardA.jpg'

export class AdventureBoardDescription extends BoardDescription {
  height = 24
  width = 24
  borderRadius = 0
  image = BoardA

  getStaticItems(context: MaterialContext) {
    const rules = context.rules
    const items: MaterialItem[] = []
    for (const player of rules.players) {
      items.push({
        id: player,
        location: {
          type: LocationType.AdventureBoard
        }
      })
    }

    return items
  }

  getLocations(item: MaterialItem, _context: ItemContext) {
    // TODO: configurable board ?
    const board = BoardADescription
    const locations: Location[] = []
    for (const place of board.places) {
      locations.push({
        type: LocationType.AdventureBoardCharacterTile,
        player: item.id,
        x: place.x,
        y: place.y
      })
    }

    return locations
  }
}

export const adventureBoardDescription = new AdventureBoardDescription()