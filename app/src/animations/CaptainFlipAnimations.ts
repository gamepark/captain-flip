import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { isPlayerVisible } from '../locators/ViewHelper'
import { belowPlayerPanelLocator, onPlayerPanelLocator, onTopOfBagLocator } from '../locators/OnPlayerPanelLocator'

export const captainFlipAnimations = new MaterialGameAnimations()

// Coins for NON-VIEWED player: animate via panel
captainFlipAnimations
  .configure((move, context) => {
    if (!isCreateItemType(MaterialType.Coin)(move) && !isDeleteItemType(MaterialType.Coin)(move)) return false
    const loc = (move as any).item?.location ?? (move as any).location
    if (!loc?.player) return false
    return !isPlayerVisible({ location: loc } as any, context as any)
  })
  .duration(1500)
  .trajectory((_context, move) => {
    const loc = (move as any).item?.location ?? (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: loc.player }) },
        { at: 0.7, locator: belowPlayerPanelLocator, location: () => ({ player: loc.player }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: loc.player }) }
      ]
    }
  })

// Coins for VIEWED player (normal animation)
captainFlipAnimations
  .when()
  .move((move) => isCreateItemType(MaterialType.Coin)(move) || isDeleteItemType(MaterialType.Coin)(move))
  .duration(1)

// Coin transfer (moveMoney): neither player visible → panel to panel
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.Coin)(move)) return false
    const item = context.rules.material(MaterialType.Coin).getItem(move.itemIndex)
    if (!item.location.player || !move.location.player) return false
    const srcVisible = isPlayerVisible(item, context as any)
    const destVisible = isPlayerVisible({ location: move.location } as any, context as any)
    return !srcVisible && !destVisible
  })
  .duration(2200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) },
        { at: 0.15, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player }) },
        { at: 0.3, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player }) },
        { at: 0.55, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player }) },
        { at: 0.75, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player }) }
      ]
    }
  })

// Coin transfer (moveMoney): source visible, dest not visible → below dest → panel dest
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.Coin)(move)) return false
    const item = context.rules.material(MaterialType.Coin).getItem(move.itemIndex)
    if (!item.location.player || !move.location.player) return false
    const srcVisible = isPlayerVisible(item, context as any)
    const destVisible = isPlayerVisible({ location: move.location } as any, context as any)
    return srcVisible && !destVisible
  })
  .duration(1500)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player }) },
        { at: 0.65, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player }) }
      ]
    }
  })

// Coin transfer (moveMoney): source not visible, dest visible → panel source → below source → dest
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.Coin)(move)) return false
    const item = context.rules.material(MaterialType.Coin).getItem(move.itemIndex)
    if (!item.location.player || !move.location.player) return false
    const srcVisible = isPlayerVisible(item, context as any)
    const destVisible = isPlayerVisible({ location: move.location } as any, context as any)
    return !srcVisible && destVisible
  })
  .duration(1500)
  .trajectory((_context, _move) => ({
    elevation: false,
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) },
      { at: 0.15, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player }) },
      { at: 0.4, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player }) }
    ]
  }))

// Coin transfer (moveMoney): both visible → normal animation
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.Coin))
  .duration(0.8)

// Treasure map: non-vu → non-vu (below source → below dest → panel dest)
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.TreasureMapToken)(move)) return false
    const item = context.rules.material(MaterialType.TreasureMapToken).getItem(move.itemIndex)
    const srcVisible = !item.location.player || isPlayerVisible(item, context as any)
    const destVisible = !move.location.player || isPlayerVisible({ location: move.location } as any, context as any)
    return !srcVisible && !destVisible
  })
  .duration(2200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) },
        { at: 0.15, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) },
        { at: 0.3, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) },
        { at: 0.55, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 0.75, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) }
      ]
    }
  })

// Treasure map: vu → non-vu (board → below dest → panel dest)
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.TreasureMapToken)(move)) return false
    if (!move.location.player) return false
    const item = context.rules.material(MaterialType.TreasureMapToken).getItem(move.itemIndex)
    const srcVisible = !item.location.player || isPlayerVisible(item, context as any)
    const destVisible = isPlayerVisible({ location: move.location } as any, context as any)
    return srcVisible && !destVisible
  })
  .duration(1400)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0.35, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 0.65, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) }
      ]
    }
  })

// Treasure map: non-vu → vu (below source → board dest)
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.TreasureMapToken)(move)) return false
    if (!move.location.player) return false
    const item = context.rules.material(MaterialType.TreasureMapToken).getItem(move.itemIndex)
    const srcVisible = !item.location.player || isPlayerVisible(item, context as any)
    const destVisible = isPlayerVisible({ location: move.location } as any, context as any)
    return !srcVisible && destVisible
  })
  .duration(1400)
  .trajectory((_context, _move) => ({
    elevation: false,
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) },
      { at: 0.15, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) },
      { at: 0.4, locator: belowPlayerPanelLocator, location: (item) => ({ player: item.location.player, rotation: item.location.rotation }) }
    ]
  }))

// Treasure map: vu → vu or stock → vu (normal)
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.TreasureMapToken))
  .duration(0.5)

// Flip or hand-to-hand for VIEWED player (normal animation)
captainFlipAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!isPlayerVisible({ location: move.location } as any, context as any)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return (
      (item.location.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand) ||
      (item.location.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile)
    )
  })
  .duration(0.6)

// Flip on a NON-VIEWED player's board: panel → below → flip → panel → disappear
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (isPlayerVisible({ location: move.location } as any, context as any)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile
  })
  .duration(2200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        // descent : panel (tiny) -> below panel (normal size)
        { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        { at: 0.2, locator: belowPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        // pause with the original face visible
        { at: 0.4, locator: belowPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        // flip : change rotation while holding position
        { at: 0.6, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        // pause with the new face visible
        { at: 0.8, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        // back up into the panel
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) }
      ]
    }
  })

// Pioche towards a NON-VIEWED player: rise above bag, short pause, then to panel
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (isPlayerVisible({ location: move.location } as any, context as any)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(2400)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      waypoints: [
        // rise above bag
        { at: 0.2, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 1 },
        // long pause above the bag so the unseen player can read the tile
        { at: 0.4, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 1 },
        // travel to destination panel
        { at: 0.6, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 0.8, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) }
      ]
    }
  })

// Pioche towards the viewed player: rise above the bag, then glide
// to the current hand position.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(1200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        // Slide flat to the top of the bag, no elevation yet…
        { at: 0.35, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 0 },
        // …then immediately rise to elevation 10 before flying to the hand.
        { at: 0.36, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 10 }
      ]
    }
  })

// Flip in hand for a NON-VIEWED player: the tile drops out of the panel
// (scaling up from 0.001), pauses, flips, pauses again, then goes back up
// into the panel.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (isPlayerVisible({ location: move.location } as any, context as any)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand
  })
  .duration(2200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        // descent : panel (tiny) -> below panel (normal size) on 20% of the time
        { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        { at: 0.2, locator: belowPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        // pause with the original face visible (0.2 -> 0.4)
        { at: 0.4, locator: belowPlayerPanelLocator, location: (item) => ({ player: dest.player, rotation: item.location.rotation }) },
        // flip : change rotation while holding position (0.4 -> 0.6)
        { at: 0.6, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        // pause with the new face visible (0.6 -> 0.8)
        { at: 0.8, locator: belowPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) },
        // go back up into the panel
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: dest.player, rotation: dest.rotation }) }
      ]
    }
  })

// Any other tile move to a NON-VIEWED player: skip
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    return !isPlayerVisible({ location: move.location } as any, context as any)
  })
  .skip()
