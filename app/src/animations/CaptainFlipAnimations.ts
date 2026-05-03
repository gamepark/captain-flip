import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { onTopOfBagLocator } from '../locators/OnPlayerPanelLocator'

export const captainFlipAnimations = new MaterialGameAnimations()

// Coin create/delete: short
captainFlipAnimations
  .when()
  .move((move) => isCreateItemType(MaterialType.Coin)(move) || isDeleteItemType(MaterialType.Coin)(move))
  .duration(1)

// Coin transfer (moveMoney)
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.Coin))
  .duration(0.8)

// Treasure map move
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.TreasureMapToken))
  .duration(0.5)

// Flip in hand or on board
captainFlipAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return (
      (item.location.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand) ||
      (item.location.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile)
    )
  })
  .duration(0.6)

// Tile placement (2-3p): flat trajectory. Boards sit side-by-side with
// the bag below, no obstacle to fly over.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (move.location.type !== LocationType.AdventureBoardCharacterTile) return false
    if (context.rules.players.length >= 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type !== LocationType.AdventureBoardCharacterTile
  })
  .duration(800)
  .trajectory(() => ({ elevation: false, waypoints: [] }))

// Tile placement (4-5p): parabolic arc tall enough to clear the bag,
// since the hand sits next to it and the tile would otherwise glide
// straight through the bag on the way to the board.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (move.location.type !== LocationType.AdventureBoardCharacterTile) return false
    if (context.rules.players.length < 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type !== LocationType.AdventureBoardCharacterTile
  })
  .duration(800)
  .trajectory(() => ({
    elevation: { height: 12, shape: 'parabolic' },
    waypoints: []
  }))

// Pioche (2-3p): slide flat to the top of the bag, then straight to the hand.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (context.rules.players.length >= 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(1200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        // Elevation 10em at the on-top-of-bag waypoint lifts the tile
        // above the bag so it visibly clears it on the way to the
        // hand instead of glitching through it.
        { at: 0.35, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 10 }
      ]
    }
  })

// Pioche (4-5p): straight bag → hand, no waypoint. Avoids the late
// nudge of existing hand tiles when the new one settles in the fan.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (context.rules.players.length < 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(1200)
  .trajectory(() => ({ elevation: false, waypoints: [] }))
