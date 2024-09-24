import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { ItemContext } from '@gamepark/react-game/dist/locators/Locator'
import { areAdjacentSquares, Location } from '@gamepark/rules-api'
import { characterTileDescription } from '../material/CharacterTileDescription'
import { FlipButtonDescription } from './descriptions/FlipButtonDescription'

export class FlipButtonLocator extends Locator {
  locationDescription = new FlipButtonDescription()

  getLocations({ player, rules }: MaterialContext) {
    const locations: Location[] = []
    if (!player || player !== rules.game.rule?.player) return locations

    if (rules.game.rule?.id === RuleId.PlayTile) {
      if (rules.remind(Memory.Flipped)) return locations
      const hand = rules.material(MaterialType.CharacterTile).location(LocationType.PlayerHand)
      if (!hand.length) return locations
      locations.push({
        type: LocationType.FlipButton,
        parent: hand.getIndex()
      })
    }

    if (rules.game.rule?.id === RuleId.Monkey) {
      const monkey = rules.material(MaterialType.CharacterTile).getItem(rules.remind(Memory.PlacedCard))
      const tiles = rules.material(MaterialType.CharacterTile)
        .player(player)
        .location(LocationType.AdventureBoardCharacterTile)
        .filter((tile) => areAdjacentSquares(monkey.location, tile.location))
      if (!tiles.length) return []
      locations.push(
        ...tiles.getIndexes().map((parent) => ({
          type: LocationType.FlipButton,
          parent: parent
        }))
      )
    }

    if (rules.game.rule?.id === RuleId.BoardEffectFlip) {
      const tiles = rules.material(MaterialType.CharacterTile)
        .player(player)
        .location(LocationType.AdventureBoardCharacterTile)
      if (!tiles.length) return []
      locations.push(
        ...tiles.getIndexes().map((parent) => ({
          type: LocationType.FlipButton,
          parent: parent
        }))
      )
    }

    return locations
  }

  coordinates = { x: characterTileDescription.width / 2, y: -(characterTileDescription.height / 2), z: 1 }

  placeLocation(location: Location, context: LocationContext): string[] {
    const { rules, locators } = context
    const tile = rules.material(MaterialType.CharacterTile).getItem(location.parent!)
    return locators[tile.location.type]!.placeItem(tile, context as ItemContext).concat(super.placeLocation(location, context))
  }
}

export const flipButtonLocator = new FlipButtonLocator()
