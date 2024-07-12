import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { areAdjacentSquares, isMoveItemType, Location, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { characterTileDescription } from '../../material/CharacterTileDescription'
import { FlipButton } from '../component/FlipButton'

export class FlipButtonDescription extends LocationDescription {
  height = 1.7
  width = 1.7
  borderRadius = 5
  alwaysVisible = true
  extraCss = css`
    overflow: hidden;
    box-shadow: 0.07em 0.07em 0 0 black;
    &:active {
      box-shadow: unset;
    }
  `

  coordinates = { x: characterTileDescription.width / 2, y: -(characterTileDescription.height / 2), z: 1 }

  getLocations(context: MaterialContext): Location<number, number>[] {
    const locations: Location[] = []
    const { rules, player } = context
    if (!player || player !== rules.game.rule?.player) return locations

    if (rules.game.rule?.id === RuleId.PlaceTile) {
      if (rules.remind(Memory.Flipped)) return locations
      const hand = rules.material(MaterialType.CharacterTile).location(LocationType.PlayerHand)
      if (!hand.length) return locations
      locations.push({
        type: LocationType.MonkeyFlipButton,
        parent: hand.getIndex()
      })
    }

    if (rules.game.rule?.id === RuleId.Monkey) {
      const monkey = rules.material(MaterialType.CharacterTile).getItem(this.getLastPlacedCard(rules))!
      const tiles = rules.material(MaterialType.CharacterTile)
        .player(player)
        .location(LocationType.AdventureBoardCharacterTile)
        .filter((tile) => areAdjacentSquares(monkey.location, tile.location))
      if (!tiles.length) return []
      locations.push(
        ...tiles.getIndexes().map((parent) => ({
          type: LocationType.MonkeyFlipButton,
          parent: parent
        }))
      )
    }

    return locations
  }

  getLastPlacedCard(rules: MaterialRules) {
    const cards = rules.remind(Memory.PlacedCard) ?? []
    return cards[cards.length - 1]!
  }

  transformOwnLocation(location: Location, context: LocationContext): string[] {
    const { rules, locators } = context
    const tile = rules.material(MaterialType.CharacterTile).getItem(location.parent!)!
    if (tile.location.type === LocationType.AdventureBoardCharacterTile) {
      return [
        locators[LocationType.AdventureBoard]!.getTranslate3d({  id: location.player, location: { type: LocationType.AdventureBoard }}, { ...context, type: MaterialType.CharacterTile, index: 0, displayIndex: 0 }),
        locators[tile.location.type]!.getTranslate3d(tile, { ...context, type: MaterialType.CharacterTile, index: location.parent!, displayIndex: 0 }),
        ...super.transformOwnLocation(location, context)
      ]
    }

    return [
      locators[tile.location.type]!.getTranslate3d(tile, { ...context, type: MaterialType.CharacterTile, index: location.parent!, displayIndex: 0 }),
      ...super.transformOwnLocation(location, context)
    ]
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
    return move.itemIndex === location.parent && item.location.rotation !== move.location.rotation
  }

  content = FlipButton
}