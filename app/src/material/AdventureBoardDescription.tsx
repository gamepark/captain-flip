/** @jsxImportSource @emotion/react */
import { BoardADescription } from '@gamepark/captain-flip/material/board/description/BoardADescription'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { BoardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import BoardA from '../images/boards/BoardA.jpg'

export class AdventureBoardDescription extends BoardDescription {
  height = 24
  width = 24
  borderRadius = 0
  image = BoardA

  getStaticItems(context: MaterialContext) {
    const { rules } = context
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

  getLocations(item: MaterialItem, context: ItemContext) {
    // TODO: configurable board ?
    const locations: Location[] = []
    if (!context.player) return locations
    const board = BoardADescription
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